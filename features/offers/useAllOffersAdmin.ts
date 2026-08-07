// features/offers/useAllOffersAdmin.ts
import { useQuery } from "@tanstack/react-query";
import OfferService from "@/services/offer-service";
import { dashboardService } from "@/services/dashboard-service";
import type { Offer, Stats } from "@/types/offer";

// AllOffersPage filters and paginates client-side, so fetch a large,
// effectively-complete batch rather than paginating server-side here.
const FETCH_LIMIT = 1000;

export const useAllOffersAdmin = () => {
  const offersQuery = useQuery({
    queryKey: ["all-offers-admin"],
    queryFn: async () => {
      const response = await OfferService.offers(
        "", "", "", "", "", "", 0, "", "", 1, FETCH_LIMIT,
      );
      return response.data ?? [];
    },
  });

  const statsQuery = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await dashboardService();
      return response.data;
    },
  });

  // Map backend OfferStats -> the Stats shape AllOffersPage/StatusTabs expect.
  // rejectedAds/suspendedOffers aren't returned by the backend yet, so these
  // stay 0 until that's added.
  const stats: Stats = {
    totalAds: statsQuery.data?.offers.totalOffers ?? 0,
    activeAds: statsQuery.data?.offers.activeOffers ?? 0,
    pendingAds: statsQuery.data?.offers.pendingOffers ?? 0,
    rejectedAds: 0,
    expiredAds: statsQuery.data?.offers.expiredOffers ?? 0,
    suspendedAds: statsQuery.data?.offers.suspendedOffers ?? 0,
  };

  return {
    data: {
      offers: (offersQuery.data ?? []) as Offer[],
      stats,
    },
    isLoading: offersQuery.isLoading || statsQuery.isLoading,
    error: offersQuery.error ?? statsQuery.error,
  };
};