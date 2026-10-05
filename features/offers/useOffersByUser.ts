"use client";

import OfferService from "@/services/offer-service";
import { ApiResponse } from "@/types/api-response";
import { Offer } from "@/types/offer";
import { useQuery } from "@tanstack/react-query";

interface GetOffersByUserOptions {
    userId: string;
    page: number;
    limit: number;
};

export const getOffersByUser = async ({ userId, page, limit, }: GetOffersByUserOptions): Promise<ApiResponse<Offer[]>> => {
    return OfferService.offersByUser(userId, page, limit);
};

export const useOffersByUser = ({ userId, page, limit = 8, }: GetOffersByUserOptions) => {
    const { data, isFetching, isFetched, isLoading, isError, } = useQuery({
        queryKey: ["offers", "user", userId, page, limit,],
        queryFn: () => getOffersByUser({ userId, page, limit, }),
        enabled: !!userId,
    });

    return {
        data,
        isFetching,
        isFetched,
        isLoading,
        isError,

    };
};