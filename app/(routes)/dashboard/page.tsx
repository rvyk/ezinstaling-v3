import { getProducts } from "@/actions/stripe/getProducts";
import { MainNav } from "@/app/(routes)/dashboard/_components/main-nav";
import DashboardTabs from "@/app/(routes)/dashboard/_components/tabs";
import { currentUser } from "@/lib/auth";
import { userData } from "@/lib/redis";
import { tickets } from "@/lib/tickets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Łatwe zarządzanie sesjami Instaling.pl - Twój centralny panel kontrolny",
  description:
    "Odkryj wygodę zarządzania sesjami Instaling.pl na jednym miejscu. Nasz panel umożliwia szybki dostęp do rozwiązań, raportów i nowości. Skorzystaj już teraz!",
};

const DashboardPage = async () => {
  const user = await currentUser();
  const stats = await userData.getUserStats(user?.email!);
  const subscriptions = await userData.getSubscriptions(user?.stripeCustId!);
  const lastActions = await userData.getLogs(user?.email!, 0);
  const vocabularyChart = await userData.getVocabularyChartData(user?.email!);
  const userTickets =
    user?.role === "ADMIN"
      ? await tickets.getAllTickets()
      : await tickets.getTickets(user?.email!);
  const plans = await getProducts();

  return (
    <>
      <div className="flex flex-col text-[#37474f]">
        <MainNav />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex w-full items-center justify-between space-y-2 sm:w-fit">
            <h2
              className="mx-auto text-center text-3xl font-bold tracking-tight sm:text-left"
              data-aos="fade-right"
            >
              Strona startowa
            </h2>
          </div>
          <DashboardTabs
            {...{
              stats,
              subscriptions,
              lastActions,
              vocabularyChart,
              plans,
              userTickets,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
