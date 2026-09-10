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

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}