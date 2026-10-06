import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Report, ReportTabsCount } from "@/types/report";

async function reports(search?: string, status?: string, targetType?: string, page: number = 1, limit: number = 10): Promise<ApiResponse<Report[]>> {
  const res: ApiResponse<Report[]> = await apiClient.get("/reports/", {
    params: { search, status, targetType, page, limit },
  });
  return res;
}

async function reportById(id: string): Promise<ApiResponse<Report>> {
  const res: ApiResponse<Report> = await apiClient.get(`/reports/${id}`);
  return res;
}

async function getPendingReportCount(): Promise<ApiResponse<{ count: number }>> {
  const res: ApiResponse<{ count: number }> = await apiClient.get("/reports/pending/count")
  return res;
}

async function getTargetReports<T>(target: string, page: number, limit: number,): Promise<ApiResponse<T[]>> {
  const res: ApiResponse<T[]> = await apiClient.get(`/reports/targets/${target}`, {
    params: { page, limit },
  })

  return res;
}

async function getTabsReportCount(): Promise<ApiResponse<ReportTabsCount>> {
  const res: ApiResponse<ReportTabsCount> = await apiClient.get("/reports/tabs/count")
  return res;
}

async function dismiss(ids: string[]): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.patch("/reports/dismiss", { reportIds: ids })
  return res;
}


const ReportService = {
  reports,
  reportById,
  getPendingReportCount,
  getTabsReportCount,
  getTargetReports,
  dismiss
};

export default ReportService;
