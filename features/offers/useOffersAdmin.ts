"use client";

import { useQuery } from "@tanstack/react-query";
import OfferService from "@/services/offer-service";
import { Offer } from "@/types/offer";

interface UseOffersAdminParams {
  search: string;
  category: string;
  dealType: string;
  status: string;
  createdFrom: string;
  createdTo: string;
  page: number;
  limit: number;
}

export const useOffersAdmin = ({
  search,
  category,
  dealType,
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
      dealType,
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
        dealType,
        0,
        createdFrom,
        createdTo,
        page,
        limit,
      );
      let offers: Offer[] = response.data || [];

      if (status) {
        offers = offers.filter((offer) => offer.status === status);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const meta = (response as any).meta;

      return {
        offers,
        totalPages: meta?.totalPages || 1,
        currentPage: meta?.page || page,
        total: offers.length,
      };
    },
  });

  return { data, isLoading, error, refetch };
};
