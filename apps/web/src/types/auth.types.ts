export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username?: string;
  avatarUrl?: string;
  kycStatus: string;
  accountType: string;
  roles: string[];
}

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
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}