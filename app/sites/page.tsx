"use client";

import * as React from "react";
import {
  CardAction,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Table } from "@/components/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/sheet";
import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { Input } from "@/components/input";

const initialStationsData = [
  {
    businessCode: "EGTN",
    siteName: "이지트로닉스 동탄본사",
    contractDate: "2023-01-15",
    contractCapacity: "500kW",
    contractManager: "홍길동",
    contractManagerContact: "010-1234-5678",
    registrationDate: "2023-01-20 10:00",
    siteManagerContact: "031-123-4567",
    chargerCount: 5,
    province: "경기도",
    city: "화성시",
    town: "금곡동",
    street: "금곡로 123",
    addressDetail: "A동 101호",
    etc: "본사 건물 주차장",
    longitude: "127.084",
    latitude: "37.203",
    status: "사용",
    voltage: "고압",
  },
  // 다른 데이터 예시...
];

// 수정할 충전소 데이터를 관리하기 위한 타입 정의
type Station = typeof initialStationsData[0];

export default function SitesPage() {
  // 테이블에 표시될 데이터와 수정할 데이터를 상태로 관리
  const [stationsData, setStationsData] = React.useState(initialStationsData);
  const [editingStation, setEditingStation] = React.useState<Station | null>(null);


  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
        충전소 관리
      </h1>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>충전소 목록</CardTitle>
            <CardAction>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>신규 등록</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>충전소 등록</SheetTitle>
                    <SheetDescription>새로운 충전소 정보를 입력하세요.</SheetDescription>
                  </SheetHeader>
                  {/* 여기에 폼 필드들을 추가합니다. */}
                </SheetContent>
              </Sheet>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            columns={[
              {
                key: "actions",
                header: "수정",
                render: (station: Station) => (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        수정
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>충전소 수정</SheetTitle>
                        <SheetDescription>
                          충전소 정보를 수정합니다.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="siteName" className="text-right">충전소명</Label>
                          <Input id="siteName" defaultValue={station.siteName} className="col-span-3" />
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                ),
              },
              { key: "businessCode", header: "사업자코드" },
              { key: "siteName", header: "충전소명" },
              { key: "contractDate", header: "계약일" },
              { key: "contractCapacity", header: "계약용량" },
              { key: "contractManager", header: "계약담당자" },
              { key: "contractManagerContact", header: "계약담당자연락처" },
              { key: "registrationDate", header: "충전소등록일시" },
              { key: "siteManagerContact", header: "충전소담당자연락처" },
              { key: "chargerCount", header: "충전기개수" },
              { key: "province", header: "시,도" },
              { key: "city", header: "시,군,구" },
              { key: "town", header: "읍,면,동" },
              { key: "street", header: "도로명" },
              { key: "addressDetail", header: "상세주소" },
              { key: "etc", header: "기타 상세" },
              { key: "longitude", header: "경도" },
              { key: "latitude", header: "위도" },
              { key: "status", header: "사용여부" },
              { key: "voltage", header: "충전소 전압" },
            ]}
            data={stationsData}
          />
        </CardContent>
      </Card>
    </div>
  );
}