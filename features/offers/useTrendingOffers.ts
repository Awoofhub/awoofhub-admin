import OfferService from '@/services/offer-service';
import { ApiResponse } from '@/types/api-response';
import { Offer } from '@/types/offer';
import { useQuery } from '@tanstack/react-query';

interface GetTrendingOffersOptions {
  page: number;
  limit: number;
}

export const getTrendingOffers = ({ page, limit, }: GetTrendingOffersOptions): Promise<ApiResponse<Offer[]>> => {
  return OfferService.trendingOffers(page, limit);
};

export const useTrendingOffers = ({ page, limit }: GetTrendingOffersOptions) => {
  const { data, isFetching, isLoading, isFetched, isError } = useQuery({
    queryKey: ['offers', 'trending', page, limit],
    queryFn: () => getTrendingOffers({ page, limit }),
    staleTime: 60000,
  });

  return {
    data,
    isFetching,
    isLoading,
    isFetched,
    isError,
  };
};