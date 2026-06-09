/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Category } from "@/types/category";

export async function getCategoriesService(
  search: string = "",
  page: number = 1,
  limit: number = 10,
): Promise<ApiResponse<Category[]>> {
  const res: ApiResponse<Category[]> = await apiClient.get("/category", {
    params: { search, page, limit },
  });
  return res;
}

export async function createCategoryService(
  name: string,
): Promise<ApiResponse<Category>> {
  const res: ApiResponse<Category> = await apiClient.post("/category", {
    name,
  });
  return res;
}

export async function updateCategoryService(
  id: string,
  name: string,
): Promise<ApiResponse<Category>> {
  const res: ApiResponse<Category> = await apiClient.patch(`/category/${id}`, {
    name,
  });
  return res;
}

export async function deleteCategoryService(
  id: string,
): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.delete(`/category/${id}`);
  return res;
}
