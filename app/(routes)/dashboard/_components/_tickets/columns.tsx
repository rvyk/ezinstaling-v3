"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/app/(routes)/dashboard/_components/_table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { cn, priorities, status } from "@/lib/utils";

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Identyfikator"
        className="md:ml-4"
      />
    ),
    cell: ({ row }) => (
      <div className="min-w-32 md:ml-4">
        <p>{(row.getValue("id") as string).toString().slice(0, 6)}</p>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Temat"
        className="text-xs"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="min-w-40 max-w-60 font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statuses = status.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!statuses) {
        return null;
      }

      return (
        <div className="flex min-w-20 items-center">
          <Badge className={cn(statuses.style, "rounded-[6px]")}>
            {statuses.label}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ostatnia akt." />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="min-w-32 max-w-2xl font-medium">
            {new Date(row.getValue("updatedAt")).toLocaleString()}
          </span>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priorytet" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority"),
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex min-w-20 items-center">
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
  {
    accessorKey: "supportAgent",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Przejęty przez"
        className="text-xs md:ml-4"
      />
    ),
    cell: ({ row }) => (
      <div className="min-w-20 md:ml-4">
        <p>{row.getValue("supportAgent") || "Nie przejęty"}</p>
      </div>
    ),
    enableSorting: false,
  },
];
