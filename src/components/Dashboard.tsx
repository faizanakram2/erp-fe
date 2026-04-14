const StatCard = [
  {
    id: "1",
    title: "Active Projects",
    value: "12",
    change: "+11.01%",
    bgColor: "#EDEEFC",
  },
  {
    id: "2",
    title: "Total Revenue",
    value: "2.5M",
    change: "-0.03%",
    bgColor: "#E6F1FD",
  },
  {
    id: "3",
    title: "Team Member",
    value: "48",
    change: "+5 new hires",
    bgColor: "#EDEEFC",
  },
  {
    id: "4",
    title: "Construction %",
    value: "64%",
    change: "+6.08% ",
    bgColor: "#E6F1FD",
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 min-h-screen">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4  p-4 rounded-xl">
        {StatCard.map((card) => (
          <div
            className="  w-[202px]  h-[115px] rounded-[20px] px-6 py-6"
            key={card.id}
            style={{ backgroundColor: card.bgColor }}
          >
            <p className="text-[#000000] text-[14px] font-normal">
              {card.title}
            </p>
            <div className="flex justify-between items-center mt-2">
              <h2 className="text-xl font-bold">{card.value}</h2>
              <span className="text-sm text-gray-400">{card.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Purchase & Sell Chart */}
        <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Purchase & Sell</h3>
          <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            Chart Area
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-[#F9F9FA] rounded-xl w-[330px] h-[333px] flex flex-col gap-4 items-center justify-center">
          <h3 className=" w-[250px] text-[14px] font-semibold text-[#000000]">
            Top Customers
          </h3>
          <div className="bg-[#FFFFFF] w-[295px] h-[260px] rounded-[21px] flex flex-col justify-around px-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                {/* name and plot */}
                <div>
                  <p className="font-medium text-[12px] text-[#232323]">
                    Ahmed Khan
                  </p>
                  <p className="text-[#718EBF] font-normal text-[11px]">
                    Paid: 01-Jan-25
                  </p>
                </div>
                {/* price and due date */}
                <div>
                  <p className="font-medium text-[12px] text-[#232323]">
                    $50,000
                  </p>
                  <p className="text-[#718EBF] font-normal text-[11px]">
                    Due: 2026-01-25
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">
            Current Stock by Category
          </h3>
          <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            Pie Chart
          </div>
        </div>

        {/* Sales */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Sales</h3>
          <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            Sales Chart
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
