import Image from "next/image";
import { useState } from "react";
import MaterialMobdel from "../models/AddNewMaterialModel";

type Material = {
  name: string;
  currentStock: number;
  unit: string;
  reorderLevel: number;
};

const MaterailInvetory = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const data: Material[] = [
    {
      name: "Cement (50kg bags)",
      currentStock: 2500,
      unit: "bags",
      reorderLevel: 500,
    },
    {
      name: "Steel Bars (Grade 60)",
      currentStock: 40,
      unit: "tons",
      reorderLevel: 50,
    },
    {
      name: "Sand (Fine Aggregate)",
      currentStock: 120,
      unit: "tons",
      reorderLevel: 100,
    },
    {
      name: "Gravel (Coarse Aggregate)",
      currentStock: 80,
      unit: "tons",
      reorderLevel: 100,
    },
    {
      name: "Bricks",
      currentStock: 0,
      unit: "pieces",
      reorderLevel: 5000,
    },
  ];

  const getStatus = (stock: number, reorder: number): string => {
    if (stock === 0) return "Out of Stock";
    if (stock <= reorder) return "Low Stock";
    return "In Stock";
  };

  const getStatusStyle = (status: string): string => {
    if (status === "In Stock") return "bg-[#029A6780] text-white";
    if (status === "Low Stock") return "bg-[#D3D3D3] text-[#000000]";
    return "bg-[#E8A8B6] text-[#D4183D]";
  };

  return (
    <div className="bg-[#F9FAFB] rounded-[6px] w-full h-full p-6">
      {/* model */}
      {isModalOpen && <MaterialMobdel onClose={() => setIsModalOpen(false)} />}
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#101828] text-[18px] font-semibold">
          Material Inventory
        </h1>

        <div
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0070FF] text-white px-4 h-[40px] rounded-[8px] flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Image
            src="/icons/add_icon.svg"
            alt="Add Icon"
            width={16}
            height={16}
          />
          <span className="text-[12px]">Add Material</span>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left border-1 border-[#EAECF0] bg-[#FCFCFD]">
              <th className="p-3 text-[12px] font-medium text-[#667085]">
                Material
              </th>
              <th className="p-3 text-[12px] font-medium text-[#667085]">
                Stock
              </th>
              <th className="p-3 text-[12px] font-medium text-[#667085]">
                Unit
              </th>
              <th className="p-3 text-[12px] font-medium text-[#667085]">
                Reorder
              </th>
              <th className="p-3 text-[12px] font-medium text-[#667085]">
                Status
              </th>
              <th className="p-3 text-[12px] font-medium text-[#667085]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => {
              const status = getStatus(item.currentStock, item.reorderLevel);

              return (
                <tr
                  key={index}
                  className="bg-white shadow-sm hover:shadow-md transition rounded-[8px]"
                >
                  <td className="p-3 text-[14px] text-[#101828] font-medium">
                    {item.name}
                  </td>

                  <td className="p-3 text-[14px] text-[#667085] font-medium">
                    {item.currentStock}
                  </td>

                  <td className="p-3 text-[14px] text-[#667085] font-medium">
                    {item.unit}
                  </td>

                  <td className="p-3 text-[14px] text-[#667085]">
                    {item.reorderLevel}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-medium ${getStatusStyle(
                        status,
                      )}`}
                    >
                      {status}
                    </span>
                  </td>

                  <td className="p-3">
                    <button className="bg-[#0070FF] text-white px-3 py-1 rounded-md text-[12px] hover:bg-blue-600 transition">
                      Reorder
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterailInvetory;
