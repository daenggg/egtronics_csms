"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const router = useRouter();
  const { signOut } = useAuth();

  function toggleSidebar() {
    if (typeof document !== "undefined") {
      document.dispatchEvent(new CustomEvent("toggle-sidebar"));
    }
  }

  async function onLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 w-full border-b px-4 sm:px-6 py-3 flex items-center justify-between"
      style={{ backgroundColor: "white", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-3">
        <button aria-label="Toggle sidebar" onClick={toggleSidebar} className="p-2 rounded-md">
          <span className="block h-[3px] w-6 mb-1" style={{ background: "var(--foreground)" }} />
          <span className="block h-[3px] w-6 mb-1" style={{ background: "var(--foreground)" }} />
          <span className="block h-[3px] w-6" style={{ background: "var(--foreground)" }} />
        </button>
        <div className="relative" style={{ width: 160, height: 36 }}>
          <Image src="/egtronics_logo.png" alt="Logo" fill className="object-contain dark:invert" />
        </div>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <LogOut className="size-4" />
        <span>로그아웃</span>
      </button>
    </header>
  );
}

export default Header;
