import { useQuery } from "@tanstack/react-query";
import OfferService from "@/services/offer-service";
import { Offer } from "@/types/offer";

interface UseRecentPendingOffersParams {
  page?: number;
  limit?: number;
}

export const useRecentPendingOffers = ({ page = 1, limit = 3 }: UseRecentPendingOffersParams = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recent-pending-offers-all"],
    queryFn: async () => {
      const response = await OfferService.offers("", "", 0, "", "", 1, 300);
      const offers: Offer[] = response.data ?? [];

      return offers
        .filter((offer) => offer.status === "pending")
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
  });

  const all = data ?? [];
  const totalPages = Math.max(1, Math.ceil(all.length / limit));
  const pageItems = all.slice((page - 1) * limit, page * limit);

  return { data: pageItems, totalPages, isLoading, error };
};