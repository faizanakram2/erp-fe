// features/customers/columns.tsx

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, FileText } from "lucide-react";
import { Customer } from "./types";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.customer}
      </span>
    ),
  },

  {
    id: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Phone className="h-3 w-3 text-slate-500" />
          {row.original.phone}
        </div>

        <div className="flex items-center gap-2">
          <Mail className="h-3 w-3 text-slate-500" />
          {row.original.email}
        </div>
      </div>
    ),
  },

  {
    accessorKey: "cnic",
    header: "CNIC",
  },

  {
    accessorKey: "bookings",
    header: "Bookings",

    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-blue-600" />
        {row.original.bookings}
      </div>
    ),
  },

  {
    accessorKey: "investment",
    header: "Investment",

    cell: ({ row }) => (
      <span className="font-medium text-green-600">
        {row.original.investment}
      </span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => (
      <Badge className="rounded-full bg-slate-950 hover:bg-slate-950">
        {row.original.status}
      </Badge>
    ),
  },
];