import CategoryService from "@/services/category-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DelateCategoryOptions = {
    id: string;
};


export const DelateCategoryById = async ({id}:DelateCategoryOptions) =>{
     return CategoryService.deleteCategory(id)
}

type UseCategoryOptions = { onSuccess?: () => void;};

export function useDeleteCategoryById({onSuccess,}: UseCategoryOptions = {}) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({id}:DelateCategoryOptions) => CategoryService.deleteCategory(id),

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: ["category", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["category"],
      });

      onSuccess?.();
    },
  });

  return {
    deleteCategoryById: mutate,
    isPending,
    isError,
    error,
  };
}