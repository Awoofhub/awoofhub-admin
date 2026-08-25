import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { HelpAndSupport } from "@/types/help-and-support";

async function helpAndSupport(search: string, category: string, status: string, submittedAt: string, page: number, limit: number): Promise<ApiResponse<HelpAndSupport[]>> {
  const res: ApiResponse<HelpAndSupport[]> = await apiClient.get("/help-and-support/", {
    params: { search, category, status, submittedAt, page, limit },
  })

  return res;
}

async function getOpenSupportCount(): Promise<ApiResponse<{ count: number }>> {
  const res: ApiResponse<{ count: number }> = await apiClient.get("/help-and-support/open/count")
  return res;
}

async function updateStatus(id: string, status: HelpAndSupport['status']): Promise<ApiResponse<HelpAndSupport>> {
  const res: ApiResponse<HelpAndSupport> = await apiClient.patch(`/help-and-support/${id}/status`, { status });
  return res;
}

const HelpAndSupportService = {
  helpAndSupport,
  getOpenSupportCount,
  updateStatus
};

export default HelpAndSupportService;