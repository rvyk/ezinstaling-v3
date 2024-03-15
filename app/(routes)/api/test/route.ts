import { userData } from "@/lib/redis";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);

  const email = url.searchParams.get("email");
  const count = parseInt(url.searchParams.get("count") || "0");
  const type = url.searchParams.get("type");

  if (!email || !count || !type) {
    return NextResponse.json({ error: "Missing parameters" });
  }

  if (count < 1 || count > 10) {
    return NextResponse.json({ error: "Invalid count parameter" });
  }

  for (let i = 0; i < count; i++) {
    switch (type) {
      case "session":
        await userData.addSession(email);
        break;
      case "word":
        await userData.addWord(email);
        break;
      case "lastSession":
        await userData.addLastSession(email, new Date().toISOString());
        break;
      case "vocabularyChart":
        await userData.addDataToVocabularyChart(
          email,
          Math.floor(Math.random() * (25 - 20 + 1) + 20),
          Math.floor(Math.random() * (25 - 20 + 1) + 20),
        );
        break;
      case "log":
        await userData.addLog(
          email,
          `Test action ${i}`,
          `Test description ${i}`,
          i % 2 === 0 ? "high" : "medium",
        );
        break;
      default:
        return NextResponse.json({ error: "Invalid type parameter" });
    }
  }

  return NextResponse.json({ message: "Data added successfully" });
};
