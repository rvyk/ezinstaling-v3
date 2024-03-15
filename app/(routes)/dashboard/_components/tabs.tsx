"use client";

import { columns as lastActionsColumns } from "@/app/(routes)/dashboard/_components/_last-actions/columns";
import Overview from "@/app/(routes)/dashboard/_components/_overview/overview";
import { DataTable } from "@/app/(routes)/dashboard/_components/_table/data-table";
import { columns as userTicketsColumns } from "@/app/(routes)/dashboard/_components/_tickets/columns";
import CreateNewTicket from "@/app/(routes)/dashboard/_components/_tickets/create-new";
import Upgrade from "@/app/(routes)/dashboard/_components/_upgrade/upgrade";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plans } from "@/types/plans";
import {
  Subscriptions,
  UserStats,
  lastActions,
  vocabularyChart,
} from "@/types/user-data";
import {
  ChatBubbleIcon,
  HomeIcon,
  ReaderIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const DashboardTabs = ({
  stats,
  subscriptions,
  lastActions,
  vocabularyChart,
  plans,
  userTickets,
}: {
  stats: UserStats;
  subscriptions: Subscriptions;
  lastActions: lastActions[];
  vocabularyChart: vocabularyChart[];
  plans: Plans;
  userTickets: Ticket[];
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const [currentTab, setCurrentTab] = useState(params.get("tab") || "overview");

  const onTabChange = (value: string) => {
    setCurrentTab(value);
    router.replace(`/dashboard?tab=${value}`);
  };

  const tabs = [
    {
      value: "overview",
      label: (
        <div className="flex items-center justify-between">
          <HomeIcon className="mr-2" /> Przeglądaj
        </div>
      ),
    },
    {
      value: "upgrade",
      label: (
        <div className="flex items-center justify-between">
          <RocketIcon className="mr-2" /> Ulepsz
        </div>
      ),
    },
    {
      value: "tickets",
      label: (
        <div className="flex items-center justify-between">
          <ChatBubbleIcon className="mr-2" /> Pomoc
        </div>
      ),
    },
    {
      value: "logs",
      label: (
        <div className="flex items-center justify-between">
          <ReaderIcon className="mr-2" /> Dziennik zdarzeń
        </div>
      ),
    },
  ];

  return (
    <Tabs
      defaultValue="przegladaj"
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
            className="rounded-[6px] px-4 transition-colors hover:bg-[#fafafa] data-[state=active]:bg-[#5069fa] data-[state=active]:text-[#fafafa] data-[state=active]:hover:bg-[#283db8]"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <Overview
          {...{
            stats,
            subscriptions,
            lastActions,
            vocabularyChart,
            onTabChange,
          }}
        />
      </TabsContent>
      <TabsContent value="logs">
        <DataTable data={lastActions} columns={lastActionsColumns} />
      </TabsContent>
      <TabsContent value="upgrade">
        <Upgrade {...{ plans }} />
      </TabsContent>
      <TabsContent value="tickets">
        <DataTable
          mode="tickets"
          data={userTickets}
          columns={userTicketsColumns}
        />
        <CreateNewTicket />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
