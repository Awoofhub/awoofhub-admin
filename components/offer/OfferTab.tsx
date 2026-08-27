'use client';

import SuspendOfferModal from '@/components/modals/offer/SuspendOfferModal';
import OfferComments from '@/components/offer/OfferComments';
import OfferDetailSkeleton from '@/components/offer/OfferDetailSkeleton';
import OfferHistoryTimeline from '@/components/offer/OfferHistoryTimeline';
import OfferSummaryCard from '@/components/offer/OfferSummaryCard';
import { useModerationHistory } from '@/features/moderation/useModerationHistory';
import { useOffer } from '@/features/offers/useOffer';
import { ChevronLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OfferTab() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data: offer, isLoading } = useOffer({ id });
    const [tab, setTab] = useState<'engagements' | 'history'>('engagements');
    const [suspendModalOpen, setSuspendModalOpen] = useState(false);

    const { data: history } = useModerationHistory({ id });

    if (isLoading) {
        return <OfferDetailSkeleton />;
    }

    if (!offer) {
        return <div className="text-center text-gray-400 py-8 text-sm">Offer not found.</div>;
    }

    return (
        <div className="pt-6 pb-10 px-3 xs:px-4 max-w-[1440px] mx-auto w-full">
            <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center gap-1 text-sm xs:text-lg font-baloo font-semibold mb-4"
            >
                <ChevronLeft size={16} /> Back
            </button>

            <OfferSummaryCard offer={offer} onSuspendClick={() => setSuspendModalOpen(true)} />

            <div className="flex gap-2 mb-4 bg-[#F3F3F5] border border-gray-200 py-2 px-4 shadow-sm rounded-xl">
                <button
                    type="button"
                    onClick={() => setTab('engagements')}
                    className={`px-3 py-1 rounded-lg ${tab === 'engagements' ? 'bg-white text-black text-sm xs:text-base lg:text-lg font-semibold' : 'text-muted text-xs xs:text-sm lg:text-base font-medium'}`}
                >
                    Engagements
                </button>
                <button
                    type="button"
                    onClick={() => setTab('history')}
                    className={`px-3 py-1 rounded-lg  ${tab === 'history' ? 'bg-white text-black text-sm xs:text-base lg:text-lg font-semibold' : 'text-muted text-xs xs:text-sm lg:text-base font-medium'}`}
                >
                    Moderation & History
                </button>
            </div>

            {tab === 'engagements' && <OfferComments offerId={id} />}
            {tab === 'history' && <OfferHistoryTimeline offer={offer} history={history} />}

            <SuspendOfferModal
                offerId={offer.id}
                isOpen={suspendModalOpen}
                onClose={() => setSuspendModalOpen(false)}
            />
        </div>
    );
}