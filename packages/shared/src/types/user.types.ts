export interface UserProfile {
  id: string;
  userId: string;
  tradingExperience?: string;
  languages?: string[];
  country?: string;
  address?: string;
  bio?: string;
  preferences?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
  country?: string;
  address?: string;
  bio?: string;
  tradingExperience?: string;
  languages?: string[];
}

export interface UserDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username?: string;
  phone?: string;
  avatarUrl?: string;
  status: string;
  kycStatus: string;
  accountType: string;
  emailVerifiedAt?: string;
  phoneVerifiedAt?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  profile?: UserProfile;
  roles: string[];
}

export interface UserSession {
  id: string;
  deviceInfo?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  lastSeenAt: string;
  createdAt: string;
  expiresAt: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
}