type InstalingCredentials = {
  login: string;
  password: string;
};

type Question = {
  id: number;
  translation: string;
  language: number | null;
  maxWords: number | null;
};

type Summary = {
  days: number;
  correctAnswers: number;
  allAnswers: number;
};

type Grade = {
  grade: number;
  correctAnswers: number;
};

type StudentInfo = {
  id: string;
  todaySessionCompleted: boolean;
  sessionStatus: string;
};

interface InstalingStudentInterface {
  id: string;
  credentials: InstalingCredentials;
  getInfo: () => Promise<StudentInfo>;
  initSession: () => Promise<void>;
  getQuestion: () => Promise<Question | Summary>;
  sendAnswer: (asnwer: string) => Promise<Grade>;
}
