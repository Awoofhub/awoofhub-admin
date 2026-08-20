import CategoryService from "@/services/category-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DelateCategoryOptions = {
  id: string;
  onSuccess?: (data: any) => void;
};


export const deleteCategory = async ({ id }: DelateCategoryOptions): Promise<any> => {
  const result = await CategoryService.deleteById(id);
  return result.data;
}

export const useDeleteCategory = ({ id, onSuccess }: DelateCategoryOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => deleteCategory({ id }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      onSuccess?.(data);
    },
  });

  return {
    delete: mutate,
    isPending,
    isError,
    error,
  };
}