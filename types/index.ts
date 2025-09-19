// 로그인 성공 시 응답 데이터의 payload 부분 타입
export interface LoginPayload {
  menuRole: MenuDataItem[];
  // ... 그 외 사용자 정보가 있다면 추가
}

// 메뉴 데이터 항목의 타입
export interface MenuDataItem {
  menuName: string;
  menuId: number | string; // 원본 코드에서 문자열로 변환하는 부분이 있었으므로 union 타입 사용
  useYn: 'Y' | 'N';
  permit: {
    c: 'Y' | 'N';
    r: 'Y' | 'N';
    u: 'Y' | 'N';
    d: 'Y' | 'N';
  };
  parentMenuId: number | null;
  sort: number;
}