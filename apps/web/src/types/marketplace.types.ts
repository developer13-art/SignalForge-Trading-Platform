export interface MarketplaceListing {
  id: string;
  providerId: string;
  title: string;
  description?: string;
  category?: string;
  price?: number;
  isFeatured: boolean;
  isActive: boolean;
}

export interface Review {
  id: string;
  providerId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}