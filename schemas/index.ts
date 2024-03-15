import * as z from "zod";

export const RegisterSchema = z
  .object({
    nickname: z.string().min(4, "Ta nazwa użytkownika jest za krótka"),
    email: z
      .string()
      .min(1, {
        message: "Adres e-mail jest wymagany",
      })
      .email("Ten adres e-mail jest nieprawidłowy"),
    password: z.string().min(8, "Hasło jest wymagane"),
    repeatPassword: z.string().min(8, "Powtórz hasło"),
    captcha: z.string().min(1, "Captcha jest wymagana"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Podane hasła nie są takie same",
    path: ["repeatPassword"],
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Adres e-mail jest wymagany",
    })
    .email("Ten adres e-mail jest nieprawidłowy"),
  password: z.string().min(1, "Podaj hasło"),
});

export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Adres e-mail jest wymagany",
    })
    .email("Ten adres e-mail jest nieprawidłowy"),
  captcha: z.string().min(1, "Captcha jest wymagana"),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(8, "Hasło jest wymagane"),
    repeatPassword: z.string().min(8, "Powtórz hasło"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Podane hasła nie są takie same",
    path: ["repeatPassword"],
  });

export const taskSchema = z.object({
  timestamp: z.string(),
  action: z.string(),
  description: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export const reportSchema = z.object({
  problemType: z
    .enum(["instaling", "platnosci", "inne", "konto"])
    .refine(
      (value) => ["instaling", "platnosci", "inne", "konto"].includes(value),
      {
        message: "Nieprawidłowy typ problemu",
      },
    ),
  priority: z
    .enum(["low", "medium", "high"])
    .refine((value) => ["low", "medium", "high"].includes(value), {
      message: "Nieprawidłowy priorytet",
    }),
  title: z
    .string()
    .min(8, "Tytuł powinien mieć co najmniej 8 znaków")
    .max(100, "Tytuł jest za długi"),
  description: z
    .string()
    .min(20, "Opis powinien mieć co najmniej 20 znaków")
    .max(200, "Opis jest za długi"),
  captcha: z.string().min(1, "Captcha jest wymagana"),
});
