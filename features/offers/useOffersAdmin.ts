import { useQuery } from "@tanstack/react-query";
import OfferService from "@/services/offer-service";

interface UseOffersAdminParams {
  search: string;
  category: string;
  status: string;
  page: number;
  limit: number;
}

interface OffersResponse {
  offers: any[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const useOffersAdmin = ({
  search,
  category,
  status,
  page,
  limit,
}: UseOffersAdminParams) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-offers", search, category, status, page, limit],
    queryFn: async () => {
      const response = await OfferService.offers(
        search,
        category,
        0, // minRating
        "", // createdFrom
        "", // createdTo
        page,
        limit,
      );

      // Filter by status if provided
      let offers = response.data || [];
      if (status) {
        offers = offers.filter(
          (offer: any) => offer.moderationStatus === status,
        );
      }

      return {
        offers,
        totalPages: Math.ceil((offers.length || 1) / limit),
        currentPage: page,
        total: offers.length,
      } as OffersResponse;
    },
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
