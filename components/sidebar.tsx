"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Map,
  Users,
  Settings,
  Building,
  Factory,
  PlugZap,
  FileText,
  CreditCard,
  BarChart3,
  ShieldAlert,
  UserCog,
  Shield,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

type MenuItem = {
  label: string;
  href?: string;
  icon: React.ElementType;
  children?: Array<{ label: string; href: string }>;
};

const MENU_ITEMS: Array<MenuItem> = [
  { label: "대시보드", href: "/", icon: LayoutDashboard },
  { label: "설치위치 MAP", href: "/map", icon: Map },
  { label: "권한관리", href: "/permissions", icon: Shield },
  { label: "시스템 코드관리", href: "/system/codes", icon: Settings },
  { label: "시스템변수설정", href: "/system/variables", icon: Settings },
  { label: "충전기 에러 코드관리", href: "/chargers/errors", icon: ShieldAlert },
  {
    label: "개인정보",
    icon: UserCog,
    children: [
      { label: "개인정보변경", href: "/profile/edit" },
      { label: "비밀번호변경", href: "/profile/password" },
    ],
  },
  { label: "CPO 관리", href: "/cpo-management", icon: Building },
  { label: "CPO ID 관리", href: "/cpo", icon: Building },
  { label: "충전기 제조 공장 관리", href: "/factories", icon: Factory },
  { label: "충전기 모델 관리", href: "/chargers/models", icon: PlugZap },
  { label: "충전기 단가 등록", href: "/billing/rates/new", icon: DollarSign },
  { label: "충전기 단가 설정", href: "/billing/rates", icon: DollarSign },
  { label: "충전소 관리", href: "/sites", icon: PlugZap },
  {
    label: "충전기 관리",
    icon: PlugZap,
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
  { label: "충전 내역 관리", href: "/sessions", icon: FileText },
  { label: "충전량 그래프", href: "/analytics/energy", icon: BarChart3 },
  { label: "결제 내역 관리", href: "/payments", icon: CreditCard },
  { label: "회원 관리", href: "/users", icon: Users },
  { label: "회원카드 관리", href: "/cards", icon: CreditCard },
];

export type SidebarProps = {
  className?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  width: number;
  onMouseDown: (e: React.MouseEvent) => void;
};

export function Sidebar({ className, open, setOpen, width, onMouseDown }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };
  return (
    <>
      <aside
        className={cn(
          "fixed top-0 left-0 z-30 h-screen shrink-0 overflow-y-auto border-r p-4 flex flex-col",
          // 너비 변경 시 transition을 제거하여 부드러운 리사이징을 보장합니다.
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          className
        )}
        style={{ width: `${width}px`, backgroundColor: "white", borderColor: "var(--border)" }}
      >
        <nav className="mt-16 flex flex-col gap-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            if (item.children) {
              const isMenuOpen = openMenus[item.label] ?? false;
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => toggleMenu(item.label)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </div>
                    {isMenuOpen ? (
                      <ChevronDown className="size-4" />
                    ) : (
                      <ChevronRight className="size-4" />
                    )}
                  </button>
                  {isMenuOpen ? (
                    <div className="mt-1 ml-4 flex flex-col gap-1 border-l pl-3">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={cn(
                            "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                            pathname === sub.href && "bg-primary/10 text-primary"
                          )}
                        >
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }
            return item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href && "bg-primary/10 text-primary"
                )}
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            ) : (
              <span key={item.label} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground">
                <Icon className="size-4" />
                <span>{item.label}</span>
              </span>
            );
          })}
        </nav>
      </aside>
      <div
        onMouseDown={onMouseDown}
        className="fixed top-0 z-30 h-screen w-1.5 cursor-col-resize"
        style={{ left: open ? `${width}px` : '0px', display: open ? 'block' : 'none' }}
      />
    </>
  );
}

export default Sidebar;
