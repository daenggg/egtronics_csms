"use client";

import * as React from "react";

type UiContextValue = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

const UiContext = React.createContext<UiContextValue | undefined>(undefined);

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(true);

  const toggleSidebar = React.useCallback(() => setSidebarOpen((v) => !v), []);
  const closeSidebar = React.useCallback(() => setSidebarOpen(false), []);

  const value = React.useMemo(() => ({ sidebarOpen, toggleSidebar, closeSidebar }), [sidebarOpen, toggleSidebar, closeSidebar]);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const ctx = React.useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used within UiProvider");
  return ctx;
}


