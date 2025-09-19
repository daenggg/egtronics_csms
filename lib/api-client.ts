import axios, { AxiosResponse } from 'axios';
import { LoginPayload } from '@/types/index'; // 위에서 정의한 타입 임포트

// Axios 인스턴스 생성 (이전과 동일)
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (이전과 동일)
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API 응답 전체에 대한 타입 정의
interface ApiResponse<T> {
  result: string;
  payload: T;
}

// 로그인 API 함수 (타입 추가)
export const loginAPI = (
  userId: string,
  userPassword: string
): Promise<AxiosResponse<ApiResponse<LoginPayload>>> => {
  return apiClient.post('/login', {
    userId,
    userPassword,
  });
};