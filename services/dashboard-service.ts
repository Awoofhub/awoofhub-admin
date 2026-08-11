import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Dashboard } from "@/types/dashboard";

export async function dashboardService(): Promise<ApiResponse<Dashboard>> {
  const res: ApiResponse<Dashboard> = await apiClient.get('/stats/dashboard/')
  
  return res;
}