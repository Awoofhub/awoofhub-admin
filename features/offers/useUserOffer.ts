import { useQuery, keepPreviousData } from "@tanstack/react-query";
import OfferService from "@/services/offer-service";
import { Offer } from "@/types/offer";
import { ApiResponse } from "@/types/api-response";

interface UseUserOffersFilters {
  search?: string;
  category?: string;
  minRating?: number;
  createdFrom?: string;
  createdTo?: string;
}

interface UseUserOffersParams extends UseUserOffersFilters {
  username: string;
  page: number;
  limit: number;
}

export function useUserOffers({
  username,
  search = "",
  category = "",
  minRating = 0,
  createdFrom = "",
  createdTo = "",
  page,
  limit,
}: UseUserOffersParams) {
  return useQuery<ApiResponse<Offer[]>>({
    queryKey: [
      "userOffers",
      username,
      search,
      category,
      minRating,
      createdFrom,
      createdTo,
      page,
      limit,
    ],
    queryFn: () =>
      OfferService.offersByUsername(
        username,
        search,
        category,
        minRating,
        createdFrom,
        createdTo,
        page,
        limit
      ),
    enabled: !!username,
    placeholderData: keepPreviousData,
  });
}