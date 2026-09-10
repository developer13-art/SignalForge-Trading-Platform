import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '../stores/auth.store';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private refreshQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
  }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/api`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

    private setupInterceptors() {
      // Request interceptor
      this.client.interceptors.request.use(
        (config) => {
          const { accessToken } = useAuthStore.getState();
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      // Response interceptor
      this.client.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError) => {
          const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
          const status = error.response?.status;

          // Only attempt refresh on 401 with a valid config
          if (status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
              const newToken = await this.refreshAccessToken();
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${newToken}`,
              };
              return this.client(originalRequest);
            } catch (refreshError) {
              // Refresh failed — this is a real session expiry
              this.handleAuthFailure();
              return Promise.reject(refreshError);
            }
          }

          // 403 KYC required — redirect to /kyc but DO NOT logout
          if (status === 403) {
            const data = error.response?.data as any;
            if (data?.error?.kycRequired) {
              if (window.location.pathname !== '/kyc') {
                window.location.href = '/kyc';
              }
            }
          }

          // 404, 500, 400, 429 — never logout, just reject
          return Promise.reject(error);
        }
      );
    }

    private async refreshAccessToken(): Promise<string> {
      const { refreshToken, setTokens } = useAuthStore.getState();

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.refreshQueue.push({ resolve, reject });
        });
      }

      this.isRefreshing = true;

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;
        setTokens(newAccessToken, newRefreshToken);

        this.refreshQueue.forEach((item) => item.resolve(newAccessToken));
        this.refreshQueue = [];

        return newAccessToken;
      } catch (error) {
        this.refreshQueue.forEach((item) => item.reject(error));
        this.refreshQueue = [];
        throw error;
      } finally {
        this.isRefreshing = false;
      }
    }

  private handleAuthFailure() {
    const { logout } = useAuthStore.getState();
    logout();
    window.location.href = '/login';
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;