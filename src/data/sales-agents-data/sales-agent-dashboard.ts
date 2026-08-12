import {
  DollarSign,
  FileText,
  Users,
} from "lucide-react";

export const salesAgentQuickActions = [
  {
    id: "add-customer",
    title: "Add Customer",
    description: "Register new customer",
    icon: Users,
    iconClassName: "text-[#155DFC]",
    onClick: () => console.log("Add Customer"),
  },
  {
    id: "create-booking",
    title: "Create Booking",
    description: "Book a plot",
    icon: FileText,
    iconClassName: "text-[#00A63E]",
    onClick: () => console.log("Create Booking"),
  },
  {
    id: "record-payment",
    title: "Record Payment",
    description: "Add payment entry",
    icon: DollarSign,
    iconClassName: "text-[#9810FA]",
    onClick: () => console.log("Record Payment"),
  },
];