import { createCategoryService } from '@/services/category-service';
import { CreateCategoryData } from '@/types/category';
import { useMutation } from '@tanstack/react-query';

export default function useCreateCategory() {
    return useMutation({
        mutationFn: function(data: CreateCategoryData){
            return createCategoryService(data.name);
        },
    });
}