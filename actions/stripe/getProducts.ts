import { stripe } from "@/lib/stripe";

export const getProducts = async () => {
  const stripeResponse = await stripe.products.list();
  const plans = stripeResponse.data;

  const pricesResponse = await stripe.prices.list();
  const prices = pricesResponse.data;

  const ezInstalingPlans = plans
    .filter(
      (offer) => offer.active === true && offer.name.includes("ezInstaling"),
    )
    .map((offer) => {
      const price = prices.find((price) => price.product === offer.id);
      return {
        ...offer,
        unit_amount: price?.unit_amount ?? 0,
        clear_name: offer.name.replace("ezInstaling - ", "").toUpperCase(),
      };
    });

  return {
    ezInstalingPlans,
  };
};
