"use client";

import { vocabularyChart } from "@/types/user-data";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

export const WordsChart = ({
  vocabularyChart,
}: {
  vocabularyChart: vocabularyChart[];
}) => {
  if (vocabularyChart?.length < 5)
    return (
      <div className="mt-8 flex w-full items-center justify-center lg:mt-32">
        <p className="text-center text-sm font-medium">
          Zbyt mało danych, żeby wyświetlić wykres! 😙
        </p>
      </div>
    );

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={vocabularyChart.slice(0, 15)}
        margin={{
          top: 5,
          bottom: 5,
          left: 15,
        }}
      >
        <Tooltip labelStyle={{ display: "none" }} separator=": " />
        <Area
          type="monotone"
          dataKey="Poprawnie wykonane"
          stroke="#283db8"
          stackId={2}
          fill="#5069fa"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="Liczba słówek"
          stroke="#0225f2"
          stackId={1}
          fill="#4a5bc2"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
