import CategoryService from "@/services/category-service";
import { Category } from "@/types/category";
import { useQuery } from "@tanstack/react-query";

type GetCategoryOptions = {
  id: string;
};

export const GetCategoryById = async ({ id }: GetCategoryOptions): Promise<Category> => {
  const result = await CategoryService.getById(id);
  return result.data;
};

export  const useCategoryById = ({ id }: GetCategoryOptions) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category", id],
    queryFn: () => GetCategoryById({ id }),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
}