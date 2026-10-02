"use client";

import OfferService from "@/services/offer-service";
import { ApiResponse } from "@/types/api-response";
import { Offer } from "@/types/offer";
import { useQuery } from "@tanstack/react-query";

interface GetOffersByUsernameOptions {
    username: string;
    page: number;
    limit: number;
};

export const getOffersByUsername = async ({ username, page, limit,}: GetOffersByUsernameOptions): Promise<ApiResponse<Offer[]>> => {
    return OfferService.offersByUsername( username, page, limit);
};

export const useOffersByUsername = ({username,page,limit = 8,}: GetOffersByUsernameOptions) => {
    const {data,isFetching,isFetched,isLoading,isError,} = useQuery({
        queryKey: ["offers","username",username, page, limit, ],
        queryFn: () =>getOffersByUsername({username,page, limit,}),
        enabled: !!username,
    });

    return {
        data,
        isFetching,
        isFetched,
        isLoading,
        isError,
       
    };
};