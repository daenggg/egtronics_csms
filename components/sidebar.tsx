"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MenuItem = {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
};

const MENU_ITEMS: Array<MenuItem> = [
  { label: "대시보드", href: "/" },
  { label: "설치위치 MAP", href: "/map" },
  { label: "권한관리", href: "/permissions" },
  { label: "시스템 코드 관리", href: "/system/codes" },
  { label: "시스템 변수 설정", href: "/system/variables" },
  { label: "CPO ID 관리", href: "/cpo" },
  { label: "제조 공장 관리", href: "/factories" },
  { label: "충전기 모델 관리", href: "/chargers/models" },
  { label: "충전 요금 등록", href: "/billing/rates/new" },
  { label: "충전 요금 설정", href: "/billing/rates" },
  { label: "충전소 관리", href: "/sites" },
  {
    label: "충전기 관리",
    children: [
      { label: "충전기 정보", href: "/chargers/info" },
      { label: "충전기 설정", href: "/chargers/settings" },
      { label: "펌웨어 관리", href: "/chargers/firmware" },
      { label: "충전기 로컬인증", href: "/chargers/local-auth" },
      { label: "충전기 프로파일 설정", href: "/chargers/profile" },
      { label: "충전기 고객문의", href: "/chargers/support" },
      { label: "충전기 AS관리", href: "/chargers/as" },
    ],
  },
  { label: "충전 내역 관리", href: "/sessions" },
  { label: "충전량 그래프", href: "/analytics/energy" },
  { label: "결제 내역 관리", href: "/payments" },
  { label: "회원관리", href: "/users" },
];

export type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [open, setOpen] = React.useState(true);
  const [chargerOpen, setChargerOpen] = React.useState(false);

  React.useEffect(() => {
    function onToggle() {
      setOpen((v) => !v);
    }
    document.addEventListener("toggle-sidebar", onToggle);
    return () => document.removeEventListener("toggle-sidebar", onToggle);
  }, []);

  return (
    <>
      <aside
        className={cn(
          // 👇 [변경] 사이드바 너비를 280px에서 240px로 수정
          "h-screen w-[200px] shrink-0 overflow-y-auto border-r px-6 py-6 transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          className
        )}
        style={{ backgroundColor: "#BCCCDC", borderColor: "var(--border)" }}
      >
        <nav className="mt-16 flex flex-col gap-6">
          {MENU_ITEMS.map((item) => {
            if (item.children) {
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    className="w-full text-left text-base font-semibold flex items-center justify-between"
                    style={{ color: "var(--foreground)" }}
                    onClick={() => setChargerOpen((v) => !v)}
                  >
                    <span>{item.label}</span>
                    {/* 👇 [변경] 아이콘 크기를 키우기 위해 text-lg 클래스 추가 */}
                    <span aria-hidden className="ml-2 text-lg">{chargerOpen ? "▾" : "▸"}</span>
                  </button>
                  {chargerOpen ? (
                    <div className="mt-2 ml-3 flex flex-col gap-3">
                      {item.children.map((sub) => (
                        <Link key={sub.href} href={sub.href} className="text-sm" style={{ color: "var(--foreground)" }}>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }
            return item.href ? (
              <Link key={item.label} href={item.href} className="text-left text-base font-semibold" style={{ color: "var(--foreground)" }}>
                {item.label}
              </Link>
            ) : (
              <span key={item.label} className="text-left text-base font-semibold" style={{ color: "var(--foreground)" }}>
                {item.label}
              </span>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
