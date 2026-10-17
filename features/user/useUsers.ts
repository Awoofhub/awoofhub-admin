import { getAllUsersService } from '@/services/user-service';
import { ApiResponse } from '@/types/api-response';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';


type GetUsersOptions = {
    search: string,
    status: string,
    page: number,
    limit: number,
};

export const getUsers = ({ search,  status, page, limit, }: GetUsersOptions): Promise<ApiResponse<User[]>> => {
    return getAllUsersService(search, status, page, limit);
};

export const useUsers = ({ search, status, page, limit = 8, }: GetUsersOptions) => {
    const { data, isFetching, isFetched, isLoading, isError, error } = useQuery({
        queryKey: ['users', search, status, page, limit],
        queryFn: () => getUsers({ search, status, page, limit }),

    });

    return {
        data,
        isFetching,
        isFetched,
        isLoading,
        isError,
        error
    };
};
