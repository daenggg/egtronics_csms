import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAPI } from '@/lib/api-client';
import { MenuDataItem } from '../types';

// Context가 제공할 값들의 타입
interface AuthContextType {
  accessToken: string | null;
  menuData: MenuDataItem[];
  signIn: (ID: string, PW: string) => Promise<void>;
  logout: () => void;
}

// Context 생성 시 초기값을 타입에 맞게 설정하거나 as를 사용
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider의 props 타입 정의
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [menuData, setMenuData] = useState<MenuDataItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 클라이언트 사이드에서만 sessionStorage에 접근
    const storedAccessToken = sessionStorage.getItem('accessToken');
    const storedRefreshToken = sessionStorage.getItem('refreshToken');
    const storedMenuData = sessionStorage.getItem('menuData');

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
    if (storedMenuData) setMenuData(JSON.parse(storedMenuData));
  }, []);

  const signIn = async (ID: string, PW: string) => {
    try {
      const response = await loginAPI(ID, PW);

      const newAccessToken = response.headers['accesstoken'];
      const newRefreshToken = response.headers['refreshtoken'];
      const responseData = response.data;
      
      if (newAccessToken && newRefreshToken && responseData.payload) {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        sessionStorage.setItem('accessToken', newAccessToken);
        sessionStorage.setItem('refreshToken', newRefreshToken);

        const rawMenuRole = responseData.payload.menuRole || [];
        const processedMenuData = rawMenuRole
          .filter(item => !item.menuId.toString().startsWith('6'))
          .map(item => ({
             // MenuDataItem 타입에 맞게 데이터 가공
            menuName: item.menuName,
            menuId: item.menuId,
            useYn: item.useYn,
            permit: item.permit,
            parentMenuId: item.parentMenuId,
            sort: item.sort,
          }));

        setMenuData(processedMenuData);
        sessionStorage.setItem('menuData', JSON.stringify(processedMenuData));
        router.push('/main');
      } else {
        alert('로그인 성공했으나 토큰을 받지 못했습니다.');
      }
    } catch (error: any) { // 에러 객체는 any 또는 unknown으로 받는 것이 안전
      alert('로그인에 실패했습니다: ' + (error.response?.data?.message || error.message));
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setMenuData([]);
    sessionStorage.clear();
    router.push('/login');
  };

  const value = { accessToken, menuData, signIn, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export default AuthContext;