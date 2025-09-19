"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
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
      style={{ backgroundColor: "var(--panel)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-3">
        <button aria-label="Toggle sidebar" onClick={toggleSidebar} className="p-2 rounded-md">
          <span className="block h-[3px] w-6 mb-1" style={{ background: "var(--foreground)" }} />
          <span className="block h-[3px] w-6 mb-1" style={{ background: "var(--foreground)" }} />
          <span className="block h-[3px] w-6" style={{ background: "var(--foreground)" }} />
        </button>
        <div className="relative" style={{ width: 140, height: 32 }}>
          <Image src="/egtronics_logo.png" alt="Logo" fill className="object-contain dark:invert" />
        </div>
      </div>
      <Button variant="brand2" onClick={onLogout}>로그아웃</Button>
    </header>
  );
}

export default Header;


