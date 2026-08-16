import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";








async function getOpenSupportCount(): Promise<ApiResponse<{count: number}>> {
    const res: ApiResponse<{count: number}> = await apiClient.get("/help-and-support/open/count")
    return res;
}

const HelpAndSupportService = {
  
  getOpenSupportCount,
};

export default HelpAndSupportService;