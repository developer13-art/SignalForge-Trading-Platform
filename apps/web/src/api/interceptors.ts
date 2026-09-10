import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../stores/auth.store';

export function requestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const { accessToken } = useAuthStore.getState();
  
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  
  return config;
}

export function responseInterceptor(response: AxiosResponse): AxiosResponse {
  return response;
}

export function responseErrorInterceptor(error: AxiosError): Promise<never> {
  if (error.response?.status === 403) {
    const data = error.response.data as { error?: { kycRequired?: boolean; subscriptionRequired?: boolean } };
    
    if (data?.error?.kycRequired) {
      window.location.href = '/kyc';
    }
  }
  
  return Promise.reject(error);
}