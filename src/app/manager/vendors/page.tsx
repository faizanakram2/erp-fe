"use client"
import AppToolbar from "@/components/common/AppToolbar";
import DashboardHeader from "@/components/common/dashboardHeader";
import StatsCard from "@/components/common/StatsCard";
import VendorCard, { Vendor } from "@/components/common/VendorCard";
import { Package, Plus } from "lucide-react";
import { useState } from "react";

const stats = [
  {
    id: 1,
    title: "Total Vendors",
    value: 6,
    icon: Package,
    iconColor: "#155DFC",
    subtitle: "Registered suppliers",
    subtitleColor: "#64748B",
  },
  {
    id: 2,
    title: "Active Vendors",
    value: 5,
    icon: Package,
    iconColor: "#00A63E",
    subtitle: "Currently working with",
    subtitleColor: "#64748B",
  },
  {
    id: 3,
    title: "Total Orders",
    value: 170,
    icon: Package,
    iconColor: "#9810FA",
    subtitle: "Across all vendors",
    subtitleColor: "#64748B",
  },
  {
    id: 4,
    title: "Total Spent",
    value: "PKR 29.9M",
    icon: Package,
    iconColor: "#F54900",
    subtitle: "Lifetime value",
    subtitleColor: "#64748B",
  },
];

const vendors: Vendor[] = [
  {
    id: 1,
    name: "Bestway Cement Ltd",
    status: "ACTIVE",
    category: "Building Materials",
    rating: 4.8,
    orders: 45,
    phone: "+92-300-1234567",
    city: "Karachi",
    totalSpent: "PKR 12.5M",
    paymentTerms: "30 days",
  },
  {
    id: 2,
    name: "Pakistan Steel Mills",
    status: "ACTIVE",
    category: "Steel & Iron",
    rating: 4.5,
    orders: 32,
    phone: "+92-321-9876543",
    city: "Karachi",
    totalSpent: "PKR 8.9M",
    paymentTerms: "45 days",
  },
  {
    id: 3,
    name: "Master Tiles & Ceramics",
    status: "ACTIVE",
    category: "Tiles & Flooring",
    rating: 4.7,
    orders: 28,
    phone: "+92-333-4567890",
    city: "Lahore",
    totalSpent: "PKR 3.2M",
    paymentTerms: "15 days",
  },
  {
    id: 4,
    name: "Green Valley Landscaping",
    status: "ACTIVE",
    category: "Landscaping",
    rating: 4.3,
    orders: 15,
    phone: "+92-300-7654321",
    city: "Islamabad",
    totalSpent: "PKR 1.8M",
    paymentTerms: "7 days",
  },
  {
    id: 5,
    name: "Premier Electrical Supplies",
    status: "ACTIVE",
    category: "Electrical",
    rating: 4.6,
    orders: 38,
    phone: "+92-321-1112222",
    city: "Rawalpindi",
    totalSpent: "PKR 2.5M",
    paymentTerms: "30 days",
  },
  {
    id: 6,
    name: "QuickFix Hardware",
    status: "INACTIVE",
    category: "Hardware & Tools",
    rating: 3.8,
    orders: 12,
    phone: "+92-300-3334444",
    city: "Lahore",
    totalSpent: "PKR 0.9M",
    paymentTerms: "15 days",
  },
];


export default function VendorsPage() {

  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

const filteredVendors = vendors.filter((vendor) => {
  if (statusFilter === "ALL") {
    return true;
  }

  return vendor.status === statusFilter;
});

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <DashboardHeader
          title="Vendor Management"
          icon={Package}
          description="Manage suppliers and service providers"
          buttonText="Add Vendor"
          buttonIcon={<Plus className="h-4 w-4" />}
          onButtonClick={() => console.log("Add Vendor")}
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

        <div className="my-6">
          <AppToolbar
          defaultActiveAction="all"
            searchPlaceholder="Search by vendor name, category, or city..."
            actions={[
              {
                id: "all",
                label: "All",
                 onClick: () => setStatusFilter("ALL"),
              },
              {
                id: "active",
                label: "Active",
                onClick: () => setStatusFilter("ACTIVE"),
              },
              {
                id: "inactive",
                label: "InActive",
                onClick: () => setStatusFilter("INACTIVE"),
              },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredVendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onViewDetails={(vendor) => {
                console.log("View vendor:", vendor);
              }}
              onCreateOrder={(vendor) => {
                console.log("Create order for:", vendor);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
