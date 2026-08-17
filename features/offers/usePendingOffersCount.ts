import OfferService from "@/services/offer-service";
import { useQuery } from "@tanstack/react-query";

export const getPendingOffersCount = async (): Promise<number> => {
    const result = await OfferService.getPendingOffersCount();
    return result.data.count;
};


export const usePendingOffersCount = () => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['offers', 'pending', 'count'],
        queryFn: () => getPendingOffersCount(),
        refetchInterval: 5000
    });

    return {
        data,
        isFetching,
        isFetched
    };
};