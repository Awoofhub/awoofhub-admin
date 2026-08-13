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
    page: number,
    limit: number,
};

export const getOffers = ({ search, dealType, category, minRating, createdFrom, createdTo, page, limit, }: GetOffersOptions): Promise<ApiResponse<Offer[]>> => {
    return OfferService.offers(search,  dealType, category, minRating, createdFrom, createdTo, page, limit );
};

export const useOffers = ({ search,  dealType, category, minRating, createdFrom, createdTo, page, limit = 8, }: GetOffersOptions) => {
    const { data, isFetching, isFetched, isLoading,  isError, error } = useQuery({
        queryKey: ['offers', search, dealType, category, minRating, createdFrom, createdTo, page, limit],
        queryFn: () => getOffers({ search, dealType, category, minRating, createdFrom, createdTo, page, limit }),

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
