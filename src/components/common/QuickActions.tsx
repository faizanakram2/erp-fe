"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
  onClick?: () => void;
}

interface QuickActionsProps {
  title?: string;
  actions: QuickAction[];
}

export default function QuickActions({
  title = "Quick Actions",
  actions,
}: QuickActionsProps) {
  return (
    <Card className="rounded-xl border-[#E5E7EB] shadow-none">
      <CardHeader className="px-7 pt-6 pb-5">
        <CardTitle className="text-[18px] font-medium text-[#111111]">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-7 pb-7">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 ">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.id}
                type="button"
                onClick={action.onClick}
                className="flex min-h-[76px] items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white px-4 text-left transition hover:border-[#D1D5DB] hover:bg-[#FAFAFA] active:scale-[0.99]"
              >
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE]",
                    action.iconClassName
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <p className="text-base font-medium leading-5 text-[#0A0A0A]">
                    {action.title}
                  </p>

                  <p className="mt-0.5 text-sm font-medium leading-5 text-[#45556C]">
                    {action.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}