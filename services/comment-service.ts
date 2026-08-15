import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Comment } from "@/types/comment";

export async function getAllComments(page: number = 1, limit: number = 5): Promise<ApiResponse<Comment[]>> {
  const res: ApiResponse<Comment[]> = await apiClient.get("/comments", {
    params: { page, limit, },
  });

  return res;
}
export async function getCommentsByUser({userid}:{userid:string}): Promise<ApiResponse<Comment[]>> {
  const res: ApiResponse<Comment[]> = await apiClient.get(`/comments/user/${userid}`, {
    params: { userid },
  });

  return res;
}

