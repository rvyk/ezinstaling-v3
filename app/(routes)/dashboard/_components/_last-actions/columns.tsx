"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/app/(routes)/dashboard/_components/_table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { cn, priorities } from "@/lib/utils";
import { Task } from "@/schemas";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Data / godzina"
        className="text-xs md:ml-4"
      />
    ),
    cell: ({ row }) => (
      <div className="min-w-20 md:ml-4">
        <p>{new Date(row.getValue("timestamp")).toLocaleDateString("en-GB")}</p>
        <p>{new Date(row.getValue("timestamp")).toLocaleTimeString()}</p>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Akcja"
        className="text-xs"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="min-w-40 max-w-60 font-medium">
            {row.getValue("action")}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Opis" className="text-xs" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="min-w-60 max-w-2xl font-medium">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Priorytet"
        className="text-xs"
      />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority"),
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          <Badge className={cn(priority.style, "rounded-[6px]")}>
            {priority.icon && (
              <priority.icon className="mr-2 h-6 w-4 text-muted-foreground" />
            )}
            {priority.label}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
