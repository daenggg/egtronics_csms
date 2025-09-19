"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Sidebar } from "@/components/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Table } from "@/components/table";

const stationsData = [
  { business: "이지트로닉스", siteId: "egtn05", siteName: "이지트로닉스동탄본사", address: "경기도 화성시 금곡동 도로명...", status: "사용" },
  { business: "이지트로닉스", siteId: "egtn01", siteName: "이지트로닉스테스트충전소", address: "경기도 화성시 금곡로163번길 63-100 도로명...", status: "사용" },
  { business: "마루이엔지", siteId: "maru01", siteName: "부산항 HPNT 충전소", address: "부산광역시 강서구 신항남로 454(성북동) HPNT 도로명...", status: "사용" },
  // 추가 데이터 예시
  { business: "테스트사업자", siteId: "test01", siteName: "테스트 충전소 1", address: "서울시 강남구", status: "사용" },
  { business: "테스트사업자", siteId: "test02", siteName: "테스트 충전소 2", address: "서울시 서초구", status: "미사용" },
  { business: "테스트사업자", siteId: "test03", siteName: "테스트 충전소 3", address: "서울시 송파구", status: "사용" },
];

const chargersData = [
  { siteName: "이지트로닉스동탄본사", siteId: "egtn05", chargerName: "100kW 급속충전기 1호기", chargerId: "c21", model: "100kW 급속충전기", use: "사용" },
  { siteName: "이지트로닉스동탄본사", siteId: "egtn05", chargerName: "11kw 완속충전기", chargerId: "c01", model: "11kW 완속충전기", use: "사용" },
  { siteName: "이지트로닉스동탄본사", siteId: "egtn05", chargerName: "11kw 완속충전기2", chargerId: "c02", model: "11kW 완속충전기", use: "사용" },
  { siteName: "이지트로닉스동탄본사", siteId: "egtn05", chargerName: "11kw 완속충전기3", chargerId: "c03", model: "11kW 완속충전기", use: "사용" },
  { siteName: "이지트로닉스동탄본사", siteId: "egtn05", chargerName: "100kW 급속 테스트 충전기", chargerId: "c99", model: "100kW 급속충전기", use: "사용" },
  // 추가 데이터 예시
  { siteName: "테스트 충전소 1", siteId: "test01", chargerName: "급속 1", chargerId: "t01c01", model: "100kW급속", use: "사용" },
  { siteName: "테스트 충전소 1", siteId: "test01", chargerName: "완속 1", chargerId: "t01c02", model: "7kW완속", use: "사용" },
];

const sessionsData = [
  { sessionId: "3709", siteId: "egtn05", chargerId: "c04", connectorId: 1, member: "1019150227148384", startedAt: "2025-09-18 10:28", endedAt: "2025-09-18 12:54", kwh: "17.170 kWh", amount: "0 원" },
  // 추가 데이터 예시
  { sessionId: "3710", siteId: "test01", chargerId: "t01c01", connectorId: 1, member: "testuser1", startedAt: "2025-09-19 11:00", endedAt: "2025-09-19 11:30", kwh: "25.000 kWh", amount: "7,500 원" },
  { sessionId: "3711", siteId: "test01", chargerId: "t01c02", connectorId: 1, member: "testuser2", startedAt: "2025-09-19 12:00", endedAt: "2025-09-19 13:00", kwh: "7.000 kWh", amount: "2,100 원" },
];

export default function Home() {
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
    setSidebarWidth(prevWidth => {
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
    function onToggle() {
      setSidebarOpen((v) => !v);
    }
    document.addEventListener("toggle-sidebar", onToggle);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener("toggle-sidebar", onToggle);
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="min-h-screen w-full flex bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} width={sidebarWidth} onMouseDown={handleMouseDown} />
      <main
        className="flex-1 p-6 transition-all duration-300 ease-in-out space-y-8"
        style={{ marginLeft: sidebarOpen ? `${sidebarWidth}px` : "0" }}
      >
        <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          대시보드
        </h1>

        {/* 섹션: 충전소 */}
        <Card>
          <CardHeader>
            <CardTitle>충전소</CardTitle>
          </CardHeader>
          <CardContent>
            <Table
              columns={[
                { key: "business", header: "사업자 이름", className: "w-[20%]" },
                { key: "siteId", header: "충전소 ID", className: "w-[15%]" },
                { key: "siteName", header: "충전소 이름", className: "w-[25%]" },
                { key: "address", header: "주소", className: "w-[30%]" },
                { key: "status", header: "사용 유무", className: "w-[10%]" },
              ]}
              data={stationsData}
            />
          </CardContent>
        </Card>

        {/* 섹션: 충전기 */}
        <Card>
          <CardHeader>
            <CardTitle>충전기</CardTitle>
          </CardHeader>
          <CardContent>
            <Table
              columns={[
                { key: "siteName", header: "충전소 이름" },
                { key: "siteId", header: "충전소 ID" },
                { key: "chargerName", header: "충전기 이름" },
                { key: "chargerId", header: "충전기 ID" },
                { key: "model", header: "충전기 모델 이름" },
                { key: "use", header: "사용 유무" },
              ]}
              data={chargersData}
            />
          </CardContent>
        </Card>

        {/* 섹션: 충전 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>충전 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <Table
              columns={[
                { key: "sessionId", header: "충전 ID" },
                { key: "siteId", header: "충전소 ID" },
                { key: "chargerId", header: "충전기 ID" },
                { key: "connectorId", header: "커넥터 ID" },
                { key: "member", header: "회원 정보" },
                { key: "startedAt", header: "충전 시작 일시" },
                { key: "endedAt", header: "충전 종료 일시" },
                { key: "kwh", header: "충전 전력량" },
                { key: "amount", header: "충전 금액" },
              ]}
              data={sessionsData}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
