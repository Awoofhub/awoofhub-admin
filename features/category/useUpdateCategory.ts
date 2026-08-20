import CategoryService from "@/services/category-service";
import { Category, UpdateCategoryData } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateCategoryOptions = {
  id: string;
  onSuccess?: (category: Category) => void;
};

export const UpdateCategory = async ({ id }: UpdateCategoryOptions, data: UpdateCategoryData): Promise<Category> => {
  const result = await CategoryService.update(id, data);
  return result.data;
};

export const useUpdateCategory = ({ id, onSuccess }: UpdateCategoryOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (payload: UpdateCategoryData) => UpdateCategory({ id }, payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      queryClient.setQueryData(["category", data.id], data);

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