import { updateCategoryService } from '@/services/category-service';
import { UpdateCategoryData  } from '@/types/category';
import { useMutation } from '@tanstack/react-query';

export default function useUpdateCategory() {
  return useMutation({
    mutationFn: function ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCategoryData;
    }) {
      return updateCategoryService(id, data.name ?? "");
    },
  });
}