'use client';

import { Offer } from "@/types/offer";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import OfferQueueCard from "./OfferQueueCard";

interface Props {
    offers: Offer[];
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
}

export default function OfferQueueList({ offers, hasNextPage, fetchNextPage, isFetchingNextPage }: Props) {

    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <>
            <div className={"flex flex-col gap-3"}>
                {offers.map((offer) => (
                    <OfferQueueCard offer={offer} key={offer.id} />
                ))}
            </div>

            <div ref={ref} className="h-10 flex items-center justify-center mt-6">
                {isFetchingNextPage && (
                    <Spinner className="mt-5 w-10 h-10 text-primary" data-testid="loading" />
                )}
            </div>
        </>
    );
}