'use client';

import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useOffers } from '@/features/offers/useOffers';
import { useModeration } from '@/features/moderation/useModeration';
import { usePendingOffersCount } from '@/features/offers/usePendingOffersCount';
import OfferQueueCard from '@/components/offers/OfferQueueCard';
import OfferQueueCardSkeleton from '@/components/offers/OfferQueueCardSkeleton';
import RejectOfferModal from '@/components/modals/RejectOfferModal';
import ApproveOfferModal from '@/components/modals/ApproveOfferModal';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Offer } from '@/types/offer';

const PAGE_SIZE = 5;

export default function OfferQueuePage() {
    const [limit, setLimit] = useState(PAGE_SIZE);
    const [rejectingOfferId, setRejectingOfferId] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [approvingOfferId, setApprovingOfferId] = useState<string | null>(null);

    const { data, isFetching } = useOffers({
        search: '',
        dealType: '',
        category: '',
        minRating: 0,
        createdFrom: '',
        createdTo: '',
        status: 'pending',
        page: 1,
        limit,
    });

    const [lastResult, setLastResult] = useState<{ offers: Offer[]; limit: number } | null>(null);
    const [prevData, setPrevData] = useState(data);

    if (data !== prevData) {
        setPrevData(data);
        if (data?.data) {
            setLastResult({ offers: data.data, limit });
        }
    }

    const displayedOffers = lastResult?.offers ?? [];
    const hasLoadedOnce = lastResult !== null;
    const hasMore = lastResult
        ? lastResult.offers.length >= lastResult.limit
        : true;
    const isLoadingMore = hasLoadedOnce && isFetching;

    const { data: pendingCount } = usePendingOffersCount();

    const queryClient = useQueryClient();

    const { submit, isPending, isSuccess, reset } = useModeration({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
        },
    });

    const closeApproveModal = () => {
        setApprovingOfferId(null);
        reset();
    };

    const closeRejectModal = () => {
        setRejectingOfferId(null);
        setRejectReason('');
        reset();
    };

    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el || !hasMore || !hasLoadedOnce) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching) {
                    setLimit((l) => l + PAGE_SIZE);
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hasMore, hasLoadedOnce, isFetching]);

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

            <div ref={sentinelRef} className="h-1" />

            {isLoadingMore && (
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