import convertError from "@/lib/apiExceptions";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { InstalingLoginProvider } from "@/lib/instaling";
import { SessionExpiredException } from "@/types/errors";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const session = await currentUser();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });
  try {
    const selectedAccount = session?.instaling?.accounts.find(
      (account) => account.login === session.instaling?.selectedAccount,
    );
    if (selectedAccount) {
      if (selectedAccount.inProgress)
        return new NextResponse(
          JSON.stringify({ success: true, state: "inprogress" }),
          {
            status: 200,
          },
        );
      if (selectedAccount.lastSession) {
        const loginProvider = new InstalingLoginProvider();
        const instalingStudent = await loginProvider.loadSession(
          selectedAccount.lastSession,
        );
        return new NextResponse(
          JSON.stringify(await instalingStudent.getInfo()),
          {
            status: 200,
          },
        );
      } else {
        const loginProvider = new InstalingLoginProvider(
          selectedAccount.login,
          selectedAccount.password,
        );
        const instalingStudent = await loginProvider.authenticate();
        await db.instalingData.update({
          where: {
            id: session.instaling?.id,
          },
          data: {
            accounts: {
              updateMany: {
                where: { login: selectedAccount.login },
                data: { lastSession: await loginProvider.saveSession() },
              },
            },
          },
        });
        return new NextResponse(
          JSON.stringify(await instalingStudent.getInfo()),
          {
            status: 200,
          },
        );
      }
    } else {
      return new NextResponse(
        JSON.stringify({ success: true, state: "noaccount" }),
        { status: 200 },
      );
    }
  } catch (error) {
    if (error instanceof SessionExpiredException) {
      await db.instalingData.update({
        where: {
          id: session?.instaling?.id,
        },
        data: {
          accounts: {
            updateMany: {
              where: {
                login: session?.instaling?.accounts.find(
                  (account) =>
                    account.login === session.instaling?.selectedAccount,
                )?.login,
              },
              data: { lastSession: null },
            },
          },
        },
      });
    }
    return convertError(error);
  }
};
