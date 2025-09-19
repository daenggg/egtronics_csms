import { Sidebar } from "@/components/sidebar";
import { Table } from "@/components/table";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex" style={{ backgroundColor: "var(--page)" }}>
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          대시보드
        </h1>

        {/* 섹션: 충전소 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>충전소</h2>
          <Table
            columns={[
              { key: "business", header: "사업자 이름", className: "w-[20%]" },
              { key: "siteId", header: "충전소 ID", className: "w-[15%]" },
              { key: "siteName", header: "충전소 이름", className: "w-[25%]" },
              { key: "address", header: "주소", className: "w-[30%]" },
              { key: "status", header: "사용 유무", className: "w-[10%]" },
            ]}
            data={[
              { business: "이지트로닉스", siteId: "egtn05", siteName: "이지트로닉스동탄본사", address: "경기도 화성시 금곡동 도로명...", status: "사용" },
              { business: "이지트로닉스", siteId: "egtn01", siteName: "이지트로닉스테스트충전소", address: "경기도 화성시 금곡로163번길 63-100 도로명...", status: "사용" },
              { business: "마루이엔지", siteId: "maru01", siteName: "부산항 HPNT 충전소", address: "부산광역시 강서구 신항남로 454(성북동) HPNT 도로명...", status: "사용" },
            ]}
          />
        </section>

        {/* 섹션: 충전기 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>충전기</h2>
          <Table
            columns={[
              { key: "siteName", header: "충전소 이름" },
              { key: "siteId", header: "충전소 ID" },
              { key: "chargerName", header: "충전기 이름" },
              { key: "chargerId", header: "충전기 ID" },
              { key: "model", header: "충전기 모델 이름" },
              { key: "use", header: "사용 유무" },
            ]}
            data={[
              { siteName: "이지트로닉스동탄본사", siteId: "egtn05", chargerName: "100kW 급속충전기 1호기", chargerId: "c21", model: "100kW 급속충전기", use: "사용" },
              { siteName: "이지트로닉스동탄본사", siteId: "egtn05", chargerName: "11kw 완속충전기", chargerId: "c01", model: "11kW 완속충전기", use: "사용" },
              { siteName: "이지트로닉스동탄본사", siteId: "egtn05", chargerName: "11kw 완속충전기2", chargerId: "c02", model: "11kW 완속충전기", use: "사용" },
              { siteName: "이지트로닉스동탄본사", siteId: "egtn05", chargerName: "11kw 완속충전기3", chargerId: "c03", model: "11kW 완속충전기", use: "사용" },
              { siteName: "이지트로닉스동탄본사", siteId: "egtn05", chargerName: "100kW 급속 테스트 충전기", chargerId: "c99", model: "100kW 급속충전기", use: "사용" },
            ]}
          />
        </section>

        {/* 섹션: 충전 정보 */}
        <section>
          <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>충전 정보</h2>
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
            data={[
              { sessionId: "3709", siteId: "egtn05", chargerId: "c04", connectorId: 1, member: "1019150227148384", startedAt: "2025-09-18 10:28", endedAt: "2025-09-18 12:54", kwh: "17.170 kWh", amount: "0 원" },
            ]}
          />
        </section>
      </main>
    </div>
  );
}
