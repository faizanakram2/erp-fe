"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/ui_context";
type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  /** Close mobile drawer after navigation */
  onNavigate?: () => void;
};

const Sidebar = ({ isCollapsed, setIsCollapsed, onNavigate }: SidebarProps) => {
  const isExpanded = !isCollapsed;
  const pathname = usePathname();
  const { activeUI } = useUI();

  const userItems = [
    {
      id: "1",
      label: "Dashboard",
      icon: "/icons/dashboard.svg",
      href: "/users",
    },
    {
      id: "2",
      label: "Land & Planning",
      icon: "/icons/landAndPlanning.svg",
      href: "/users/land-planning",
    },
    {
      id: "3",
      label: "Construction",
      icon: "/icons/construction.svg",
      href: "/users/construction",
    },
    {
      id: "4",
      label: "Sales & CRM",
      icon: "/icons/salesAndCrm.svg",
      href: "/users/sales-crm",
    },
    {
      id: "5",
      label: "Human Resources",
      icon: "/icons/HumanResources.svg",
      href: "/users/human-resources",
    },
    {
      id: "6",
      label: "Finance & Accounting",
      icon: "/icons/Finance.svg",
      href: "/users/finance",
    },
    {
      id: "7",
      label: "Inventory",
      icon: "/icons/inventory.svg",
      href: "/users/inventory",
    },
    {
      id: "8",
      label: "Reports",
      icon: "/icons/reports.svg",
      href: "/users/reports",
    },
    {
      id: "9",
      label: "Settings",
      icon: "/icons/settings.svg",
      href: "/users/settings",
    },
  ];

  const managerItems = [
    {
      id: "1",
      label: "Dashboard",
      icon: "/icons/dashboard.svg",
      href: "/manager",
    },
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
      label: "Constructions",
      icon: "/icons/constructionsIcon.svg",
      href: "/manager/constructions",
    },
    {
      id: "7",
      label: "Vendors",
      icon: "/icons/vendorsIcon.svg",
      href: "/manager/vendors",
    },
    {
      id: "8",
      label: "Reports",
      icon: "/icons/reportIcon.svg",
      href: "/manager/reports",
    },
    {
      id: "9",
      label: "Users",
      icon: "/icons/userIcon.svg",
      href: "/manager/users",
    },
  ];

  const activeMenuItems = activeUI === "manager" ? managerItems : userItems;

  return (
    <div
      className={`h-screen flex flex-col justify-between bg-white border-r border-[#E2E8F0] ${
        isCollapsed ? "w-[80px]" : "w-[280px]"
      } transition-all duration-300`}
    >
      {/* TOP SECTION */}
      <div className="flex flex-col gap-6 items-center h-full">
        {/* LOGO */}
        <div
          className={`flex items-center mt-6 gap-2 ${
            isCollapsed ? "justify-center" : "w-full px-4"
          }`}
        >
          <Image
            src="/icons/Logo.svg"
            alt="real estate logo"
            width={32}
            height={32}
          />

          {isExpanded && (
            <div className="flex flex-col leading-none">
              <h1 className="font-semibold text-[20px] text-[#081021]">
                Real Estate
              </h1>
              <h1 className="font-light text-[11px] text-[#000000]">
                Management
              </h1>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="text-gray-500 hover:text-black text-sm cursor-pointer"
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-0 w-full px-2 ">
          {activeMenuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => onNavigate?.()}
              className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                isCollapsed ? "justify-center" : ""
              } ${pathname === item.href ? "bg-[#EFF6FF]" : ""}`}
            >
              <Image src={item.icon} alt={item.label} width={20} height={20} />

              {isExpanded && (
                <span
                  className={`text-[14px] font-medium ${
                    pathname === item.href ? "text-[#2563EB]" : "text-[#64748B]"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* USER SECTION */}
      <div className="w-full  py-4">
        <div
          className={`flex items-center gap-3 ${
            isCollapsed ? "justify-center" : "px-4"
          }`}
        >
          <Image
            src="/user.svg"
            alt="user"
            width={40}
            height={40}
            className="rounded-full"
          />

          {isExpanded && (
            <div className="flex flex-col leading-tight">
              <span className="text-[12px] text-[#64748B]">
                Welcome back 👋
              </span>
              <span className="text-[14px] font-medium text-[#081021]">
                Johnathan
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
