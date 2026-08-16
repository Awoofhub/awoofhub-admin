import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { DashboardData, DashboardOfferChartData, UserDashboard } from "@/types/dashboard";

export async function dashboard(): Promise<ApiResponse<DashboardData>> {
  const res: ApiResponse<DashboardData> = await apiClient.get('/stats/dashboard/')

  return res;
}

export async function dashboardOfferChart(month?: string): Promise<ApiResponse<DashboardOfferChartData>> {
  const res: ApiResponse<DashboardOfferChartData> = await apiClient.get('/stats/dashboard/offers-chart', {
    params: { month },
  })

  return res;
}

export async function userDashboard(id: string): Promise<ApiResponse<UserDashboard>> {
  const res: ApiResponse<UserDashboard> = await apiClient.get(`/stats/dashboard/user/${id}`);

  return res;
}



const DashboardService = {
  dashboard,
  dashboardOfferChart,
  userDashboard
};

export default DashboardService;
