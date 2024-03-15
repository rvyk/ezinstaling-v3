"use client";

import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "@/app/(routes)/dashboard/_components/_table/data-table-faceted-filter";
import { SettingsContext } from "@/app/context";
import { priorities, status } from "@/lib/utils";
import { useContext } from "react";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export const DataTableToolbar = <TData,>({
  table,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { setShowReportModal } = useContext(SettingsContext);

  const columns = ["action", "title"];
  const column = columns.find((col) => table.getColumn(col));

  const translations: { [key: string]: string } = {
    action: "akcji",
    title: "tematu",
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
        <Input
          placeholder={`Przefiltruj wg. ${column ? translations[column] : ""}`}
          value={(table.getColumn(column!)?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn(column!)?.setFilterValue(event.target.value);
          }}
          className="mb-2 h-8 w-full bg-white placeholder:truncate sm:w-[250px]"
        />
        <div className="flex w-full flex-wrap justify-between">
          <div className="mb-2 flex items-center space-x-2">
            {table.getColumn("priority") && (
              <div className="mr-2 w-1/2 sm:mr-0 sm:w-fit">
                <DataTableFacetedFilter
                  column={table.getColumn("priority")}
                  title="Priorytet"
                  options={priorities}
                />
              </div>
            )}

            {table.getColumn("status") && (
              <div className="w-1/2 sm:w-fit">
                <DataTableFacetedFilter
                  column={table.getColumn("status")}
                  title="Status"
                  options={status}
                />
              </div>
            )}

            {isFiltered && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.resetColumnFilters()}
                className="h-8 w-1/2 rounded-[8px] border-dashed border-zinc-200 bg-white px-2 hover:bg-zinc-100 sm:w-fit lg:px-3"
              >
                Reset
                <Cross2Icon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {table.getColumn("status") && (
            <Button
              variant="secondaryBlue"
              size="sm"
              className="rounded-[8px]"
              onClick={() => setShowReportModal?.(true)}
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              <span className="hidden sm:block">Utwórz N</span>
              <span className="block sm:hidden">N</span>owy ticket
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
