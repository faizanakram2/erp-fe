"use client"

import DashboardHeader from "@/components/common/dashboardHeader";
import DashboardListCard, { DashboardListItem } from "@/components/common/DashboardListCard";
import QuickActions from "@/components/common/QuickActions";
import { salesAgentQuickActions } from "@/data/sales-agents-data/sales-agent-dashboard";

export const recentBookings: DashboardListItem[] = [
  {
    id: "BK-2026-0001",
    title: "BK-2026-0001",
    subtitle: "Ahmed Khan",
    meta: "A-125 - Green Valley Housing Society",
    amount: "PKR 1.20M / 3.00M",
    status: {
      label: "ACTIVE",
      variant: "dark",
    },
  },
  {
    id: "BK-2026-0002",
    title: "BK-2026-0002",
    subtitle: "Fatima Ali",
    meta: "B-45 - Blue Sky Apartments",
    amount: "PKR 0.90M / 3.00M",
    status: {
      label: "ACTIVE",
      variant: "dark",
    },
  },
  {
    id: "BK-2026-0003",
    title: "BK-2026-0003",
    subtitle: "Hassan Raza",
    meta: "C-78 - Green Valley Housing Society",
    amount: "PKR 0.50M / 2.50M",
    status: {
      label: "DEFAULTER",
      variant: "danger",
    },
  },
];

export const recentPayments: DashboardListItem[] = [
  {
    id: "RC-2026-1234",
    title: "RC-2026-1234",
    subtitle: "Ahmed Khan",
    meta: "Bank Transfer • 2026-05-15",
    amount: "PKR 100K",
    status: {
      label: "CONFIRMED",
      variant: "dark",
    },
  },
  {
    id: "RC-2026-1235",
    title: "RC-2026-1235",
    subtitle: "Fatima Ali",
    meta: "Cash • 2026-05-18",
    amount: "PKR 150K",
    status: {
      label: "PENDING",
      variant: "default",
    },
  },
  {
    id: "RC-2026-1236",
    title: "RC-2026-1236",
    subtitle: "Hassan Raza",
    meta: "Cheque • 2026-05-19",
    amount: "PKR 200K",
    status: {
      label: "VERIFIED",
      variant: "default",
    },
  },
];


export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <DashboardHeader
          title="Welcome back, Sales Agent!"
          description="Here's what's happening in your organization"
          badge="SALES AGENT"
        />

         <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <DashboardListCard
            title="Recent Bookings"
            items={recentBookings}
          />

          <DashboardListCard
            title="Recent Payments"
            items={recentPayments}
          />

          <DashboardListCard
            title="Recent Payments"
            items={recentPayments}
          />
        </div>

        <QuickActions
        title="Quick Actions for SALES AGENT"
        actions={salesAgentQuickActions}
      />
      </div>
    </div>
  );
}
