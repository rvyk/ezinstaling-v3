"use client";

import { pusherClient } from "@/lib/pusher";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Messages = ({
  initialMessages,
  chatId,
  receiver,
}: {
  initialMessages: any;
  chatId: string;
  receiver: string;
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const router = useRouter();

  useEffect(() => {
    pusherClient.subscribe(`chat_${chatId}`);

    const takeOverHandler = (operation: "close" | "take" | "delete") => {
      switch (operation) {
        case "delete":
          router.push("/dashboard?tab=tickets");
          break;
        case "take":
        case "close":
          location.reload();
          break;
      }
    };

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev]);
    };

    pusherClient.bind_global((event: any, data: any) => {
      if (event === "incoming-message") {
        messageHandler(data);
      } else if (event === "incoming-takeover") {
        takeOverHandler(data);
      }
    });

    return () => {
      pusherClient.unsubscribe(`chat_${chatId}`);
      pusherClient.unbind_global();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  return (
    <div
      data-aos="fade-left"
      id="messages"
      className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mb-28 mt-16 flex h-full flex-1 flex-col-reverse gap-4 overflow-y-auto p-3 md:mb-0 md:mt-0"
    >
      {messages.map((message, index) => {
        const isCurrentUser = message.sender === receiver;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.sender === messages[index].sender;

        return (
          <div
            className="chat-message"
            key={`${message.id}-${message.timestamp}`}
          >
            <div
              className={cn("flex items-end", {
                "justify-end": isCurrentUser,
              })}
            >
              <div
                className={cn(
                  "mx-2 flex max-w-md flex-col space-y-2 text-sm md:text-base",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  },
                )}
              >
                <span
                  className={cn(
                    "inline-block break-all rounded-[12px] px-4 py-2",
                    {
                      "bg-[#3452fe] text-white": isCurrentUser,
                      "bg-gray-200 text-gray-900": !isCurrentUser,
                      "rounded-br-none":
                        !hasNextMessageFromSameUser && isCurrentUser,
                      "rounded-bl-none":
                        !hasNextMessageFromSameUser && !isCurrentUser,
                    },
                  )}
                >
                  {message.message?.content || ""}

                  {!!message.message?.links && (
                    <div
                      className={`relative mt-2 grid ${message.message?.links.length >= 2 && "grid-cols-2"} gap-4`}
                    >
                      {message.message.links.map(
                        (link: string, index: number) => {
                          return (
                            <Image
                              key={index}
                              alt="uploaded file"
                              src={link}
                              width={
                                message.message?.links!.length >= 2 ? 300 : 200
                              }
                              height={
                                message.message?.links!.length >= 2 ? 300 : 200
                              }
                              className="h-auto w-auto rounded-[8px]"
                            />
                          );
                        },
                      )}
                    </div>
                  )}

                  <span className="ml-2 text-xs opacity-60">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div className="w-full rounded-[12px] bg-gray-100 px-8 py-6 text-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Dziękujemy za zgłoszenie problemu!
        </h2>

        <p>
          Utworzyliśmy dla Ciebie kanał pomocy, abyśmy mogli sprawnie rozwiązać
          Twój problem. Wkrótce skontaktuje się z Tobą nasz konsultant, aby
          omówić szczegóły.
        </p>

        <p className="mt-4">
          W międzyczasie możesz przygotować{" "}
          <span className="font-medium">dokładniejszy opis problemu</span>,
          który napotkałeś. To pomoże nam szybciej zidentyfikować przyczynę
          problemu i zaproponować odpowiednie rozwiązanie.
        </p>

        <p className="mt-4">Opisując problem, pamiętaj o podaniu:</p>

        <ul className="ml-4 mt-4 list-inside list-disc">
          <li>Szczegółowego opisu problemu</li>
          <li>Informacji o używanym urządzeniu i systemie operacyjnym</li>
          <li>Kroków, które podjąłeś przed wystąpieniem problemu</li>
          <li>
            Wszelkich innych informacji, które mogą być istotne dla rozwiązania
            problemu
          </li>
        </ul>

        <p className="mt-4">
          Im więcej informacji nam dostarczysz, tym szybciej i łatwiej będziemy
          mogli Ci pomóc.
        </p>

        <p className="mt-4">Możesz również:</p>

        <ul className="ml-4 mt-4 list-inside list-disc">
          <li>
            Załączyć{" "}
            <span className="font-medium">zrzuty ekranu lub pliki</span>, które
            ilustrują problem
          </li>
          <li>
            Podać link do strony internetowej, na której występuje problem
          </li>
        </ul>

        <p className="mt-4 text-xs">
          Jeżeli nie otrzymałeś wystarczającej pomocy, skontaktuj się z nami
          przez serwer{" "}
          <Link
            href="https://dc.ezinstaling.pl"
            className="font-semibold underline"
          >
            Discord
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Messages;
