"use server";

import * as z from "zod";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { checkCaptcha } from "@/lib/utils";
import { ResetPasswordSchema } from "@/schemas";

export const reset = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Wystąpił problem z przetworzeniem danych formularza" };
  }

  const { email, captcha } = validatedFields.data;

  const validateCaptcha = await checkCaptcha(captcha);

  if (!validateCaptcha) {
    return { error: "Nie udało się zweryfikować CAPTCHA" };
  }

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Adres e-mail nieznaleziony!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    existingUser.name!,
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return {
    success: "Link do zmiany hasła został wysłany na podany adres e-mail!",
  };
};
