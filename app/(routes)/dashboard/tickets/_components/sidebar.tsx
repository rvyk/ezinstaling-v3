"use client";

import { FormError } from "@/app/(routes)/(auth)/_components/ui/form-error";
import { FormSuccess } from "@/app/(routes)/(auth)/_components/ui/form-success";
import { SettingsContext } from "@/app/context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ExtendedUser } from "@/types/next-auth";
import { User } from "@prisma/client";
import {
  DrawingPinIcon,
  HamburgerMenuIcon,
  LockClosedIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import axios from "axios";
import { useContext, useState } from "react";

interface Sidebar {
  user: ExtendedUser;
  creator: User | null;
  helper: User | null;
  ticket: Ticket | undefined;
}

const SidebarContent = ({ ticket, user, creator, helper }: Sidebar) => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const infos = {
    problemType: {
      instaling: "Instaling",
      platnosci: "Płatności",
      inne: "Inne",
      konto: "Konto",
    },
    status: {
      open: "Otwarty",
      closed: "Zamknięty",
      "in-progress": "W trakcie",
    },
    priority: {
      low: "Niski",
      medium: "Średni",
      high: "Wysoki",
    },
  };

  const handleTakeOperation = (operation: "take" | "close" | "delete") => {
    setMessage("");
    setError("");

    try {
      setIsLoading(true);
      axios
        .post("/api/tickets/take-over", { id: ticket?.id, operation })
        .then(() => {
          setMessage(
            `Zgłoszenie zostało ${operation === "take" ? "przyjęte" : operation === "close" ? "zamknięte" : "usunięte"}`,
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (e) {
      console.error(e);
      setError("Wystąpił błąd podczas wykonywania operacji");
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-3">
        <p className="break-all font-medium">{ticket?.title}</p>
        <p className="break-all text-sm">{ticket?.description}</p>

        <table className="w-full opacity-80">
          <tbody className="w-full">
            {ticket?.createdAt && (
              <tr>
                <td className="mr-2 text-sm font-semibold">Stworzony:</td>
                <td className="text-xs font-medium">
                  {new Date(ticket.createdAt).toLocaleString()}
                </td>
              </tr>
            )}
            {ticket?.status && (
              <tr>
                <td className="mr-2 text-sm font-semibold">Status:</td>
                <td className="text-xs font-medium">
                  {infos.status[ticket.status] ?? ""}
                </td>
              </tr>
            )}
            {ticket?.problemType && (
              <tr>
                <td className="mr-2 text-sm font-semibold">Typ problemu:</td>
                <td className="text-xs font-medium">
                  {infos.problemType[ticket.problemType] ?? ""}
                </td>
              </tr>
            )}

            {ticket?.priority && (
              <tr>
                <td className="mr-2 text-sm font-semibold">Priorytet:</td>
                <td className="text-xs font-medium">
                  {infos.priority[ticket.priority] ?? ""}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-12 flex w-full flex-col">
        <hr className="w-full border-gray-200" />
        <Badge
          variant="default"
          className="mx-auto -translate-y-3 rounded-[6px] bg-[#3452fe] px-2 font-medium text-[#fafafa] hover:bg-[#3452fe]"
        >
          INFORMACJE O KLIENCIE
        </Badge>

        <div className="flex items-center space-x-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={creator?.image!} alt={creator?.name!} />
            <AvatarFallback>{creator?.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col opacity-80">
            <p className="text-sm font-medium">{creator?.email}</p>
            <p className="text-sm font-medium">{creator?.name}</p>
            <p className="text-sm font-medium">
              {creator?.isActive
                ? "Użytkownik premium"
                : "Użytkownik non-premium"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12 flex w-full flex-col justify-center">
        <hr className="w-full border-gray-200" />
        <Badge
          variant="default"
          className="mx-auto -translate-y-3 rounded-[6px] bg-[#3452fe] px-2 font-medium text-[#fafafa] hover:bg-[#3452fe]"
        >
          INFORMACJE O OBSŁUDZE
        </Badge>

        {helper?.email ? (
          <div className="flex items-center space-x-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={helper?.image!} alt={helper?.name!} />
              <AvatarFallback>{helper?.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col opacity-80">
              <p className="text-sm font-medium">{helper?.email}</p>
              <p className="text-sm font-medium">{helper?.name}</p>
              <p className="text-sm font-medium">
                {helper?.isActive
                  ? "Użytkownik premium"
                  : "Użytkownik non-premium"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm font-medium opacity-80">
            Brak obsługi. Nikt jeszcze nie został przydzielony do Twojego
            zgłoszenia
          </p>
        )}
      </div>

      {user.role === "ADMIN" && (
        <div className="mt-12 flex w-full flex-col justify-center">
          <hr className="w-full border-gray-200" />
          <Badge
            variant="default"
            className="mx-auto -translate-y-3 rounded-[6px] bg-[#3452fe] px-2 font-medium text-[#fafafa] hover:bg-[#3452fe]"
          >
            ZARZĄDZANIE ZGŁOSZENIEM
          </Badge>
          <div className="w-full space-y-1.5">
            <Button
              disabled={isLoading}
              variant="secondaryBlue"
              className="w-full"
              onClick={() => handleTakeOperation("take")}
            >
              Przejmij zgłoszenie <DrawingPinIcon className="ml-2 h-5 w-5" />
            </Button>
            <Button
              disabled={isLoading}
              variant="secondaryBlue"
              className="w-full"
              onClick={() => handleTakeOperation("close")}
            >
              Zamknij zgłoszenie <LockClosedIcon className="ml-2 h-5 w-5" />{" "}
            </Button>
            <Button
              disabled={isLoading}
              variant="secondaryBlue"
              className="w-full"
              onClick={() => handleTakeOperation("delete")}
            >
              Usuń zgłoszenie <TrashIcon className="ml-2 h-5 w-5" />
            </Button>
            {message && <FormSuccess message={message} />}
            {error && <FormError message={error} />}
          </div>
        </div>
      )}
    </>
  );
};

const Sidebar = ({ user, ticket, creator, helper }: Sidebar) => {
  const { showSidebar, setShowSidebar } = useContext(SettingsContext);

  return (
    <>
      <Sheet
        open={showSidebar}
        onOpenChange={() => setShowSidebar?.((prev) => !prev)}
      >
        <SheetContent side="left" className="w-full sm:w-fit">
          <SidebarContent {...{ creator, helper, ticket, user }} />
        </SheetContent>
      </Sheet>
      <div
        data-aos="fade-right"
        className="hidden h-full flex-col border-r-2 border-gray-200 p-4 text-[#0a0a0a] lg:flex"
      >
        <SidebarContent {...{ creator, helper, ticket, user }} />
      </div>
    </>
  );
};

export const MenuComponent = () => {
  const { setShowSidebar } = useContext(SettingsContext);

  return (
    <HamburgerMenuIcon
      className="block h-6 w-6 cursor-pointer lg:hidden"
      onClick={() => setShowSidebar?.((prev) => !prev)}
    />
  );
};

export default Sidebar;
