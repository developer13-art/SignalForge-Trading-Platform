export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  error?: {
    message: string;
    code: number;
    details?: Record<string, unknown>;
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}