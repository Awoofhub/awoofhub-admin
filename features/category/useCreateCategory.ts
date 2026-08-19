import  CategoryService  from "@/services/category-service";
import { Category } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CreateCategory = async (data: string): Promise<Category> => {
  const result = await CategoryService.createCategory(data);
  return result.data;
};

type UseCategoryOptions = {
  onSuccess?: (category: Category) => void;
};

export function useCreateCategory({ onSuccess }: UseCategoryOptions) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: CreateCategory,

    onSuccess: (data) => {
      queryClient.setQueryData(["category", data.id], data);

      queryClient.invalidateQueries({
        queryKey: ["category"],
      });

      onSuccess?.(data);
    },
  });

  return {
    createCategory: mutate,
    isPending,
    isError,
    error,
  };
}