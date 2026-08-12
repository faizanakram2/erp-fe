"use client";

import { Card, CardContent } from "@/components/ui/card";

interface AgingItem {
  id: number;
  label: string;
  customers: number;
  amount: string;
  percentage: number;
  critical?: boolean;
}

const agingData: AgingItem[] = [
  {
    id: 1,
    label: "Current (0-30 days)",
    customers: 145,
    amount: "PKR 12.5M",
    percentage: 42,
  },
  {
    id: 2,
    label: "31-60 days",
    customers: 78,
    amount: "PKR 8.9M",
    percentage: 30,
  },
  {
    id: 3,
    label: "61-90 days",
    customers: 42,
    amount: "PKR 4.2M",
    percentage: 14,
  },
  {
    id: 4,
    label: "91-120 days",
    customers: 28,
    amount: "PKR 2.8M",
    percentage: 9,
  },
  {
    id: 5,
    label: "120+ days (Critical)",
    customers: 15,
    amount: "PKR 1.5M",
    percentage: 5,
    critical: true,
  },
];

export default function ReceivablesAging() {
  return (
    <Card className="rounded-2xl border-[#E4E4E7] shadow-none">
      <CardContent className="p-7">
        {/* Heading */}
        <h2 className="text-base font-medium text-[#0A0A0A]">
          Receivables Aging Analysis
        </h2>

        {/* Aging rows */}
        <div className="mt-7 space-y-5">
          {agingData.map((item) => (
            <div key={item.id}>
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-[#0A0A0A]">
                    {item.label}
                  </h3>

                  <p className="mt-1 text-sm text-[#45556C]">
                    {item.customers} customers • {item.amount}
                  </p>
                </div>

                <span className="shrink-0 text-lg font-semibold text-[#0A0A0A]">
                  {item.percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                <div
                  className={`h-full rounded-full ${
                    item.critical
                      ? "bg-red-500"
                      : "bg-[#155DFC]"
                  }`}
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}