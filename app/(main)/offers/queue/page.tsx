'use client';

import ApproveOfferModal from '@/components/modals/ApproveOfferModal';
import RejectOfferModal from '@/components/modals/RejectOfferModal';
import OfferQueueCard from '@/components/offers/OfferQueueCard';
import OfferQueueCardSkeleton from '@/components/offers/OfferQueueCardSkeleton';
import { useModeration } from '@/features/moderation/useModeration';
import { usePendingOffers } from '@/features/offers/usePendingOffers';
import { usePendingOffersCount } from '@/features/offers/usePendingOffersCount';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";

export default function OfferQueuePage() {
    const [rejectingOfferId, setRejectingOfferId] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [approvingOfferId, setApprovingOfferId] = useState<string | null>(null);

    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, } = usePendingOffers({ limit: 8 });

    const displayedOffers = data?.pages.flatMap((page) => page.data) ?? [];
    const hasLoadedOnce = !isLoading;

    const { data: pendingCount } = usePendingOffersCount();

    const { submit, isPending, isSuccess, reset } = useModeration();


    const closeApproveModal = () => {
        setApprovingOfferId(null);
        reset();
    };

    const closeRejectModal = () => {
        setRejectingOfferId(null);
        setRejectReason('');
        reset();
    };

    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);


    const handleApproveConfirm = () => {
        if (!approvingOfferId) return;
        submit({ targetType: 'offer', targetId: approvingOfferId, actionType: 'activate' });
    };

    const handleRejectSubmit = () => {
        if (!rejectingOfferId) return;
        submit({ targetType: 'offer', targetId: rejectingOfferId, actionType: 'block', reason: rejectReason });
    };

    return (
        <div className="pt-6 pb-10 px-3 xs:px-4 max-w-[1440px] mx-auto w-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-lg lg:text-xl text-black font-baloo font-semibold">
                    <ChevronRight size={18} className="hidden xs:inline" />
                    <span>Deal Review Queue</span>
                </div>
                {pendingCount !== undefined && (
                    <span className="text-primary font-baloo font-medium text-base lg:text-lg">{pendingCount} pending reviews</span>
                )}
            </div>

            <div className="space-y-3 sm:space-y-4">
                {!hasLoadedOnce
                    ? <OfferQueueCardSkeleton />
                    : displayedOffers.map((offer) => (
                        <OfferQueueCard
                            key={offer.id}
                            offer={offer}
                            isPending={isPending}
                            onApprove={setApprovingOfferId}
                            onReject={setRejectingOfferId}
                        />
                    ))}
            </div>

            <div ref={ref} className="h-1" />

            {isFetchingNextPage && (
                <div className="flex justify-center py-6">
                    <Loader2 className="animate-spin text-primary" size={24} />
                </div>
            )}

            <ApproveOfferModal
                isOpen={approvingOfferId !== null}
                isPending={isPending}
                isSuccess={isSuccess}
                onConfirm={handleApproveConfirm}
                onClose={closeApproveModal}
            />

            <RejectOfferModal
                isOpen={rejectingOfferId !== null}
                reason={rejectReason}
                isPending={isPending}
                isSuccess={isSuccess}
                onReasonChange={setRejectReason}
                onSubmit={handleRejectSubmit}
                onClose={closeRejectModal}
            />
        </div>
    );
}