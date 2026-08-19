import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Category } from "@/types/category";

 async function getCategory(): Promise<ApiResponse<Category[]>> {
  const res: ApiResponse<Category[]> = await apiClient.get("/category");

  return res;
}

 async function createCategory(name: string,): Promise<ApiResponse<Category>> {
  const res: ApiResponse<Category> = await apiClient.post("/category", {
    name,
  });

  return res;
}

 async function updateCategory(id: string, name: string,): Promise<ApiResponse<Category>> {
  const res: ApiResponse<Category> = await apiClient.patch(`/category/${id}`, {
    name,
  });

  return res;
}

 async function deleteCategory(id: string,): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.delete(`/category/${id}`);

  return res;
}

 async function getCategoryById( id: string): Promise<ApiResponse<Category>> {
  const res: ApiResponse<Category> = await apiClient.get(`/category/${id}`);

  return res;
}


const CategoryService = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,  
};

export default CategoryService;

