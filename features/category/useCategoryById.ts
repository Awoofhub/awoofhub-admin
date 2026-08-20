import  CategoryService  from "@/services/category-service";
import { Category } from "@/types/category";
import { useQuery } from "@tanstack/react-query";

type GetCategoryOptions = {
    id: string;
};

export const GetCategoryById = async ({id}:GetCategoryOptions): Promise<Category> => {
  const result = await CategoryService.getCategoryById(id);
  return result.data;
};

export function useCategoryById(id: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category", id],
    queryFn: () => GetCategoryById({id}),
   
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
}