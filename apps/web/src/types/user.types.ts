export interface UserProfile {
  id: string;
  tradingExperience?: string;
  languages?: string[];
  country?: string;
  address?: string;
  bio?: string;
  preferences?: Record<string, unknown>;
}

export interface UpdateProfileData {
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