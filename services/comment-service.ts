import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Comment } from "@/types/comment";

async function comments(page: number, limit: number): Promise<ApiResponse<Comment[]>> {
  const res: ApiResponse<Comment[]> = await apiClient.get("/comments", {
    params: { page, limit },
  });

  return res;
}

async function commentsByUser(userid: string, page: number, limit: number): Promise<ApiResponse<Comment[]>> {
  const res: ApiResponse<Comment[]> = await apiClient.get(`/comments/user/${userid}`, {
    params: { page, limit },
  });

  return res;
}

async function commentsForOffer(id: string, page: number, limit: number): Promise<ApiResponse<Comment[]>> {
  const res: ApiResponse<Comment[]> = await apiClient.get(`/comments/offer/${id}`, {
    params: { page, limit },
  });

  return res;
}

const CommentService = {
  comments,
  commentsByUser,
  commentsForOffer
};

export default CommentService;

