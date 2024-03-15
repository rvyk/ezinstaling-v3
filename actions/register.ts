"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { createStripeCustomer } from "@/lib/stripe";
import { generateVerificationToken } from "@/lib/tokens";
import { checkCaptcha } from "@/lib/utils";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Wystąpił problem z przetworzeniem danych formularza" };
  }

  const { nickname, email, password, captcha } = values;

  const validateCaptcha = await checkCaptcha(captcha);

  if (!validateCaptcha) {
    return { error: "Nie udało się zweryfikować CAPTCHA" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Ten adres e-mail jest już zajęty!" };
  }

  await db.user
    .create({
      data: {
        name: nickname,
        email,
        password: hashedPassword,
      },
    })
    .then(async (user: any) => {
      await createStripeCustomer(user);
    });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    nickname,
    verificationToken.email,
    verificationToken.token,
  );

  return { success: "Mail weryfikacyjny został wysłany!" };
};
