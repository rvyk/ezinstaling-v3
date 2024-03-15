"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStripe } from "@/lib/stripe";
import { Plans } from "@/types/plans";
import {
  ClockIcon,
  CrossCircledIcon,
  LockOpen2Icon,
  RocketIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import Stripe from "stripe";

const Upgrade = ({ plans }: { plans: Plans }) => {
  const [currentTab, setCurrentTab] = useState("ezinstaling");
  const [status, setStatus] = useState<{
    id: Stripe.Price | string;
    message: string;
    status: "idle" | "loading" | "success" | "error";
  }>({
    id: "",
    message: "",
    status: "idle",
  });

  const onTabChange = (value: string) => {
    setCurrentTab(value);
  };

  const tabs = [
    {
      value: "ezinstaling",
      label: "ezInstaling",
    },
    {
      value: "ezantitestportal",
      label: "ezAntiTestportal",
      disabled: true,
    },
    {
      value: "ezschoolCheats",
      label: "ezSchoolCheats",
      disabled: true,
    },
  ];

  const cards = [
    {
      title: "Brak reklam",
      description: "Korzystaj z aplikacji bez reklam",
      icon: (
        <CrossCircledIcon className="mr-2 text-[#3452fe] drop-shadow-[0px_0px_8px_#3452fe]" />
      ),
    },
    {
      title: "Automatyczne sesje",
      description: "Rozwiązuj sesje automatycznie o dowolnej porze dnia",
      icon: (
        <ClockIcon className="mr-2 text-[#3452fe] drop-shadow-[0px_0px_8px_#3452fe]" />
      ),
    },
    {
      title: "Uczciwy rozwiązujący",
      description: 'Dzięki ezInstaling, rozwiązujesz sesje "uczciwie"',
      icon: (
        <RocketIcon className="mr-2 text-[#3452fe] drop-shadow-[0px_0px_8px_#3452fe]" />
      ),
    },
    {
      title: "Wsparcie kilku kont",
      description: "Rozwiązuj sesję na kilku kontach jednocześnie",
      icon: (
        <LockOpen2Icon className="mr-2 text-[#3452fe] drop-shadow-[0px_0px_8px_#3452fe]" />
      ),
    },
  ];

  const handleCreateCheckoutSession = async (
    productId: string | Stripe.Price,
  ) => {
    try {
      setStatus({ id: productId, message: "", status: "loading" });
      const res = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productId),
      });

      const data = await res.json();

      if (data.error) {
        setStatus({
          id: productId,
          message: data.error.message,
          status: "error",
        });
        return;
      }

      const checkoutSession = data.session;

      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      if (error) {
        console.error(error);
        setStatus({
          id: productId,
          message: "Wystąpił problem z przekierowaniem do płatności",
          status: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        id: productId,
        message: "Wystąpił problem z przekierowaniem do płatności",
        status: "error",
      });
    }
  };

  return (
    <Tabs
      defaultValue="ezInstaling"
      value={currentTab}
      onValueChange={onTabChange}
      className="space-y-4"
    >
      <TabsList
        className="flex h-fit w-fit flex-wrap space-x-2 space-y-1.5 rounded-[8px] bg-[#fff] pb-1 sm:block sm:space-y-0"
        data-aos="fade-up"
      >
        {tabs.map((tab, index) => (
          <TabsTrigger
            data-aos="fade-up"
            data-aos-delay={index * 100 + 100}
            key={tab.value}
            value={tab.value}
            disabled={tab?.disabled}
            className="rounded-[6px] px-4 transition-colors hover:bg-[#fafafa] data-[state=active]:bg-[#5069fa] data-[state=active]:text-[#fafafa] data-[state=active]:hover:bg-[#283db8]"
          >
            {tab.label}
            {tab?.disabled && (
              <Badge variant="secondary" className="ml-2">
                NIEDOSTĘPNE
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="ezinstaling" className="space-y-4">
        <div className="flex min-h-96 flex-col gap-4">
          <div className="grid flex-wrap gap-4 lg:grid-cols-4 lg:flex-nowrap">
            {cards.map((card, index) => (
              <Card
                key={card.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="flex items-center text-xl font-bold">
                    {card.icon}
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">{card.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid flex-wrap gap-4 lg:grid-cols-3 lg:flex-nowrap">
            {plans.ezInstalingPlans.map((plan, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                className={`flex flex-col items-center justify-center text-center ${index % 2 && "bg-gradient-to-r from-[#3452fe]/80 to-[#5069fa]/80 shadow-[0px_3px_10px_0px_#3452fe]"} `}
              >
                <CardHeader className="p-5">
                  <CardTitle className={`${index % 2 && "text-[#fafafa]"}`}>
                    {plan.clear_name}
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className={`flex flex-col items-center justify-center space-y-3 ${index % 2 && "text-[#fafafa]"}`}
                >
                  <div className="text-5xl font-bold">
                    {plan.unit_amount / 100}zł
                  </div>
                  <p
                    className={`text-sm text-muted-foreground ${index % 2 && "text-[#fafafa]"}`}
                  >
                    na{" "}
                    {plan.clear_name == "MIESIĄC"
                      ? "1 miesiąc"
                      : plan.clear_name == "SEMESTR"
                        ? "5 miesięcy"
                        : "10 miesięcy"}
                  </p>
                  <Button
                    onClick={() =>
                      handleCreateCheckoutSession(plan.default_price!)
                    }
                    disabled={
                      status.id == plan.default_price &&
                      status.status === "loading"
                    }
                    variant={index % 2 ? "secondaryBlue2" : "secondaryBlue"}
                  >
                    {status.id == plan.default_price &&
                      status.status === "loading" && (
                        <UpdateIcon className="mr-2 animate-spin" />
                      )}
                    Wybierz ten plan
                  </Button>
                  {status.id === plan.default_price && status.message && (
                    <p
                      className={`text-xs font-medium ${index % 2 ? "text-[#fafafa]" : "text-[#ff0033]"}`}
                    >
                      {status.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Upgrade;
