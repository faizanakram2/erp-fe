"use client";
import { Navbar } from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`grid ${
        !isCollapsed ? "grid-cols-[280px_1fr]" : "grid-cols-[80px_1fr]"
      } h-screen grid-rows-[auto_1fr]`}
    >
      <div className="row-span-2">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      <div>
        <Navbar />
      </div>

      {/* ✅ Dynamic content */}
      <div>{children}</div>
    </div>
  );
}
