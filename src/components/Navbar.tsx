import Image from "next/image";
export const Navbar = () => {
  return (
    <div className="h-[79px]  bg-[#FFFFFF] flex items-center justify-between px-6">
      {/* logo and heading */}

      <div className=" flex gap-2 items-center ">
        <Image
          src="/icons/tabler_menu.svg"
          alt="menu icon"
          width={36}
          height={36}
          className="object-cover"
        />

        <h1 className="font-semibold text-[20px] text-[#081021] ">
          Dashboards
        </h1>
      </div>
      {/* theme + notification */}
      <div className="flex gap-4">
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
