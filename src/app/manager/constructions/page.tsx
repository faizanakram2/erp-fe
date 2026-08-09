"use client"
import AppToolbar from "@/components/common/AppToolbar";
import ConstructionActivityCard from "@/components/common/construction/ConstructionActivityCard";
import { activities } from "@/components/common/construction/data";
import DashboardHeader from "@/components/common/dashboardHeader";
import StatsCard from "@/components/common/StatsCard";
import SectionTabs from "@/components/common/Tabs/SectionTabs";
import { Plus, HardHat, Clock4, CircleCheckBig, Package } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Total Activites",
    value: "5",
    icon: HardHat,
    iconColor: "#155DFC",
    subtitle: "Across all projects",
    subtitleColor: "#64748B",
  },
  {
    id: 2,
    title: "In Process",
    value: "2",
    icon: Clock4,
    iconColor: "#155DFC",
    subtitle: "Active Construction",
    subtitleColor: "#64748B",
  },
  {
    id: 3,
    title: "Completed",
    value: 1,
    icon: CircleCheckBig,
    iconColor: "#00A63E",
    subtitle: "Finished Activities",
    subtitleColor: "#64748B",
  },
  {
    id: 4,
    title: "Material Request",
    icon: Package,
    iconColor: "#9810FA",
    value: 4,
    subtitle: "1 Pending Approvel",
    subtitleColor: "#64748B",
  },
];

export default function ConstructionsPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <DashboardHeader
          title="Construction Management"
          icon={HardHat}
          description="Track construction progress and material requisitions"
          buttonText="New Activity"
          buttonIcon={<Plus className="h-4 w-4" />}
          onButtonClick={() => console.log("New Activity")}
        />

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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

        <div>
          <SectionTabs
            defaultValue="activities"
            tabs={[
              {
                value: "activities",
                label: "Construction Activities",
                content: <div>Activities Content</div>,
              },
              {
                value: "materials",
                label: "Material Requests",
                content: <div>Material Requests Content</div>,
              },
            ]}
          />
        </div>

        <div className="my-6">
          <AppToolbar
            searchPlaceholder="Search by project, activity, or engineer..." />
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <ConstructionActivityCard
              key={activity.id}
              activity={activity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
