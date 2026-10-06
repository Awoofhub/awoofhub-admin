import { getAllUsersService } from '@/services/user-service';
import { ApiResponse } from '@/types/api-response';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';


type GetUsersOptions = {
    search: string,
    role: string,
    status: string,
    page: number,
    limit: number,
};

export const getUsers = ({ search, role, status, page, limit, }: GetUsersOptions): Promise<ApiResponse<User[]>> => {
    return getAllUsersService(search, role, status, page, limit);
};

export const useUsers = ({ search, role, status, page, limit = 8, }: GetUsersOptions) => {
    const { data, isFetching, isFetched, isLoading, isError, error } = useQuery({
        queryKey: ['users', search, role, status, page, limit],
        queryFn: () => getUsers({ search, role, status, page, limit }),

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
