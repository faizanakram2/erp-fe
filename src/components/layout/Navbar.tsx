import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavbarProps = {
  onMenuClick?: () => void;
};

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [pageName, setPageName] = useState<string>("");
  const pathName = usePathname();
  useEffect(() => {
    if (pathName === "/") {
      setPageName("Dashboards");
    } else if (pathName === "/land-planning") {
      setPageName("Land Planning");
    } else if (pathName === "/construction") {
      setPageName("Construction");
    } else if (pathName === "/sales-crm") {
      setPageName("Sales & CRM");
    } else if (pathName === "/finance") {
      setPageName("Finance");
    } else if (pathName === "/human-resources") {
      setPageName("Human Resources");
    } else if (pathName === "/inventory") {
      setPageName("Inventory");
    } else if (pathName === "/reports") {
      setPageName("Reports");
    } else if (pathName === "/settings") {
      setPageName("Settings");
    }
  }, [pathName]);

  return (
    <div className="h-[56px] min-h-[56px] sm:h-[79px] sm:min-h-[79px] bg-[#FFFFFF] flex items-center justify-between px-3 sm:px-6 shadow-sm shrink-0">
      {/* logo and heading */}

      <div className="flex gap-2 items-center min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden shrink-0 rounded-lg p-1 -ml-1 text-[#081021] hover:bg-slate-100 active:bg-slate-200"
          aria-label="Open navigation menu"
        >
          <Image
            src="/icons/tabler_menu.svg"
            alt=""
            width={32}
            height={32}
            className="object-cover"
          />
        </button>

        <h1 className="font-semibold text-[16px] sm:text-[20px] text-[#081021] truncate">
          {pageName}
        </h1>
      </div>
      {/* theme + notification */}
      <div className="flex gap-2 sm:gap-4 shrink-0">
        <Image
          src="/icons/theme.svg"
          alt="theme icon"
          width={20}
          height={20}
          className="object-cover"
        />
        <Image
          src="/icons/notification.svg"
          alt="notification icon"
          width={20}
          height={20}
          className="object-cover"
        />
      </div>
    </div>
  );
};
