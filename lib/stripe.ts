import { loadStripe, Stripe as StripeJS } from "@stripe/stripe-js";
import { User } from "next-auth";
import Stripe from "stripe";

import { db } from "@/lib/db";

export const stripe = new Stripe(process.env.STRIPE_SK!, {
  apiVersion: "2023-10-16",
});

export const createStripeCustomer = async (user: User) => {
  await stripe.customers
    .create({
      email: user.email!,
      name: user.name!,
    })
    .then(async (customer) => {
      return db.user.update({
        where: { id: user.id },
        data: {
          stripeCustId: customer.id,
        },
      });
    });
};

let stripePromise: Promise<StripeJS | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
  }

  return stripePromise;
};
