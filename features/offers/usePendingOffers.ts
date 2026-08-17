import OfferService from '@/services/offer-service';
import { ApiResponse } from '@/types/api-response';
import { Offer } from '@/types/offer';
import { useInfiniteQuery } from '@tanstack/react-query';

type GetPendingOffersOptions = {
    page?: number,
    limit: number,
};

export const getPendingOffers = ({ page = 1, limit }: GetPendingOffersOptions): Promise<ApiResponse<Offer[]>> => {
    return OfferService.offers("", "", "", 0, "", "", "pending", page, limit);
};

export const usePendingOffers = ({ limit = 8 }: GetPendingOffersOptions) => {
    const { data, isFetched, isFetchingNextPage, isLoading, isFetching, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery({
        queryKey: ['offers', "pending", limit],
        queryFn: ({ pageParam = 1 }) => getPendingOffers({ page: pageParam, limit }),

        getNextPageParam: (lastPage) => {
            if (!lastPage.meta) return undefined;

            const currentPage = Number(lastPage.meta.page);
            const totalPages = Number(lastPage.meta.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,

        refetchInterval: 5000

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
