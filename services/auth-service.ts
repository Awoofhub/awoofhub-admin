import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { LoginData, LoginResponse } from "@/types/auth";

export async function loginService(payload: LoginData): Promise<ApiResponse<LoginResponse>> {
  const res: ApiResponse<LoginResponse> = await apiClient.post('/auth/login/', payload)

  return res;
}

export async function refreshTokenService(): Promise<ApiResponse<{}>> {
  const res: ApiResponse<{}> = await apiClient.post('/auth/refresh/')
  
  return res;
}

export async function logoutService(): Promise<ApiResponse<{}>> {
  const res: ApiResponse<{}> = await apiClient.post('/auth/logout/')
  
  return res;
}
