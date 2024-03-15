"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertUnixTime } from "@/lib/utils";
import { Subscriptions, UserStats } from "@/types/user-data";
import {
  BookmarkIcon,
  ClockIcon,
  LightningBoltIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";

const DashboardCards = ({
  stats,
  subscriptions,
}: {
  stats: UserStats;
  subscriptions: Subscriptions;
}) => {
  const cards = [
    {
      title: "Wykonanych sesji",
      value: stats.sessionCount,
      icon: <ReaderIcon className="h-4 w-4 text-muted-foreground" />,
      description: `Zaoszczędziłeś z nami około ${(stats.sessionCount * 5) / 100} godzin! 🕒`,
    },
    {
      title: "Wykonanych słówek",
      value: stats.wordCount,
      icon: <BookmarkIcon className="h-4 w-4 text-muted-foreground" />,
      description:
        typeof stats?.moreThan === "number"
          ? `To więcej niż ${stats.moreThan}% użytkowników! 😮`
          : null,
    },
    {
      title: "Ostatnia wykonana sesja",
      value: stats.lastSession ? convertUnixTime(stats.lastSession) : "Brak",
      icon: <ClockIcon className="h-4 w-4 text-muted-foreground" />,
      description: `${stats.lastSession ? "Twoja sesja została dzisiaj rozwiązana! 🎉" : "Nie rozwiązałeś u nas żadnej sesji 🤔"}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={card.title} data-aos="fade-up" data-aos-delay={index * 100}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
      <Card data-aos="fade-up" data-aos-delay={300}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aktualny plan</CardTitle>
          <LightningBoltIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {!!subscriptions?.activeSubscriptions ||
          !!subscriptions?.trailingSubscriptions ? (
            <>
              <div className="text-2xl font-bold">Premium</div>
              <p className="text-xs text-muted-foreground">
                {subscriptions.trailingSubscriptions
                  ? `Wersja próbna kończy się za ${Math.floor((subscriptions.trailingSubscriptions.trial_end - Date.now() / 1000) / (60 * 60 * 24))} dni! 🚀`
                  : `Subskrybcja kończy się za ${Math.floor((subscriptions.activeSubscriptions.current_period_end - Date.now() / 1000) / (60 * 60 * 24))} dni! 🚀`}
              </p>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">Darmowy</div>
              <p className="text-xs text-muted-foreground">
                Może to czas na premium? 😎
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
