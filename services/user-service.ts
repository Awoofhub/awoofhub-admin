/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { User } from "@/types/user";

export async function getUserByIdService(
  id: string,
): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.get(`/users/${id}`);

  return res;
}

export async function getAllUsersService(
  search: string = "",
  role: string = "",
  status: string = "",
  page: number = 1,
  limit: number = 10,
): Promise<ApiResponse<User[]>> {
  const params: any = { page, limit };
  if (search) params.search = search;
  if (role) params.role = role;
  if (status) params.status = status;

  const res: ApiResponse<User[]> = await apiClient.get("/users", { params });
  return res;
}

export async function getUserService(): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.get("/users/me");

  return res;
}

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
  // Using signup for creating users for user management , to be changed to specific admin create endpoint after confirming with backend team.
  const res: ApiResponse<User> = await apiClient.post("/auth/signup/", payload);
  return res;
}
