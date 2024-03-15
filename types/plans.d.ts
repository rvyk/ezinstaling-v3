import Stripe from "stripe";

export type Plans = {
  ezInstalingPlans: ExtendedProduct[];
};

type ExtendedProduct = Stripe.Product & {
  clear_name: string;
  unit_amount: number;
};
