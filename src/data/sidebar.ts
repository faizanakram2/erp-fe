import { SidebarSection } from "@/types/sidebar";

export const salesAgentSidebar: SidebarSection[] = [
    {
      id: "dashboard",
      items: [
        {
          id: "1",
          label: "Dashboard",
          icon: "/icons/dashboard.svg",
          href: "/sales-agents",
        },
      ],
    },
    {
      id: "operations",
      title: "Operations",
      items: [
        {
          id: "2",
          label: "Projects",
          icon: "/icons/projectsIcon.svg",
          href: "/sales-agents/projects",
        },
        {
          id: "3",
          label: "Customers",
          icon: "/icons/customersIcon.svg",
          href: "/sales-agents/customers",
        },
        {
          id: "4",
          label: "Bookings",
          icon: "/icons/bookingsIcon.svg",
          href: "/sales-agents/bookings",
        },
        {
          id: "5",
          label: "Payments",
          icon: "/icons/paymentsIcon.svg",
          href: "/sales-agents/payments",
        },
      ],
    },
  ];

  export const userAgentSidebar: SidebarSection[] = [
    {
      id: "dashboard",
      items: [
        {
          id: "1",
          label: "Dashboard",
          icon: "/icons/dashboard.svg",
          href: "/users",
        },
      ],
    },
    {
      id: "operations",
      title: "Operations",
      items: [
        {
          id: "2",
          label: "Bookings",
          icon: "/icons/bookingsIcon.svg",
          href: "/users/bookings",
        },
        {
          id: "3",
          label: "Payments",
          icon: "/icons/paymentsIcon.svg",
          href: "/users/payments",
        },
      ],
    },
    {
      id: "management",
      title: "Management",
      items: [
        {
          id: "4",
          label: "HR & Payroll",
          icon: "/icons/hr.svg",
          href: "/users/hr",
        },
        {
          id: "5",
          label: "Accounting",
          icon: "/icons/accounting.svg",
          href: "/users/accounting",
        },
        {
          id: "6",
          label: "Reports",
          icon: "/icons/reportIcon.svg",
          href: "/users/reports",
        },
      ],
    },
  ];

  export const managerSidebar: SidebarSection[] = [
    {
      id: "dashboard",
      items: [
        {
          id: "1",
          label: "Dashboard",
          icon: "/icons/dashboard.svg",
          href: "/manager",
        },
      ],
    },
    {
      id: "operations",
      title: "Operations",
      items: [
        {
          id: "2",
          label: "Projects",
          icon: "/icons/projectsIcon.svg",
          href: "/manager/projects",
        },
        {
          id: "3",
          label: "Customers",
          icon: "/icons/customersIcon.svg",
          href: "/manager/customers",
        },
        {
          id: "4",
          label: "Bookings",
          icon: "/icons/bookingsIcon.svg",
          href: "/manager/bookings",
        },
        {
          id: "5",
          label: "Payments",
          icon: "/icons/paymentsIcon.svg",
          href: "/manager/payments",
        },
        {
          id: "6",
          label: "Construction",
          icon: "/icons/constructionsIcon.svg",
          href: "/manager/constructions",
        },
        {
          id: "7",
          label: "Vendors",
          icon: "/icons/vendorsIcon.svg",
          href: "/manager/vendors",
        },
      ],
    },
    {
      id: "management",
      title: "Management",
      items: [
        {
          id: "8",
          label: "Reports",
          icon: "/icons/reportIcon.svg",
          href: "/manager/reports",
        },
      ],
    },
    {
      id: "administration",
      title: "Administration",
      items: [
        {
          id: "9",
          label: "Users",
          icon: "/icons/userIcon.svg",
          href: "/manager/users",
        },
      ],
    },
  ];