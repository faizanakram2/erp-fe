"use client";

import { createContext, useContext, useState } from "react";

type UIType = "users" | "manager" | "sales-agents" | "accountants";

interface UIContextType {
  activeUI: UIType;
  setActiveUI: (ui: UIType) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [activeUI, setActiveUI] = useState<UIType>("manager");

  return (
    <UIContext.Provider value={{ activeUI, setActiveUI }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used inside UIProvider");
  }
  return context;
}
