"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Booking } from "./types";

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "bookingNo",
    header: "Booking #",
  },

  {
    accessorKey: "customer",
    header: "Customer",
  },

  {
    accessorKey: "plot",
    header: "Plot",
  },

  {
    accessorKey: "project",
    header: "Project",
  },

  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },

  {
    accessorKey: "paid",
    header: "Paid",

    cell: ({ row }) => {
      const paid = row.original.paid;
      const percentage = (paid / 3000000) * 100;

      return (
        <div className="w-[130px]">
          <p className="text-green-600 font-medium">
            PKR {(paid / 1000000).toFixed(2)}M
          </p>

          <Progress
            value={percentage}
            className="mt-1 h-1.5 rounded-full bg-slate-200"
            indicatorClassName="bg-green-500"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "dueDate",
    header: "Due Date",
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => (
      <Badge
        className={
          row.original.status === "ACTIVE"
            ? "bg-slate-900"
            : "bg-red-600"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
];