"use client";

import { Download } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Report {
  id: number;
  title: string;
  category: "FINANCIAL" | "SALES" | "OPERATIONS" | "COMPLIANCE";
  description: string;
  lastGenerated: string;
  frequency: "Daily" | "Weekly" | "Monthly";
  icon: React.ReactNode;
}

interface ReportCardProps {
  report: Report;
  onGenerate?: (report: Report) => void;
}

export default function ReportCard({
  report,
  onGenerate,
}: ReportCardProps) {
  return (
    <Card className="rounded-xl border-[#E4E4E7] shadow-none">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9]">
            {report.icon}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Title + Badge */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1.5">
                <h3 className="truncate text-base font-semibold text-[#0A0A0A]">
                  {report.title}
                </h3>

                <Badge
                  className={`shrink-0 rounded-md px-1.5 py-0 text-xs font-medium ${
                    report.category === "COMPLIANCE"
                      ? "bg-red-500 text-white hover:bg-red-500"
                      : report.category === "SALES"
                      ? "bg-[#ECEEF2] text-[#030213]"
                      : report.category === "OPERATIONS"
                      ? "bg-white text-[#18181B] border border-[#E4E4E7] hover:bg-white"
                      : "bg-black text-white hover:bg-black"
                  }`}
                >
                  {report.category}
                </Badge>
              </div>

              {/* Generate */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onGenerate?.(report)}
                className="h-8 shrink-0 gap-1.5 rounded-md border-[#E4E4E7] px-3 text-sm font-medium shadow-none"
              >
                <Download size={13} />
                Generate
              </Button>
            </div>

            {/* Description */}
            <p className="mt-1 max-w-[320px] text-sm leading-5 text-[#45556C]">
              {report.description}
            </p>

            {/* Meta */}
            <div className="mt-2 flex flex-wrap items-center gap-x-1 text-xs text-[#62748E]">
              <span>
                Last: {report.lastGenerated}
              </span>

              <span>Frequency: {report.frequency}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}