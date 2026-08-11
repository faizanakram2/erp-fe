"use client";

import AppToolbar from "@/components/common/AppToolbar";
import DashboardHeader from "@/components/common/dashboardHeader";
import StatsCard from "@/components/common/StatsCard";
import { Calendar, DollarSign, Download, TrendingUp, TriangleAlert, CalendarDays, FileText, Wallet, Building2, Users } from "lucide-react";


import ReportCard, {
  type Report,
} from "@/components/features/reports/ReportCard";
import { Card, CardContent } from "@/components/ui/card";
import CollectionForecast from "@/components/features/reports/CollectionForecast";
import ReceivablesAging from "@/components/features/reports/ReceivablesAging";

const reports: Report[] = [
  {
    id: 1,
    title: "Collection Forecast",
    category: "FINANCIAL",
    description:
      "Monthly payment collection predictions and analysis",
    lastGenerated: "2026-05-20 09:30 AM",
    frequency: "Daily",
    icon: (
      <DollarSign
        size={20}
        className="text-green-600"
      />
    ),
  },

  {
    id: 2,
    title: "Aging Report",
    category: "FINANCIAL",
    description:
      "Outstanding payments categorized by aging buckets",
    lastGenerated: "2026-05-20 08:00 AM",
    frequency: "Daily",
    icon: (
      <Calendar
        size={20}
        className="text-orange-500"
      />
    ),
  },

  {
    id: 3,
    title: "Sales Performance",
    category: "SALES",
    description:
      "Booking and sales metrics by project and agent",
    lastGenerated: "2026-05-19 06:00 PM",
    frequency: "Weekly",
    icon: (
      <TrendingUp
        size={20}
        className="text-blue-600"
      />
    ),
  },

  {
    id: 4,
    title: "P&L Statement",
    category: "FINANCIAL",
    description:
      "Profit and loss statement with revenue and expenses",
    lastGenerated: "2026-05-15 10:00 AM",
    frequency: "Monthly",
    icon: (
      <FileText
        size={20}
        className="text-purple-600"
      />
    ),
  },

  {
    id: 5,
    title: "Cash Flow Analysis",
    category: "FINANCIAL",
    description:
      "Inflows and outflows of cash across all projects",
    lastGenerated: "2026-05-18 02:00 PM",
    frequency: "Weekly",
    icon: (
      <DollarSign
        size={20}
        className="text-green-600"
      />
    ),
  },

  {
    id: 6,
    title: "Project Inventory",
    category: "OPERATIONS",
    description:
      "Available vs sold plots across all projects",
    lastGenerated: "2026-05-20 07:00 AM",
    frequency: "Daily",
    icon: (
      <Building2
        size={20}
        className="text-blue-600"
      />
    ),
  },

  {
    id: 7,
    title: "Customer Analytics",
    category: "SALES",
    description:
      "Customer acquisition, retention, and demographics",
    lastGenerated: "2026-05-17 11:00 AM",
    frequency: "Monthly",
    icon: (
      <Users
        size={20}
        className="text-purple-600"
      />
    ),
  },

  {
    id: 8,
    title: "Defaulter Report",
    category: "COMPLIANCE",
    description:
      "List of defaulting customers and overdue amounts",
    lastGenerated: "2026-05-20 08:30 AM",
    frequency: "Daily",
    icon: (
      <TriangleAlert
        size={20}
        className="text-red-500"
      />
    ),
  },
];

const stats = [
  {
    id: 1,
    title: "Total Revenue (MTD)",
    value: 'PKR 23.5M',
    icon: DollarSign,
    iconColor: "#00A63E",
    subtitle: "-6% vs forecast",
    subtitleColor: "#E7000B",
  },
  {
    id: 2,
    title: "Outstanding (All)",
    value: 'PKR 29.9M',
    icon: Calendar,
    iconColor: "#F54900",
    subtitle: "Across 308 customers",
    subtitleColor: "#64748B",
  },
  {
    id: 3,
    title: "Overdue Critical",
    value: 15,
    icon: TriangleAlert,
    iconColor: "#E7000B",
    subtitle: "PKR 1.5M overdue 120+ days",
    subtitleColor: "#E7000B",
  },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <DashboardHeader
          title="Reports & Analytics"
          icon={TrendingUp}
          description="Financial reports, forecasts, and business intelligence"
          buttonText="Export All"
          buttonIcon={<Download className="h-4 w-4" />}
          onButtonClick={() => console.log("Export All")}
        />

        <div className="my-6">
          <AppToolbar
            actions={[
              {
                id: "all",
                label: "All",
              },
              {
                id: "financial",
                label: "Financial",
              },
              {
                id: "sales",
                label: "Sales",
              },
              {
                id: "operations",
                label: "Operations",
              },
              {
                id: "compliance",
                label: "Compliance",
              },
            ]}
          />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <StatsCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.iconColor}
              subtitle={stat.subtitle}
              subtitleColor={stat.subtitleColor}
            />
          ))}
        </div>

        <Card className="rounded-xl border-[#E4E4E7] shadow-none">
          <CardContent className="p-5">
            <h2 className="mb-6 text-base font-medium text-[#0A0A0A]">
              Available Reports
            </h2>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {reports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onGenerate={(report) => {
                    console.log(
                      "Generate report:",
                      report.title
                    );
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <CollectionForecast />

        <ReceivablesAging />
      </div>
    </div>
  );
}
