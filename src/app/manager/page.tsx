"use client";

import DashboardHeader from "@/components/common/dashboardHeader";
import { Plus } from "lucide-react";
import React from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type BadgeVariant =
  | "ACTIVE"
  | "DEFAULTER"
  | "CONFIRMED"
  | "PENDING"
  | "VERIFIED";

interface StatCardProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  sub: string;
  subColor?: string;
}

interface BookingRowProps {
  id: string;
  name: string;
  address: string;
  badge: BadgeVariant;
  amount: string;
}

interface PaymentRowProps {
  id: string;
  name: string;
  method: string;
  date: string;
  badge: BadgeVariant;
  amount: string;
}

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  sub: string;
  bgColor: string;
}

// ── Badge ──────────────────────────────────────────────────────────────────
const badgeStyles: Record<BadgeVariant, string> = {
  ACTIVE: "bg-gray-900 text-white",
  DEFAULTER: "bg-red-500 text-white",
  CONFIRMED: "bg-gray-900 text-white",
  PENDING: "bg-transparent text-gray-500 border border-gray-300",
  VERIFIED: "bg-transparent text-gray-500 border border-gray-300",
};

function Badge({ variant }: { variant: BadgeVariant }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide ${badgeStyles[variant]}`}
    >
      {variant}
    </span>
  );
}

// ── Icons (inline SVG) ─────────────────────────────────────────────────────
const DollarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#22c55e"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3b82f6"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BookingsIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#8b5cf6"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const AlertIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ef4444"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ReviewIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3b82f6"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const CustomerIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#22c55e"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ReportsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f59e0b"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({
  label,
  icon,
  value,
  sub,
  subColor = "text-green-500",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1 min-w-0">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-[#0A0A0A] font-medium">{label}</span>
        <span>{icon}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 leading-tight">
        {value}
      </div>
      <div className={`text-xs  mt-1  ${subColor}`}>{sub}</div>
    </div>
  );
}

// ── Booking Row ────────────────────────────────────────────────────────────
function BookingRow({ id, name, address, badge, amount }: BookingRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900">{id}</div>
        <div className="text-xs text-gray-500 mt-0.5">{name}</div>
        <div className="text-xs text-gray-400">{address}</div>
      </div>
      <div className="flex flex-col items-end gap-1 ml-4">
        <Badge variant={badge} />
        <div className="text-xs text-gray-500 whitespace-nowrap">{amount}</div>
      </div>
    </div>
  );
}

// ── Payment Row ────────────────────────────────────────────────────────────
function PaymentRow({
  id,
  name,
  method,
  date,
  badge,
  amount,
}: PaymentRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900">{id}</div>
        <div className="text-xs text-gray-500 mt-0.5">{name}</div>
        <div className="text-xs text-gray-400">
          {method} • {date}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 ml-4">
        <Badge variant={badge} />
        <div className="text-xs font-semibold text-gray-800 whitespace-nowrap">
          {amount}
        </div>
      </div>
    </div>
  );
}

// ── Quick Action ───────────────────────────────────────────────────────────
function QuickAction({ icon, label, sub, bgColor }: QuickActionProps) {
  return (
    <button className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex-1 min-w-0 text-left">
      <div
        className={`w-9 h-9 rounded-lg  flex items-center justify-center flex-shrink-0`}
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </div>
      <div>
        <div className="text-sm font-medium text-[#0A0A0A]">{label}</div>
        <div className="text-xs text-[#45556C]">{sub}</div>
      </div>
    </button>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function ManagerDashboard() {
  const statCards = [
    {
      id: 1,
      label: "Total Revenue",
      icon: <DollarIcon />,
      value: "PKR 750.0M",
      sub: "+12.5% from last month",
      subColor: "text-gray-500",
    },
    {
      id: 2,
      label: "Total Customers",
      icon: <UsersIcon />,
      value: "287",
      sub: "+8 new this month",
      subColor: "text-gray-500",
    },
    {
      id: 3,
      label: "Active Bookings",
      icon: <BookingsIcon />,
      value: "145",
      sub: "5 projects",
      subColor: "text-gray-500",
    },
    {
      id: 4,
      label: "Overdue Installments",
      icon: <AlertIcon />,
      value: "12",
      sub: "Requires attention",
      subColor: "text-red-500",
    },
  ];

  const recentBookings = [
    {
      id: "BK-2026-0001",
      name: "Ahmed Khan",
      address: "A-125 - Green Valley Housing Society",
      badge: "ACTIVE" as BadgeVariant,
      amount: "PKR 1.2M / 3.00M",
    },
    {
      id: "BK-2026-0002",
      name: "Fatima Ali",
      address: "B-45 - Blue Sky Apartments",
      badge: "ACTIVE" as BadgeVariant,
      amount: "PKR 0.80M /3.00M",
    },
    {
      id: "BK-2026-0003",
      name: "Hassan Raza",
      address: "C-78 - Green Valley Housing Society",
      badge: "DEFAULTER" as BadgeVariant,
      amount: "PKR 0.5M / 2.5M",
    },
  ];
  const recentPayments = [
    {
      id: "PMT-2026-0001",
      name: "Ahmed Khan",
      method: "Credit Card",

      date: "2026-09-01",
      badge: "CONFIRMED" as BadgeVariant,
      amount: "PKR 0.4M",
    },
    {
      id: "PMT-2026-0002",
      name: "Fatima Ali",
      method: "Bank Transfer",
      date: "2026-09-03",

      badge: "PENDING" as BadgeVariant,
      amount: "PKR 0.3M",
    },
    {
      id: "PMT-2026-0003",
      name: "Hassan Raza",
      method: "Cash",
      date: "2026-08-28",
      badge: "DEFAULTER" as BadgeVariant,
      amount: "PKR 0.2M",
    },
  ];
  const quickActions = [
    {
      id: 1,
      icon: <ReviewIcon />,
      label: "Review Bookings",
      sub: "Approve pending bookings",
      bgColor: "#DBEAFE",
    },
    {
      id: 2,
      icon: <CustomerIcon />,
      label: "Customer List",
      sub: "View all customers",
      bgColor: "#DBEAFE",
    },
    {
      id: 3,
      icon: <ReportsIcon />,
      label: "Reports",
      sub: "Collection forecast",
      bgColor: "#DBEAFE",
    },
  ];
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <DashboardHeader
          title="Welcome back, Project Manager!"
          description="Here's what's happening in your organization"
          badge="Manager"
          // buttonText="New Project"
          // buttonIcon={<Plus className="h-4 w-4" />}
          // onButtonClick={() => console.log("Create Project")}
        />

        {/* Stat Cards */}
        <div className="flex gap-4">
          {statCards.map((card) => {
            return (
              <StatCard
                key={card.id}
                label={card.label}
                icon={card.icon}
                value={card.value}
                sub={card.sub}
                subColor={card.subColor}
              />
            );
          })}
        </div>

        {/* Recent Bookings + Recent Payments */}
        <div className="grid grid-cols-2 gap-4">
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg border border-[#0000001A] p-4">
            <h2 className="text-base font-medium text-[#0A0A0A] mb-1">
              Recent Bookings
            </h2>
            <div className="divide-y divide-gray-100">
              {recentBookings.map((booking) => (
                <BookingRow
                  key={booking.id}
                  id={booking.id}
                  name={booking.name}
                  address={booking.address}
                  badge={booking.badge}
                  amount={booking.amount}
                />
              ))}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white rounded-lg border border-[#0000001A] p-4">
            <h2 className="text-sm font-bold text-gray-900 mb-1">
              Recent Payments
            </h2>
            <div className="divide-y divide-gray-100">
              {recentPayments.map((payment) => (
                <PaymentRow
                  key={payment.id}
                  id={payment.id}
                  name={payment.name}
                  method={payment.method}
                  date={payment.date}
                  badge={payment.badge}
                  amount={payment.amount}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-[#0000001A] p-4">
          <h2 className="text-base font-medium text-[#0A0A0A] mb-3">
            Quick Actions for <span className="uppercase">MANAGER</span>
          </h2>
          <div className="flex gap-3">
            {quickActions.map((action) => {
              return (
                <QuickAction
                  key={action.id}
                  icon={action.icon}
                  label={action.label}
                  sub={action.sub}
                  bgColor={action.bgColor}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
