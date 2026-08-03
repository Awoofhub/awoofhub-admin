import { useQuery } from "@tanstack/react-query";
import OfferService from "@/services/offer-service";

interface UseOffersAdminParams {
  location?: string;
  externalLink?: string;
  brandName?: string;
  dealType?: string;
  search?: string;
  category?: string;
  status?: string;
  createdFrom?: string;
  createdTo?: string;
  page?: number;
  limit?: number;
}

interface OffersResponse {
  offers: any[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const useOffersAdmin = ({
  location = "",
  externalLink = "",
  brandName = "",
  dealType = "",
  search = "",
  category = "",
  status = "",
  createdFrom = "",
  createdTo = "",
  page = 1,
  limit = 10,
}: UseOffersAdminParams = {}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "admin-offers",
      location,
      externalLink,
      brandName,
      dealType,
      search,
      category,
      status,
      createdFrom,
      createdTo,
      page,
      limit,
    ],
    queryFn: async () => {
      // Since the backend does not support status filtering, we fetch a large batch 
      // when filtering by status to perform accurate client-side filtering and pagination.
      const fetchLimit = status ? 1000 : limit;
      const fetchPage = status ? 1 : page;

      const response = await OfferService.offers(
        location,
        externalLink,
        brandName,
        dealType,
        search,
        category,
        0,
        createdFrom,
        createdTo,
        fetchPage,
        fetchLimit,
      );

      let offers = response.data || [];

      if (status) {
        offers = offers.filter((offer: any) => {
          const offerStatus = offer.moderationStatus || offer.status;
          return offerStatus === status;
        });
      }

      const totalFiltered = offers.length;
      let paginatedOffers = offers;
      
      // Perform client-side pagination if we fetched a large batch for status filtering
      if (status) {
        const startIndex = (page - 1) * limit;
        paginatedOffers = offers.slice(startIndex, startIndex + limit);
      }

      return {
        offers: paginatedOffers,
        totalPages: status ? Math.ceil(totalFiltered / limit) || 1 : (response.meta?.totalPages ?? Math.ceil((offers.length || 1) / limit)),
        currentPage: page,
        total: status ? totalFiltered : offers.length,
      } as OffersResponse;
    },
  });

  return { data, isLoading, error, refetch };
};
