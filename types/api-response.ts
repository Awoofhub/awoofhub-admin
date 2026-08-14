export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;        
  meta?: {     
    page: number;
    totalPages: number;
    limit: number;
  };
}