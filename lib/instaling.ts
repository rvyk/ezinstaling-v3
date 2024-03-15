import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  ErrorService,
  ExternalServiceException,
  InvalidCredentialsException,
  SessionExpiredException,
} from "@/types/errors";
import axios from "axios";
import cheerio from "cheerio";

export class InstalingLoginProvider {
  private username: string | null = null;
  private password: string | null = null;
  private cookies: string[] = [];
  private studentId: string | null = null;

  constructor(username?: string, password?: string) {
    if (username && password) {
      this.username = username;
      this.password = password;
    }
  }

  async authenticate() {
    if (!this.username || !this.password)
      throw new Error("Provide username and password for Instaling first");

    this.cookies = await this.getInitialCookies();
    this.studentId = await this.getStudentId();

    if (!this.studentId)
      throw new Error("Can not get student id from Instaling");

    return new InstalingStudent(
      this.studentId,
      { login: this.username, password: this.password },
      this.cookies,
    );
  }

  async saveSession() {
    if (!this.username || !this.password)
      throw new Error("Provide username and password for Instaling first");

    this.cookies = await this.getInitialCookies();
    this.studentId = await this.getStudentId();

    if (!this.studentId)
      throw new Error("Can not get student id from Instaling");

    return JSON.stringify({
      studentId: this.studentId,
      credentials: { login: this.username, password: this.password },
      cookies: this.cookies,
    });
  }

  async loadSession(session: string) {
    const parsedSession = JSON.parse(session);
    if (
      !parsedSession.credentials ||
      !parsedSession.cookies ||
      !parsedSession.studentId
    ) {
      throw new Error("Invalid session format");
    }
    this.username = parsedSession.credentials.login;
    this.password = parsedSession.credentials.password;
    this.cookies = parsedSession.cookies;
    this.studentId = parsedSession.studentId;

    if (!this.username || !this.password)
      throw new Error("Provide username and password for Instaling first");

    if (!this.studentId)
      throw new Error("Can not get student id from Instaling");

    return new InstalingStudent(
      this.studentId,
      { login: this.username, password: this.password },
      this.cookies,
    );
  }

  async getInitialCookies() {
    const response = await axios.post(
      "https://instaling.pl/teacher.php?page=teacherActions",
      `action=login&from=&log_email=${this.username}&log_password=${this.password}`,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Referer: "https://instaling.pl/teacher.php?page=login",
        },
        maxRedirects: 0,
        validateStatus: () => true,
      },
    );
    if (response.status !== 302 || !response.headers["location"])
      throw new ExternalServiceException(ErrorService.Instaling);

    if (response.headers["location"] !== "learning/dispatcher.php?from=")
      throw new InvalidCredentialsException(ErrorService.Instaling);

    return (
      response.headers["set-cookie"]?.map(
        (cookie) => cookie.split(";")[0] || cookie,
      ) || []
    );
  }

  async getStudentId() {
    const response = await axios.get(
      "https://instaling.pl/learning/dispatcher.php",
      {
        headers: { Cookie: this.cookies.join("; ") },
        maxRedirects: 0,
        validateStatus: () => true,
      },
    );
    const studentId =
      response.headers["location"].split("student_id=")[1] || null;
    if (!studentId) throw new Error("Can not get student id from Instaling");
    return studentId;
  }
}

export class InstalingStudent implements InstalingStudentInterface {
  credentials: InstalingCredentials = {
    login: "",
    password: "",
  };
  id: string = "";
  todaySessionCompleted: boolean = false;
  private cookies: string[] = [];

  public lastQuestion: Question | null = null;
  public wordsCount: number | null = null;
  public language: number | null = null;

  constructor(
    id: string,
    credentials: InstalingCredentials,
    cookies: string[] = [],
  ) {
    this.id = id;
    this.credentials = credentials;
    this.cookies = cookies;
  }

  async getInfo(): Promise<StudentInfo> {
    if (!this.id) throw new Error("No student logged in");
    const response = await axios.get(
      `https://instaling.pl/student/pages/mainPage.php?student_id=${this.id}`,
      {
        headers: { Cookie: this.cookies.join("; ") },
        maxRedirects: 0,
        validateStatus: () => true,
      },
    );
    if (
      "location" in response.headers &&
      response.headers["location"] === "/teacher.php?page=login"
    )
      throw new SessionExpiredException(ErrorService.Instaling);

    const $ = cheerio.load(response.data);
    const todaySessionCompleted = !!$("#student_panel > h4").first().text();
    const sessionStatus = $(".sesion").first().text();
    this.todaySessionCompleted = todaySessionCompleted;
    return { id: this.id, todaySessionCompleted, sessionStatus };
  }

  async initSession(): Promise<void> {
    if (!this.id) throw new Error("No student logged in");
    const response = await axios.post(
      "https://instaling.pl/ling2/server/actions/init_session.php",
      new URLSearchParams({
        child_id: this.id,
        repeat: "",
        start: "",
        end: "",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: this.cookies.join("; "),
        },
      },
    );
    if (
      "location" in response.headers &&
      response.headers["location"] === "/teacher.php?page=login"
    )
      throw new SessionExpiredException(ErrorService.Instaling);

    return response.data;
  }

  async getQuestion(): Promise<Question | Summary> {
    if (!this.id) throw new Error("No student logged in");
    const response = await axios.post(
      "https://instaling.pl/ling2/server/actions/generate_next_word.php",
      new URLSearchParams({
        child_id: this.id,
        date: Date.now().toString(),
      }).toString(),
      {
        headers: {
          Cookie: this.cookies.join("; "),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (
      "location" in response.headers &&
      response.headers["location"] === "/teacher.php?page=login"
    )
      throw new SessionExpiredException(ErrorService.Instaling);

    if ("id" in response.data) {
      const question: Question = {
        id: +response.data.id || -1,
        translation: "" + response.data.translations || "",
        language: +response.data.language_id || null,
        maxWords: +response.data.maxWords || null,
      };
      if (question.language) this.language = question.language;
      if (question.maxWords) this.wordsCount = question.maxWords;
      this.lastQuestion = question;
      return question;
    }
    const days =
      +response.data.summary
        .split("\\n\\n")[0]
        .split(": ")[1]
        .split("\\n")[0] || -1;
    const allAnswers =
      +response.data.summary
        .split("\\n\\n")[1]
        .replace("\n", "")
        .split(",")[0]
        .split(" ")[1] || -1;
    const correctAnswers =
      +response.data.summary
        .split("\\n\\n")[1]
        .replace("\n", "")
        .split(",")[1]
        .split(" ")[1] || -1;

    const summary: Summary = { days, allAnswers, correctAnswers };
    return summary;
  }

  async sendAnswer(answer: string): Promise<Grade> {
    if (!this.id) throw new Error("No student logged in");
    if (!this.lastQuestion?.id) throw new Error("No question to answer");
    const response = await axios.post(
      "https://instaling.pl/ling2/server/actions/save_answer.php",
      new URLSearchParams({
        child_id: this.id,
        answer: answer,
        word_id: this.lastQuestion?.id.toString(),
        version: "C65E24B29F60B7231EC23D979C9707D2",
      }).toString(),
      {
        headers: {
          Cookie: this.cookies.join("; "),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (
      "location" in response.headers &&
      response.headers["location"] === "/teacher.php?page=login"
    )
      throw new SessionExpiredException(ErrorService.Instaling);

    if (response.data.language_id) this.language = response.data.language_id;
    const grade: Grade = {
      grade: +response.data.grade || -1,
      correctAnswers: response.data.word,
    };

    return grade;
  }
}

export const instalingUser = async () => {
  const user = await currentUser();
  if (!user?.id) return null;
  user.instaling = user?.instaling;
  if (!user?.instaling)
    user.instaling = await db.instalingData.create({
      data: { accounts: [], userId: user.id },
    });

  return user;
};
