"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type DashboardListItem = {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  amount?: string;
  status?: {
    label: string;
    variant?: "dark" | "default" | "danger";
  };
};

interface DashboardListCardProps {
  title: string;
  items: DashboardListItem[];
}

export default function DashboardListCard({
  title,
  items,
}: DashboardListCardProps) {
  return (
    <Card className="rounded-xl border-[#E5E7EB] shadow-none">
      <CardHeader className="px-6 pt-6 pb-4">
        <CardTitle className="text-[18px] font-medium text-[#111111]">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-5">
        <div>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "relative py-4",
                index !== items.length - 1 &&
                  "border-b border-[#E5E7EB]"
              )}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[16px] font-medium leading-5 text-[#111111]">
                    {item.title}
                  </p>

                  {item.subtitle && (
                    <p className="mt-1 text-[14px] leading-5 text-[#52627A]">
                      {item.subtitle}
                    </p>
                  )}

                  {item.meta && (
                    <p className="text-[14px] leading-5 text-[#52627A]">
                      {item.meta}
                    </p>
                  )}
                </div>

                {item.status && (
                  <span
                    className={cn(
                      "shrink-0 rounded-lg px-2 py-0.5 text-[12px] font-medium",
                      item.status.variant === "danger"
                        ? "bg-[#E11D48] text-white"
                        : item.status.variant === "dark"
                          ? "bg-[#05051A] text-white"
                          : "border border-[#E5E7EB] bg-white text-[#111111]"
                    )}
                  >
                    {item.status.label}
                  </span>
                )}
              </div>

              {/* Amount */}
              {item.amount && (
                <div className="mt-1 flex justify-end">
                  <span className="text-[14px] font-medium text-[#111111]">
                    {item.amount}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}