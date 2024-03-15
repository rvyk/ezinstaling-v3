import { MainNav } from "@/app/(routes)/dashboard/_components/main-nav";
import ChatInput from "@/app/(routes)/dashboard/tickets/_components/chat-input";
import Messages from "@/app/(routes)/dashboard/tickets/_components/messages";
import Sidebar, {
  MenuComponent,
} from "@/app/(routes)/dashboard/tickets/_components/sidebar";
import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { tickets } from "@/lib/tickets";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    ticketId: string;
  };
}

const Ticket = async ({ params }: PageProps) => {
  const user = await currentUser();

  if (!user) notFound();

  const ticket = await tickets.getTicketById(params.ticketId);

  if (user?.role !== "ADMIN" || !ticket) {
    if (!ticket || ticket?.creatorEmail !== user?.email) notFound();
  }

  const creator = await getUserByEmail(ticket?.creatorEmail!);
  const helper = await getUserByEmail(ticket?.supportAgent!);
  const messages = await tickets.getMessages(params.ticketId);

  return (
    <div className="h-screen min-h-full overflow-hidden bg-white">
      <div className="fixed top-0 w-full md:relative">
        <MainNav menuComponent={<MenuComponent />} />
      </div>
      <div className="grid min-h-full grid-cols-4 bg-white">
        <Sidebar {...{ creator, helper, ticket, user }} />
        <div className="col-span-4 flex h-full max-h-screen min-h-[calc(100vh-4rem)] flex-1 flex-col justify-between md:max-h-[calc(100vh-4rem)] lg:col-span-3">
          <Messages
            receiver={user?.email!}
            initialMessages={messages}
            chatId={params.ticketId}
          />
          {ticket?.status == "closed" ? (
            <div className="fixed bottom-0 right-0 mb-2 h-24 w-full border-t border-gray-200 bg-white px-4 pt-4 md:relative">
              <div className="relative flex flex-col overflow-hidden">
                <div className="flex w-full items-center justify-center">
                  <div className="mr-8 flex w-full items-center justify-center rounded-[6px] border border-gray-200">
                    <textarea
                      rows={1}
                      disabled
                      placeholder={`Zgłoszenie zamknięte`}
                      maxLength={500}
                      className="!focus-visible:ring-0 no-scrollbar w-full resize-none px-3 py-4 text-sm !shadow-none focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ChatInput chatId={params.ticketId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
