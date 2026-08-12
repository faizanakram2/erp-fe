"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Payment } from "./types";

const statusStyles: Record<Payment["status"], string> = {
  CONFIRMED: "bg-[#0F172A] text-white hover:bg-[#0F172A]",
  PENDING: "bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC]",
  VERIFIED: "bg-[#EEF2FF] text-[#334155] hover:bg-[#EEF2FF]",
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "receiptNo",
    header: "Receipt #",
  },

  {
    accessorKey: "customer",
    header: "Customer",
  },

  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.amount}
      </span>
    ),
  },

  {
    accessorKey: "method",
    header: "Method",
  },

  {
    accessorKey: "date",
    header: "Date",
  },

  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => (
      <Badge
        className={`rounded-full px-3 py-1 font-medium ${statusStyles[row.original.status]}`}
      >
        {row.original.status}
      </Badge>
    ),
  },
];