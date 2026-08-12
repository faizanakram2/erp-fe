import AppToolbar from "@/components/common/AppToolbar";
import DashboardHeader from "@/components/common/dashboardHeader";
import StatsCard from "@/components/common/StatsCard";
import PaymentsTable from "@/components/features/manager/payments/PaymentsTable";
import { Filter } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Pending Verification",
    value: "8",
    subtitle: "Awaiting review",
    subtitleColor: "#64748B",
  },
  {
    id: 2,
    title: "This Month",
    value: "PKR 12.5M",
    subtitle: "+15.2% from last month",
    subtitleColor: "#00A63E",
  },
  {
    id: 3,
    title: "Rejected",
    value: 145,
    subtitle: "This Month",
    subtitleColor: "#64748B",
  },
];

export default function PaymentsPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <DashboardHeader
          title="Payments"
          description="Record and verify customer payments"
        />

        <div className="my-6">
          <AppToolbar
            searchPlaceholder="Search by receipt number or customer..."
            actions={[
              {
                id: "filter",
                label: "Filter",
                icon: <Filter size={16} />,
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
              subtitle={stat.subtitle}
              subtitleColor={stat.subtitleColor}
            />
          ))}
        </div>

        <PaymentsTable />
      </div>
    </div>
  );
}
