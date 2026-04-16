import Image from "next/image";
export default function Construction() {
  return (
    // top heading
    <div className="bg-white h-[91px] w-full flex  items-center justify-between px-8">
      {/* heading and description */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-[18px] text-[#101828]  ">
            Construction & Inventory
          </h1>
          <button className="w-[42px] h-[42px] rounded-[16px] flex items-center justify-center bg-[#F7FAFF]">
            <h1 className="font-semibold text-[12px] text-[#0070FF]">New</h1>
          </button>
        </div>
        <p className="text-[12px] font-normal text-[#667085]">
          Track construction progress, materials, and site management
        </p>
      </div>
      {/* refresh and add project updates button */}
      <div className="flex gap-2 items-center">
        {/* refresh button */}
        <button className="w-[142px] h-[40px] rounded-[8px] flex  gap-2 items-center justify-center bg-white border border-[#0070FF]">
          <Image
            src="./icons/refresh_icon.svg"
            alt="refresh icon"
            width={20}
            height={20}
          />
          <h1 className="font-normal text-[10px] text-[#0070FF]">
            {" "}
            Update Project
          </h1>
        </button>
        {/* add project updates button */}
        <button className="w-[142px] h-[40px] rounded-[8px] flex  gap-2 items-center justify-center bg-[#0070FF]">
          <Image
            src="./icons/add_icon.svg"
            alt="add icon"
            width={20}
            height={20}
          />
          <h1 className="font-normal text-[10px] text-white">
            {" "}
            Add Project Updates
          </h1>
        </button>
      </div>
    </div>
  );
}
