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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div
      className={`relative flex h-dvh min-h-0 flex-col overflow-hidden md:grid md:h-screen md:grid-rows-[auto_1fr] ${
        !isCollapsed ? "md:grid-cols-[280px_1fr]" : "md:grid-cols-[80px_1fr]"
      }`}
    >
      {mobileNavOpen ? (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-black/40 md:hidden pointer-events-auto"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[min(280px,88vw)] max-w-[280px] transition-transform duration-200 ease-out md:static md:z-0 md:row-span-2 md:col-start-1 md:w-full md:max-w-none md:translate-x-0 md:shadow-none ${
          mobileNavOpen ? "translate-x-0 shadow-xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          onNavigate={() => setMobileNavOpen(false)}
        />
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col md:col-start-2 md:row-span-2 md:min-w-0">
        <Navbar onMenuClick={() => setMobileNavOpen(true)} />

        <div className="min-h-0 min-w-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
