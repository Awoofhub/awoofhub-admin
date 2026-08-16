import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { CreateModerationData, Moderation } from "@/types/moderation";

async function create(payload: CreateModerationData): Promise<ApiResponse<Moderation>> {
  const res: ApiResponse<Moderation> = await apiClient.post('/moderation/', payload)

  return res;
}

async function latestModerationHistory(id: string): Promise<ApiResponse<Moderation>> {
  const res: ApiResponse<Moderation> = await apiClient.get(`/moderation/history/${id}/latest`)

  return res;
}

async function moderationHistory(id: string): Promise<ApiResponse<Moderation[]>> {
  const res: ApiResponse<Moderation[]> = await apiClient.get(`/moderation/history/${id}`)

  return res;
}

const ModerationService = {
  create,
  moderationHistory,
  latestModerationHistory
};

export default ModerationService;