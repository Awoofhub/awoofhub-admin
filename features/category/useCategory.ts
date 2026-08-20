import CategoryService from '@/services/category-service';
import { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query';


export const getCategory = async (): Promise<Category[]> => {
    const result = await CategoryService.get();
    return result.data;
};


export const useCategory = () => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['category'],
        queryFn: () => getCategory(),
    });

    return {
        data,
        isFetching,
        isFetched
    };
};
