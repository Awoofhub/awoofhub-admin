import { useQuery } from "@tanstack/react-query";
import OfferService from "@/services/offer-service";
import { Offer } from "@/types/offer";

const SAMPLE_LIMIT = 300;

export const useOfferInsights = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["offer-insights-sample", SAMPLE_LIMIT],
        queryFn: async () => {
            const response = await OfferService.offers(
                "",
                "",
                "",
                "",
                "",
                "",
                0,
                "",
                "",
                1,
                SAMPLE_LIMIT,
            );
            return (response.data ?? []) as Offer[];
        },
        staleTime: 60_000,
    });

    const offers = data ?? [];

    const rejectedCount = offers.filter((o) => o.Status === "rejected").length;
    const suspendedCount = offers.filter((o) => o.status === "suspended").length;

    return { offers, rejectedCount, suspendedCount, isLoading, error };
};