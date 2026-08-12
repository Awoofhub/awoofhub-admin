// features/offers/useUserOffers.ts
import { useQuery } from "@tanstack/react-query";
import { Offer, UserOfferStats } from "@/types/offer";
import OfferService from "@/services/offer-service";

const mapOffersToStats = (offers: Offer[]): UserOfferStats => {
  const getCount = (status: Offer["moderationStatus"]) =>
    offers.filter((o) => o.moderationStatus === status).length;

  return {
    totalOffers: offers.length,
    approvedOffers: getCount("approved"),
    pendingOffers: getCount("pending"),
    rejectedOffers: getCount("rejected"),
    expiredOffers: offers.filter((o) => new Date(o.endDate) < new Date()).length,
  };
};

const fetchUserOffers = async (username: string): Promise<Offer[]> => {
  try {
        const response = await OfferService.offersByUsername(username, "", "", 0, "", "", 1, 50);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching user offers:", error);
    return [];
  }
};

export const useUserOffers = (username: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user-offers", username],
    queryFn: () => fetchUserOffers(username),
    enabled: !!username,
    staleTime: 60_000,
  });

  const offers = data ?? [];
  const stats = mapOffersToStats(offers);

  return { offers, stats, isLoading, error: error as Error | null, refetch };
};