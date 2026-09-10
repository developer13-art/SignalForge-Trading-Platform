import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  referralCode?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    kycStatus: string;
    accountType: string;
    roles: string[];
  };
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<{ success: boolean; data: AuthResponse }>(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<{ success: boolean; data: AuthResponse }>(
      ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await apiClient.post<{ success: boolean; data: { accessToken: string; refreshToken: string } }>(
      ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );
    return response.data;
  },

  async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await apiClient.get<{ success: boolean; data: AuthResponse['user'] }>(
      ENDPOINTS.AUTH.ME
    );
    return response.data;
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
  },
};