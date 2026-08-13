import { useQuery } from '@tanstack/react-query';
import OfferService from '@/services/offer-service';

interface UseTrendingOffersParams {
  page: number;
  limit: number;
}

export const useTrendingOffers = ({ page, limit }: UseTrendingOffersParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['offers', 'trending', page, limit],
    queryFn: () => OfferService.trendingOffers("", "", 0, "", "", page, limit),
    staleTime: 60000,
  });

  return {
    data: data?.data ?? [],
    totalPages: data?.meta?.totalPages ?? 1,
    isLoading,
    isError,
  };
};