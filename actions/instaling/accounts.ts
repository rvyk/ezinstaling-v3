"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { InstalingLoginProvider } from "@/lib/instaling";

export const getInstalingAccounts = async () => {
  const session = await currentUser();
  if (!session?.id) throw new Error("Unauthorized");
  return (await db.instalingData.findFirst({ where: { userId: session.id } }))
    ?.accounts;
};

export const addAccount = async (login: string, password: string) => {
  const session = await currentUser();
  if (!session?.id) throw new Error("Unauthorized");
  if (
    ((await db.instalingData.findFirst({ where: { userId: session.id } }))
      ?.accounts.length ?? 0) == 3
  )
    throw new Error("You can't add more than 3 accounts");
  if (
    (
      await db.instalingData.findMany({
        where: {
          userId: session.id,
          accounts: { some: { login, password } },
        },
      })
    ).length
  )
    throw new Error("Account already exists");
  const loginProvider = new InstalingLoginProvider(login, password);
  const student = await loginProvider.authenticate();
  await db.instalingData.update({
    where: { userId: session.id },
    data: {
      accounts: {
        push: {
          login,
          password,
          settings: { capitalChance: 0, synonymChance: 0, typoChance: 0 },
          lastSession: await loginProvider.saveSession(),
        },
      },
    },
  });
  return await student.getInfo();
};

export const removeAccount = async (login: string) => {
  const session = await currentUser();
  if (!session?.id) throw new Error("Unauthorized");
  const student = await db.instalingData.update({
    where: { userId: session.id },
    data: {
      accounts: {
        deleteMany: { where: { login } },
      },
    },
  });
  return student;
};
