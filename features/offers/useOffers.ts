import OfferService from '@/services/offer-service';
import { ApiResponse } from '@/types/api-response';
import { Offer } from '@/types/offer';
import { useQuery } from '@tanstack/react-query';


type GetOffersOptions = {
    search: string,
    dealType: string,
    category: string,
    minRating: number,
    createdFrom: string,
    createdTo: string,
    status: string,
    page: number,
    limit: number,
};

export const getOffers = ({ search, dealType, category, minRating, createdFrom, createdTo, status, page, limit, }: GetOffersOptions): Promise<ApiResponse<Offer[]>> => {
    return OfferService.offers(search,  dealType, category, minRating, createdFrom, createdTo, status, page, limit );
};

export const useOffers = ({ search,  dealType, category, minRating, createdFrom, createdTo, status, page, limit = 8, }: GetOffersOptions) => {
    const { data, isFetching, isFetched, isLoading,  isError, error } = useQuery({
        queryKey: ['offers', search, dealType, category, minRating, createdFrom, createdTo, status, page, limit],
        queryFn: () => getOffers({ search, dealType, category, minRating, createdFrom, createdTo, status, page, limit }),

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
