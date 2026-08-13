import { useQuery } from '@tanstack/react-query';
import OfferService from '@/services/offer-service';
import { Offer } from '@/types/offer';

export const useOfferStatusCounts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['offers-for-status-count'],
    queryFn: () => OfferService.offersForStatusCount(),
    staleTime: 60000,
  });

  const counts = {
    pending: data?.filter((o) => o.status === 'pending').length ?? 0,
    approved: data?.filter((o) => o.status === 'approved').length ?? 0,
    suspended: data?.filter((o) => o.status === 'suspended').length ?? 0,
    rejected: data?.filter((o) => o.status === 'rejected').length ?? 0,
  };

  return { ...counts, isLoading };
};