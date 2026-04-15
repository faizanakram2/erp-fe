"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

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

const data = [
  { name: "Jan", current: 19000, previous: 10000 },
  { name: "Feb", current: 15000, previous: 7000 },
  { name: "Mar", current: 20000, previous: 12000 },
  { name: "Apr", current: 25000, previous: 15000 },
  { name: "May", current: 22000, previous: 13000 },
  { name: "Jun", current: 27000, previous: 16000 },
  { name: "Jul", current: 30000, previous: 18000 },
];

const pieData = [
  { name: "Steel", value: 22.8, color: "#57cea7" },
  { name: "Sand", value: 22.8, color: "#f59e0b" },
  { name: "Cement", value: 22.8, color: "#F14B4B" },
  { name: "Bricks", value: 13.9, color: "#B28CFF" },
  { name: "Tiles", value: 13.9, color: "#007BFF" },
  { name: "Others", value: 13.9, color: "#BCC2CD" },
];

const salesData = [
  { name: "Jan", revenue: 21000 },
  { name: "Feb", revenue: 23000 },
  { name: "Mar", revenue: 15000 },
  { name: "Apr", revenue: 16000 },
  { name: "May", revenue: 13000 },
  { name: "Jun", revenue: 28000 },
  { name: "Jul", revenue: 2000 }, // The big dip
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {/* Purchase & Sell Chart */}
        <div className="col-span-2 flex flex-col gap-4 bg-[#F9F9FA]  rounded-[21px]    h-[333px] ">
          {/* heading */}
          <div className="flex justify-between p-6">
            <h3 className="text-[15px] font-normal ">Purchase & Sell</h3>
            {/* year */}
            <div className="flex gap-4">
              {/* this year */}
              <div>
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  <h3 className="text-[12px] font-normal ">This year</h3>
                </div>
              </div>
              {/* last year */}
              <div>
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0044FF]"></div>
                  <h3 className="text-[12px] font-normal ">Last year</h3>
                </div>
              </div>
            </div>
          </div>
          {/* chart area */}
          <div className="h-[240px]     ">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: 50, bottom: 40 }}
              >
                <CartesianGrid
                  fill="white"
                  fillOpacity={1}
                  vertical={false}
                  stroke="none"
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  dy={6}
                  padding={{ left: 30, right: 20 }}
                  label={{
                    value: "Months",
                    position: "insideBottom",
                    offset: -18,
                    style: {
                      fontSize: "12px",
                      fontWeight: "normal",
                      fill: "#000000",
                      textAnchor: "middle",
                    },
                  }}
                ></XAxis>
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  ticks={[0, 10000, 20000, 30000]}
                  domain={[0, 40000]}
                  dx={-6}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}k`
                  }
                  label={{
                    value: "Amount",
                    angle: -90,
                    position: "insideLeft",
                    offset: -12,
                    style: {
                      textAnchor: "middle",
                      fontSize: "12px",
                      fill: "#000000",
                      fontWeight: "normal",
                    },
                  }}
                ></YAxis>
                <Area
                  type="monotone"
                  dataKey="previous"
                  stroke="#0DA4EB"
                  fill="#0DA4EB"
                  fillOpacity={0}
                ></Area>
                <Area
                  type="monotone"
                  dataKey="current"
                  stroke="#F9812A"
                  fill="#F9812A"
                  fillOpacity={0}
                ></Area>
              </AreaChart>
            </ResponsiveContainer>
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
      <div className="flex  gap-4 mt-6">
        {/* Pie Chart */}
        <div className="bg-[#F9F9FA] rounded-xl flex flex-col items-center py-4 w-[350px]">
          <h3 className="text-[14px] font-semibold text-black ">
            Current Stock by Category
          </h3>
          {/* pichart */}
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={40}
                  cornerRadius={4}
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none" // Use this to remove the thin default border
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-6 w-[288px]">
            {pieData.map((data, index) => (
              <div className=" flex justify-between">
                {/* Left side: Dot and Name */}
                <div className="flex items-center gap-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full "
                    style={{ backgroundColor: data.color }}
                  ></div>
                  <h1 className="font-normal text-[12px] text-black">
                    {data.name}
                  </h1>
                </div>
                {/* Right side: Percentage */}
                <h1 className="font-normal text-[12px] text-black">
                  {data.value}%
                </h1>
              </div>
            ))}
          </div>
        </div>

        {/* Sales */}
        <div className="bg-[#F9F9FA] rounded-[21px] flex-1 flex flex-col items-center justify-center gap-8">
          <h3 className="text-[15px] text-black font-semibold w-[90%] ">
            Sales
          </h3>
          <div className="h-[75%] w-[90%]   ">
            <ResponsiveContainer height="100%" width="100%">
              <AreaChart data={salesData}>
                <CartesianGrid
                  fill="white"
                  fillOpacity={1}
                  stroke="none"
                ></CartesianGrid>
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  dy={6}
                  label={{
                    value: "Months",
                    position: "insideBottom",
                    offset: -6,
                    style: {
                      fontSize: "12px",
                      fill: "#000000",
                    },
                  }}
                >
                  {" "}
                </XAxis>
                <YAxis
                  dataKey="revenue"
                  tickLine={false}
                  axisLine={false}
                  dx={-8}
                  ticks={[0, 10000, 20000, 30000]}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}K`
                  }
                  label={{
                    value: "Revenue",
                    angle: -90,
                    position: "insideLeft",

                    style: {
                      textAnchor: "middle",
                      fontSize: "12px",
                      fill: "#000000",
                      fontWeight: "normal",
                    },
                  }}
                ></YAxis>
                <Area
                  dataKey="revenue"
                  stroke="#0044FF2B"
                  fill="#0044FF2B"
                  dot={{ r: 4, fill: "#69541399" }}
                ></Area>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
