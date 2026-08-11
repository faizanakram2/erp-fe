"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface ToolbarAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
}

interface AppToolbarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  actions?: ToolbarAction[];

  className?: string;

  // Optional: allows pages to choose which action is active initially
  defaultActiveAction?: string;
}

export default function AppToolbar({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  actions = [],
  className = "",
  defaultActiveAction,
}: AppToolbarProps) {
  const [activeActionId, setActiveActionId] = useState<string | null>(
    defaultActiveAction ?? actions[0]?.id ?? null
  );

  return (
    <div
      className={`flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between ${className}`}
    >
      {/* Search */}
      {searchPlaceholder && (
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            value={searchValue ?? ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F8F8F8] pl-11 pr-4 text-sm outline-none transition focus:border-black"
          />
        </div>
      )}

      {/* Actions */}
      {actions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {actions.map((action) => {
            const isActive = activeActionId === action.id;

            return (
              <button
                key={action.id}
                type="button"
                onClick={() => {
                  setActiveActionId(action.id);
                  action.onClick?.();
                }}
                className={`flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition ${
                  isActive
                    ? "border-black bg-black text-white"
                    : "border-[#E4E4E7] bg-white text-black hover:bg-slate-50"
                }`}
              >
                {action.icon}
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}