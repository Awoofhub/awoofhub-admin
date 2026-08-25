import ReportService from '@/services/report-service';
import { ApiResponse } from '@/types/api-response';
import { useInfiniteQuery } from '@tanstack/react-query';

type GetTargetReportsOptions = {
    target: "offer" | "comment" | "user";
    page?: number,
    limit: number,
};

export const getTargetReports = <T>({ target, page = 1, limit }: GetTargetReportsOptions): Promise<ApiResponse<T[]>> => {
    return ReportService.getTargetReports(target, page, limit);
};

export const useTargetReports = <T>({ target, limit = 8 }: GetTargetReportsOptions) => {
    const { data, isFetched, isFetchingNextPage, isLoading, isFetching, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery({
        queryKey: ['reports', 'target', target, limit],
        queryFn: ({ pageParam = 1 }) => getTargetReports<T>({ target, page: pageParam, limit }),

        getNextPageParam: (lastPage) => {
            if (!lastPage.meta) return undefined;

            const currentPage = Number(lastPage.meta.page);
            const totalPages = Number(lastPage.meta.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,

    });

    return {
        data,
        isFetched,
        isFetching,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        error
    };
};
