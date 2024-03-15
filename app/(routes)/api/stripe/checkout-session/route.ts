import { currentUser } from "@/lib/auth";
import { userData } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

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

  if (session.isActive) {
    userData.addLog(
      session?.email!,
      "Błąd podczas tworzenia sesji kasy",
      "Masz już aktywną subskrypcję.",
      "medium",
    );
    return NextResponse.json(
      {
        error: {
          code: "already-active",
          message: "Masz już aktywną subskrypcję.",
        },
      },
      { status: 400 },
    );
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: session.stripeCustId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: body,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard?tab=upgrade&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard?tab=upgrade&canceled=true`,
    subscription_data: {
      metadata: {
        payingUserId: session.id,
      },
    },
  });

  if (!checkoutSession.url) {
    userData.addLog(
      session?.email!,
      "Błąd podczas tworzenia sesji kasy",
      "Nie udało się utworzyć sesji kasy dla użytkownika",
      "high",
    );

    return NextResponse.json(
      {
        error: {
          code: "checkout-session-error",
          message: "Wystąpił błąd podczas tworzenia sesji kasy.",
        },
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ session: checkoutSession }, { status: 200 });
};
