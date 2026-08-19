import { updateCategoryService } from "@/services/category-service";
import { Category } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateCategoryInput = {
  id: string;
  name: string;
};

export const UpdateCategory = async ( { id, name }: UpdateCategoryInput): Promise<Category> => {
  const result = await updateCategoryService(id, name);
  return result.data;
};

type UseCategoryOptions = {
  onSuccess?: (category: Category) => void;
};

export function useUpdateCategory({ onSuccess }: UseCategoryOptions = {}) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: UpdateCategory,

    onSuccess: (data) => {
      queryClient.setQueryData(["category", data.id], data);

      queryClient.invalidateQueries({
        queryKey: ["category"],
      });

      onSuccess?.(data);
    },
  });

  return {
    updateCategory: mutate,
    isPending,
    isError,
    error,
  };
}