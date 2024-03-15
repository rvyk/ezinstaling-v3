"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { taskSchema } from "@/schemas";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export const DataTableRowActions = <TData,>({
  row,
}: DataTableRowActionsProps<TData>) => {
  const task = taskSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Usuń</DropdownMenuItem>
        {task.priority != "low" && (
          <DropdownMenuItem>Zgłoś jako błąd</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
