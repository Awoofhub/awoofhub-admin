import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { User } from "@/types/user";

export async function getUserByUsernameService(username: string): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.get(`/users/username/${username}`)

  return res;
}

export async function getAllUsersService(search: string, role: string, status: string, page: number = 1, limit: number = 10): Promise<ApiResponse<User[]>> {
  const res: ApiResponse<User[]> = await apiClient.get("/users", {
    params: { search, role, status, page, limit }
  });

  return res;
}

export async function getUserService(): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.get("/users/me");

  return res;
}

<<<<<<< HEAD
export async function moderateUserService(
  id: string,
  status: "active" | "suspended" | "banned",
): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.post(
    `/users/${id}/admin/moderate`,
    {
      status,
    },
  );
  return res;
}

export async function createModerationLog(payload: {
  targetType: string;
  targetId: string;
  actionType: string;
  reason: string;
  endsAt?: string;
}): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post("/moderation/", payload);
  return res;
}

export async function addUserService(payload: any): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.post("/auth/signup/", payload);
  return res;
}
=======
>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b
