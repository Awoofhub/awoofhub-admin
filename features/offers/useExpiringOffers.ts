import OfferService from '@/services/offer-service';
import { ApiResponse } from '@/types/api-response';
import { Offer } from '@/types/offer';
import { useQuery } from '@tanstack/react-query';

interface UseExpiringOffersParams {
  page: number;
  limit: number;
}

export const getExpiringOffers = ({ page, limit, }: UseExpiringOffersParams): Promise<ApiResponse<Offer[]>> => {
  return OfferService.expiringOffers(page, limit);
};


export const useExpiringOffers = ({ page, limit }: UseExpiringOffersParams) => {
  const { data, isFetching, isLoading, isFetched, isError } = useQuery({
    queryKey: ['offers', 'expiring', page, limit],
    queryFn: () => getExpiringOffers({ page, limit }),
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