import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { DashboardData, DashboardOfferChartData } from "@/types/dashboard";

export async function dashboardService(): Promise<ApiResponse<DashboardData>> {
  const res: ApiResponse<DashboardData> = await apiClient.get('/stats/dashboard/')

  return res;
}

export async function dashboardOfferChartService(month?: string): Promise<ApiResponse<DashboardOfferChartData>> {
  const res: ApiResponse<DashboardOfferChartData> = await apiClient.get('dashboard/offers-chart', {
    params: { month },
  })

  return res;
}
