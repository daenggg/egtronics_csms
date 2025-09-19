"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const isResizing = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    setSidebarWidth(() => {
      const newWidth = e.clientX;
      const minWidth = 200;
      const maxWidth = 400;
      if (newWidth < minWidth) return minWidth;
      if (newWidth > maxWidth) return maxWidth;
      return newWidth;
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, []);

  useEffect(() => {
    if (isLoginPage) return;
    function onToggle() {
      setSidebarOpen((v) => !v);
    }
    document.addEventListener("toggle-sidebar", onToggle);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener("toggle-sidebar", onToggle);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isLoginPage, handleMouseMove, handleMouseUp]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {!isLoginPage && <Header />}
          {!isLoginPage && <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} width={sidebarWidth} onMouseDown={handleMouseDown} />}
          <main style={{ paddingTop: !isLoginPage ? 56 : 0, marginLeft: !isLoginPage && sidebarOpen ? `${sidebarWidth}px` : 0 }} className="transition-all duration-300 ease-in-out">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
