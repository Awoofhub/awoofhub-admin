'use client';

import { useQuery } from '@tanstack/react-query';
import OfferService from '@/services/offer-service';

export interface OfferStats {
    totalOffers: number;
    approvedOffers: number;
    pendingOffers: number;
    rejectedOffers: number;
}

const mapOffersToStats = (offers: unknown[]): OfferStats => {
    const getCount = (status: string) =>
        offers.filter((o) => (o as { moderationStatus?: string }).moderationStatus === status).length;

    return {
        totalOffers: offers.length,
        approvedOffers: getCount('approved'),
        pendingOffers: getCount('pending'),
        rejectedOffers: getCount('rejected'),
    };
};

const fetchOfferStats = async (): Promise<OfferStats> => {
    const response = await OfferService.offers('', '', 0, '', '', 1, 1);
    const offers = Array.isArray(response.data) ? response.data : [];
    return mapOffersToStats(offers);
};

export const useOfferStats = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['offer-stats'],
        queryFn: () => fetchOfferStats(),
        staleTime: 60_000,
    });

    return {
        stats: data ?? null,
        isLoading,
        error: error as Error | null,
        refetch,
    };
};
