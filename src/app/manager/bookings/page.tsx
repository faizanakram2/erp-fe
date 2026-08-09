"use client"
import AppToolbar from "@/components/common/AppToolbar";
import DashboardHeader from "@/components/common/dashboardHeader";
import BookingTable from "@/components/features/bookings/BookingTable";
import { Download, Filter, Plus } from "lucide-react";

export default function BookingsPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
                <DashboardHeader
                  title="Booking"
                  description="Manage plot bookings and installment schedules"
                  buttonText="New Booking"
                  buttonIcon={<Plus className="h-4 w-4" />}
                  onButtonClick={() => console.log("New Booking")}
                />
        
                <div className="my-6">
                  <AppToolbar
                    searchPlaceholder="Search bookings..."
                    actions={[
                      {
                        id: "filter-by-status",
                        label: "Filter by Status",
                        icon: <Filter size={16} />,
                      },
                      {
                        id: "export",
                        label: "Export",
                        icon: <Download size={16} />,
                      },
                    ]}
                  />
                </div>
        <BookingTable />
      </div>
    </div>
  );
}
