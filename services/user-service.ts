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
  const res: ApiResponse<User[]> = await apiClient.get("/users", {
    params: { search, role, status, page, limit },
  });
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
