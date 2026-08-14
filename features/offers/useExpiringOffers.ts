import { useQuery } from '@tanstack/react-query';
import OfferService from '@/services/offer-service';

interface UseExpiringOffersParams {
  page: number;
  limit: number;
}

export const useExpiringOffers = ({ page, limit }: UseExpiringOffersParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['offers', 'expiring', page, limit],
    queryFn: () => OfferService.expiringOffers("", "", 0, "", "", page, limit),
    staleTime: 60000,
  });

  return {
    data: data?.data ?? [],
    totalPages: data?.meta?.totalPages ?? 1,
    isLoading,
    isError,
  };
};