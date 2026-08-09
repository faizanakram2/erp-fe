"use client";
import {
  managerSidebar,
  userAgentSidebar,
  salesAgentSidebar,
} from "@/data/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/ui_context";
import { SidebarSection } from "@/types/sidebar";
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

  

  const activeSections: SidebarSection[] =
    activeUI === "manager"
      ? managerSidebar
      : activeUI === "users"
        ? userAgentSidebar
        : salesAgentSidebar;

  return (
    <div
      className={`h-screen flex flex-col justify-between bg-white border-r border-[#E2E8F0] ${isCollapsed ? "w-[80px]" : "w-[280px]"
        } transition-all duration-300`}
    >
      {/* TOP SECTION */}
      <div className="flex flex-col gap-6 items-center h-full">
        {/* LOGO */}
        <div
          className={`flex items-center mt-6 gap-2 ${isCollapsed ? "justify-center" : "w-full px-4"
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
        <div className="w-full px-2">
          {activeSections.map((section) => (
            <div key={section.id} className="mb-6">
              {section.title && isExpanded && (
                <h3 className="px-3 mb-3 text-[13px] font-medium text-[#0A0A0AB2]">
                  {section.title}
                </h3>
              )}

              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => onNavigate?.()}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${pathname === item.href
                        ? "bg-[#EEF2FF]"
                        : "hover:bg-gray-100"
                      } ${isCollapsed ? "justify-center" : ""}`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={22}
                      height={22}
                    />

                    {isExpanded && (
                      <span
                        className={`text-[15px] font-medium ${pathname === item.href
                            ? "text-[#2563EB]"
                            : "text-[#64748B]"
                          }`}
                      >
                        {item.label}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* USER SECTION */}
      <div className="w-full  py-4">
        <div
          className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : "px-4"
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
