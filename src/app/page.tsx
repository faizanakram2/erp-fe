"use client";
import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import { useState } from "react";
export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div
      className={`grid  ${!isCollapsed ? "grid-cols-[280px_1fr]" : "grid-cols-[80px_1fr]"}  h-screen grid-rows-[auto_1fr]`}
    >
      <div className="  row-span-2">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
      <div className="  ">
        <Navbar />
      </div>

      <div className=" ">
        <Dashboard />
      </div>
    </div>
  );
}
