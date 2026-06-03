import Image from "next/image";

const RecentSalesTab = () => {
  const recentSales = [
    {
      id: 1,
      name: "Ahmad Khan",
      product: "Product A",
      by: "John Doe",

      amount: "$100",
      date: "2024-06-01",
    },
    {
      id: 2,
      name: "John Doe",
      product: "Product B",
      by: "Jane Smith",

      amount: "$200",
      date: "2024-06-02",
    },
    {
      id: 3,
      name: "John Doe",
      product: "Product B",
      by: "Jane Smith",

      amount: "$200",
      date: "2024-06-02",
    },
    {
      id: 4,
      name: "John Doe",
      product: "Product B",
      by: "Jane Smith",

      amount: "$200",
      date: "2024-06-02",
    },
    {
      id: 5,
      name: "John Doe",
      product: "Product B",
      by: "Jane Smith",

      amount: "$200",
      date: "2024-06-02",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-medium text-[18px] text-[#101828]">
        Recent Sales Activity
      </h1>
      <div className="flex flex-col gap-2">
        {" "}
        {recentSales.map((sale) => (
          <div className="flex justify-between items-center border border-[#B2B2B2] rounded-[8px] p-4">
            <div className="flex gap-3 items-center">
              {/* dollar icon */}
              <div className="bg-[#CEDBED] w-[50px]  h-[50px] rounded-[8px] flex items-center justify-center">
                <Image
                  src="../icons/dollar_icon.svg"
                  alt="dollar icon"
                  width={31}
                  height={31}
                />
              </div>
              {/* details */}
              <div>
                <h1 className="text-[18px] text-[#101828] font-medium">
                  {sale.name}
                </h1>
                <h1 className="text-[12px] text-[#667085] font-medium">
                  {sale.product}
                </h1>
                <h1 className="text-[12px] text-[#667085] font-medium">
                  {sale.by}
                </h1>
              </div>
            </div>

            {/* date and amount */}
            <div>
              <h1 className="text-[12px] text-[#0070FF] font-medium">
                PKR {sale.amount}
              </h1>
              <h1 className="text-[12px] text-[#667085] font-medium">
                {sale.date}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSalesTab;
