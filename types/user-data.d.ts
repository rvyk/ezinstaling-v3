export interface UserStats {
  sessionCount: number;
  wordCount: number;
  lastSession: string | null;
  moreThan: number;
}

export type Subscriptions = {
  activeSubscriptions: Stripe.Response<Stripe.ApiList<Stripe.Subscription>>;
  trailingSubscriptions: Stripe.Response<Stripe.ApiList<Stripe.Subscription>>;
};

export type lastActions = {
  action: string;
  description: string;
  timestamp: string;
  priority: "low" | "medium" | "high";
};

export type vocabularyChart = {
  "Poprawnie wykonane": number;
  "Liczba słówek": number;
};
