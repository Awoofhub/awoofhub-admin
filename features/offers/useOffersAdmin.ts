import { useQuery } from "@tanstack/react-query";
import OfferService from "@/services/offer-service";

interface UseOffersAdminParams {
  search: string;
  category: string;
  status: string;
  createdFrom: string;
  createdTo: string;
  page: number;
  limit: number;
}

interface OffersResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  offers: any[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const useOffersAdmin = ({
  search,
  category,
  status,
  createdFrom,
  createdTo,
  page,
  limit,
}: UseOffersAdminParams) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "admin-offers",
      search,
      category,
      status,
      createdFrom,
      createdTo,
      page,
      limit,
    ],
    queryFn: async () => {
      const response = await OfferService.offers(
        search,
        category,
        0, // minRating
        createdFrom,
        createdTo,
        page,
        limit,
      );

      // Filter by status if provided
      let offers = response.data || [];
      if (status) {
        offers = offers.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
