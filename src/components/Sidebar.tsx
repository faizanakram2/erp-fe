import Image from "next/image";

const Sidebar = () => {
  const menuItems = [
    {
      id: "1",
      name: "Land & Planning",
      icon: "/icons/landAndPlanning.svg",
    },
    {
      id: "2",
      name: "Construction",
      icon: "/icons/construction.svg",
    },
    {
      id: "3",
      name: "Sales & CRM",
      icon: "/icons/salesAndCrm.svg",
    },
    {
      id: "4",
      name: "Human Resources",
      icon: "/icons/HumanResources.svg",
    },
    {
      id: "5",
      name: "Finance & Accounting",
      icon: "/icons/Finance.svg",
    },
    {
      id: "6",
      name: "Inventory",
      icon: "/icons/inventory.svg",
    },
    {
      id: "7",
      name: "Reports",
      icon: "/icons/reports.svg",
    },
    {
      id: "8",
      name: "Settings",
      icon: "/icons/settings.svg",
    },
  ];
  return (
    <div className="w-[280px] bg-[#FFFFFF] h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-6  w-64 items-center bg-white h-full">
        {/* logo  */}
        <div className="w-[152px] flex gap-2 items-center mt-6">
          <Image
            src="/icons/Logo.svg"
            alt="real estate logo"
            width={32}
            height={32}
            className="object-cover"
          />
          <div className="flex flex-col gap-0">
            <h1 className="font-semibold text-[20px] text-[#081021] ">
              Real Estate{" "}
            </h1>
            <h1 className="font-light text-[11px] text-[#000000] ">
              Management
            </h1>
          </div>
        </div>
        {/* page heading */}
        <div className="w-[232px] h-11 flex  gap-3 items-center pl-4 rounded-[99px] bg-[#EEF2FF] ">
          <Image
            src="/icons/dashboard.svg"
            alt="dashboard"
            width={20}
            height={20}
            className="object-cover"
          />
          <h1 className="font-medium text-[14px] text-[#0070FF] ">Dashboard</h1>
        </div>
        {/* menu items */}
        <div className="w-[232px]  flex items-center  pl-4">
          <div className="flex flex-col gap-2.5  ">
            {menuItems.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={20}
                  height={20}
                  className="object-contain"
                ></Image>
                <h1 className="font-medium text-[14px] text-[#64748B]">
                  {item.name}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* user */}
      <div className="w-full h-[90px] border-1 border-[#E2E8F0] flex items-center justify-center ">
        <div className="w-[200px] flex items-center gap-3">
          <Image
            src="user.svg"
            alt="real estate logo"
            width={40}
            height={40}
            className="object-cover rounded-[99px]"
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-medium text-[12px] text-[#64748B] ">
              Welcome back 👋
            </h1>
            <h1 className="font-medium text-[14px] text-[#081021] ">
              Johnathan
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
