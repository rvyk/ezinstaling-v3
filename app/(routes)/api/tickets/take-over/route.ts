import { currentRole, currentUser } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";
import { tickets } from "@/lib/tickets";

export const POST = async (req: Request) => {
  try {
    const user = await currentUser();
    const role = await currentRole();

    if (!user || role !== "ADMIN") {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id, operation } = await req.json();

    await tickets.takeOverTicket(id, operation, user?.email!);

    await pusherServer.trigger(`chat_${id}`, "incoming-takeover", operation);

    return new Response("OK");
  } catch (error: any) {
    console.error("Error sending message", error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
};
