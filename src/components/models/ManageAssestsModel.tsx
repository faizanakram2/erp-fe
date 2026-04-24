import { Trash2, X } from "lucide-react";

const ManageAssestsModel = ({ onClose }: { onClose: () => void }) => {
  const assets = [
    { label: "Cash in Hand", value: "PKR 2.5M" },
    { label: "Bank - HBL Main", value: "PKR 45.0M" },
    { label: "Bank - MCB Business", value: "PKR 32.0M" },
    { label: "Bank - MCB B/uAccounts Receivable", value: "PKR 15.0M" },
  ];
  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center ">
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/20   "
        ></div>
        <div
          className="z-10 bg-[#FFFFFF]  w-[540px] h-[560px]  rounded-[20px] flex flex-col gap-4 p-6 overflow-y-auto no-scrollbar [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* heading and close icon */}
          <div className="flex justify-between">
            <h1 className="font-medium text-[14px] text-[#101828] ">
              Manage Assets
            </h1>
            <X size={16} />
          </div>

          {/* old assests */}
          <div className="flex flex-col gap-2">
            {assets.map((item, i) => (
              <div
                key={item.label}
                className={` flex items-center justify-between w-full h-[56px]   rounded-[12px] border border-[#D2D2D2] bg-[#FFFFFF] px-3 `}
              >
                <h1 className="text-[16px] font-normal text-[#000000]">
                  {item.label}
                </h1>
                <div className="flex items-center gap-3">
                  <h1 className="text-[16px] font-normal text-[#80CCB3]">
                    {item.value}
                  </h1>
                  <Trash2 className="size-[16px] text-[#D52145]" />
                </div>
              </div>
            ))}
          </div>
          {/* new assets */}
          <div className="flex flex-col gap-2 ">
            <h1 className="text-[16px] font-semibold text-[#000000]">
              Add New Asset
            </h1>
            <div className="flex flex-col  gap-3">
              <label
                htmlFor="asset-name"
                className="text-[16px] font-normal text-[#000000]"
              >
                Asset Name*
              </label>
              <input
                type="text"
                id="asset-name"
                placeholder="e.g New Bank Account"
                className="border border-[#E3E3E3] h-[56px]  bg-[#FFFFFF] rounded-[8px] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-500 px-3"
              />
              <label
                htmlFor="asset-name"
                className="text-[16px] font-normal text-[#000000]"
              >
                Inintial Balance *
              </label>
              <input
                type="number"
                placeholder="e.g 0.00"
                className="border border-[#E3E3E3] h-[56px]  bg-[#FFFFFF] rounded-[8px] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-500 px-3"
              />
              <button className="bg-[#0070FF] text-[#FFFFFF] py-2 px-4 rounded-[8px]">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAssestsModel;
