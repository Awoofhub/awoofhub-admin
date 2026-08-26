'use client';

import OfferQueueEmptyState from '@/components/offers/OfferQueueEmptyState';
import OfferQueueList from '@/components/offers/OfferQueueList';
import OfferQueueListSkeleton from '@/components/offers/OfferQueueListSkeleton';
import { usePendingOffers } from '@/features/offers/usePendingOffers';
import { usePendingOffersCount } from '@/features/offers/usePendingOffersCount';
import { ChevronRight } from 'lucide-react';

export default function OfferQueuePage() {

    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, } = usePendingOffers({ limit: 8 });
    const { data: pendingCount } = usePendingOffersCount();

    const Offers = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <div className="pt-6 pb-10 px-3 xs:px-4 max-w-[1440px] mx-auto w-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-lg lg:text-xl text-black font-baloo font-semibold">
                    <ChevronRight size={18} className="hidden xs:inline" />
                    <span>Deal Review Queue</span>
                </div>
                {pendingCount !== undefined && (
                    <span className="text-primary font-baloo font-medium text-base lg:text-lg">{pendingCount} pending review&#40;s&#41;</span>
                )}
            </div>

<<<<<<< HEAD
            {!isLoading && !isFetching && Offers.length === 0 && (
                <OfferQueueEmptyState/>
=======
            {!isLoading && Offers.length === 0 && (
                <p className="text-center text-sm md:text-base text-gray-500">No Offers Pending</p>
>>>>>>> 8a3de0288f1eaf03f036115942761b14b22c9131
            )}

            {isLoading && <OfferQueueListSkeleton />}

            {!isLoading && Offers.length > 0 && (
                <OfferQueueList
                    offers={Offers}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                />
            )}

        </div>
    );
}