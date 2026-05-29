import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { EmailData, LoginData, LoginResponse, ResetPasswordData } from "@/types/auth";

// Login
export async function loginService(payload: LoginData): Promise<ApiResponse<LoginResponse>> {
  const res: ApiResponse<LoginResponse> = await apiClient.post('/auth/login/', payload)

  return res;
}

export async function forgotPasswordService(payload: EmailData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/forgot-password/', payload)
  
  return res;
}

export async function resetPasswordService(payload: ResetPasswordData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/reset-password/', payload)
  
  return res;
}

export async function refreshTokenService(): Promise<ApiResponse<{}>> {
  const res: ApiResponse<{}> = await apiClient.post('/auth/refresh/')
  
  return res;
}

// Logout
export async function logoutService(): Promise<ApiResponse<{}>> {
  const res: ApiResponse<{}> = await apiClient.post('/auth/logout/')
  
  return res;
}
