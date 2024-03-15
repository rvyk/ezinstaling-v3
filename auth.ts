import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { userData } from "@/lib/redis";
import { createStripeCustomer } from "@/lib/stripe";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
    async createUser({ user }) {
      await createStripeCustomer(user);
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        userData.addLog(
          user?.email!,
          "Zalogowano do panelu",
          `Pomyślne logowanie do panelu`,
          "high",
        );
        return true;
      }

      const existingUser = await getUserById(user.id ?? "");

      if (!existingUser?.emailVerified) return false;

      userData.addLog(
        user?.email!,
        "Zalogowano do panelu",
        "Pomyślne logowanie do panelu",
        "high",
      );
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.stripeCustId = token.stripeCustId as string;
        session.user.isActive = token.isActive as boolean;
        session.user.subscriptionId = token.subscriptionId as string;
        session.user.createdAt = token.iat as number;
        session.user.instaling = await db.instalingData.findFirst({
          where: { userId: session.user.id },
        });
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.stripeCustId = existingUser.stripeCustId;
      token.isActive = existingUser.isActive;
      token.subscriptionId = existingUser.subscriptionId;

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  ...authConfig,
});
