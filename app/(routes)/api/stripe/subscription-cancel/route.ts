import { currentUser } from "@/lib/auth";
import { userData } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await currentUser();

  if (!session) {
    return NextResponse.json(
      {
        error: {
          code: "no-access",
          message: "Musisz być zalogowany, aby uzyskać dostęp do tego zasobu.",
        },
      },
      { status: 401 },
    );
  }

  const stripeSubscriptionId = session.subscriptionId;

  const subscription = await stripe.subscriptions.update(stripeSubscriptionId, {
    cancel_at_period_end: true,
    metadata: {
      payingUserEmail: session.email!,
    },
  });

  userData.addLog(
    session?.email!,
    "Subskrybcja anulowana",
    "Twoja subskrybcja została anulowana",
    "medium",
  );

  return NextResponse.json({ subscription }, { status: 200 });
};
