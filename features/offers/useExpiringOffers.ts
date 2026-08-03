import { useQuery } from "@tanstack/react-query";
import OfferService from "@/services/offer-service";

interface UseExpiringOffersParams {
  page?: number;
  limit?: number;
}

export const useExpiringOffers = ({ page = 1, limit = 4 }: UseExpiringOffersParams = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["expiring-offers", page, limit],
    queryFn: async () => {
      const response = await OfferService.expiring("", "", "", 0, "", "", page, limit);
      return {
        offers: response.data ?? [],
        totalPages: response.meta?.totalPages ?? 1,
      };
    },
  });

  return {
    data: data?.offers ?? [],
    totalPages: data?.totalPages ?? 1,
    isLoading,
    error,
  };
};