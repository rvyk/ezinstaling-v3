"use server";

import { currentUser } from "@/lib/auth";
import { tickets } from "@/lib/tickets";
import { checkCaptcha } from "@/lib/utils";
import { reportSchema } from "@/schemas";
import { z } from "zod";

export const createTicket = async (values: z.infer<typeof reportSchema>) => {
  const validatedFields = reportSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Wystąpił problem z przetworzeniem danych formularza" };
  }

  const { captcha, description, priority, problemType, title } = values;

  const validateCaptcha = await checkCaptcha(captcha);

  if (!validateCaptcha) {
    return { error: "Nie udało się zweryfikować CAPTCHA" };
  }

  const user = await currentUser();

  if (!user) {
    return { error: "Nie udało się pobrać danych użytkownika" };
  }

  const availableTickets = await tickets.getTickets(user?.email!, "open");

  if (availableTickets.length > 2) {
    return { error: "Możesz mieć otworzone maksymalnie 2 czaty jednocześnie" };
  }

  const ticket = await tickets.createTicket(
    user?.email!,
    title,
    description,
    priority,
    problemType,
  );

  return {
    success: "Ticket został utworzony! Za 3 sekundy zostaniesz przeniesiony.",
    ticketId: ticket,
  };
};
