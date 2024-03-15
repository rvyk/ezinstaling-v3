import { WordsChart } from "@/app/(routes)/dashboard/_components/_overview/charts/words";
import { LastActions } from "@/app/(routes)/dashboard/_components/_overview/last-actions";
import DashboardCards from "@/app/(routes)/dashboard/_components/_overview/overview-cards";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Subscriptions,
  UserStats,
  lastActions,
  vocabularyChart,
} from "@/types/user-data";

const Overview = ({
  stats,
  subscriptions,
  vocabularyChart,
  lastActions,
  onTabChange,
}: {
  stats: UserStats;
  subscriptions: Subscriptions;
  lastActions: lastActions[];
  vocabularyChart: vocabularyChart[];
  onTabChange: (value: string) => void;
}) => {
  return (
    <>
      <DashboardCards {...{ stats, subscriptions }} />
      <div className="grid min-h-96 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4" data-aos="fade-up">
          <CardHeader>
            <CardTitle>
              Wykres liczby słówek i ich poprawnego wykonania
            </CardTitle>
            <CardDescription>
              Wykres przedstawia liczbę słówek oraz ilość poprawnie wykonanych w
              ostatnich 15 sesjach
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <WordsChart {...{ vocabularyChart }} />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3" data-aos="fade-up">
          <CardHeader className="flex flex-col items-center justify-center space-y-2 text-center md:flex-row md:justify-between md:space-y-0 md:text-left">
            <div className="space-y-1">
              <CardTitle>Dziennik zdarzeń</CardTitle>
              <CardDescription>Sprawdź ostatnie wykonane akcje</CardDescription>
            </div>
            <Button onClick={() => onTabChange("logs")}>
              Cały dziennik zdarzeń
            </Button>
          </CardHeader>
          <CardContent>
            <LastActions {...{ lastActions }} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Overview;
