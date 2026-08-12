"use client"
import AppToolbar from "@/components/common/AppToolbar";
import DashboardHeader from "@/components/common/dashboardHeader";
import CustomerTable from "@/components/features/manager/customers/CustomerTable";
import { Download, Filter, Plus } from "lucide-react";

export default function CustomersPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <DashboardHeader
          title="Customers"
          description="Manage customer relationships and bookings"
          buttonText="Add Customer"
          buttonIcon={<Plus className="h-4 w-4" />}
          onButtonClick={() => console.log("Add Customer")}
        />

        <div className="my-6">
          <AppToolbar
            searchPlaceholder="Search projects"
            actions={[
              {
                id: "filter",
                label: "Filter",
                icon: <Filter size={16} />,
              },
              {
                id: "export",
                label: "Export CSV",
                icon: <Download size={16} />,
              },
            ]}
          />
        </div>
        <CustomerTable />
      </div>
    </div>
  );
}
