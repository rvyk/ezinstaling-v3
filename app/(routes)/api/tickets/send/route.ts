import { currentUser } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";
import { tickets } from "@/lib/tickets";
import crypto from "crypto";

export const POST = async (req: Request) => {
  try {
    const {
      message,
      chatId,
    }: { message: { content?: string; links?: string[] }; chatId: string } =
      await req.json();

    const session = await currentUser();

    if (!session) return new Response("Unauthorized", { status: 401 });

    const formatedMessage = {
      id: crypto.randomBytes(16).toString("hex"),
      message,
      sender: session?.email!,
      timestamp: new Date().toISOString(),
    } as Message;

    await pusherServer.trigger(
      `chat_${chatId}`,
      "incoming-message",
      formatedMessage,
    );

    await tickets.sendMessage(chatId, formatedMessage);

    return new Response("OK");
  } catch (error) {
    console.error("Error sending message", error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
};
