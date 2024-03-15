import { InstalingData, UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role: UserRole;
  stripeCustId: string;
  isActive: boolean;
  subscriptionId: string;
  createdAt: number;
  instaling: InstalingData?;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
