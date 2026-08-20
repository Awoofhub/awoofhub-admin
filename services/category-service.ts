import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Category, UpdateCategoryData } from "@/types/category";

async function get(): Promise<ApiResponse<Category[]>> {
  const res: ApiResponse<Category[]> = await apiClient.get("/category");

  return res;
}

async function create(name: string): Promise<ApiResponse<Category>> {
  const res: ApiResponse<Category> = await apiClient.post("/category", {
    name,
  });

  return res;
}

async function update(id: string, payload: UpdateCategoryData): Promise<ApiResponse<Category>> {
  const res: ApiResponse<Category> = await apiClient.patch(`/category/${id}`, payload);

  return res;
}

async function deleteById(id: string): Promise < ApiResponse < any >> {
  const res: ApiResponse<any> = await apiClient.delete(`/category/${id}`);

  return res;
}

async function getById(id: string): Promise<ApiResponse<Category>> {
  const res: ApiResponse<Category> = await apiClient.get(`/category/${id}`);

  return res;
}


const CategoryService = {
  get,
  create,
  update,
  deleteById,
  getById,
};

export default CategoryService;
