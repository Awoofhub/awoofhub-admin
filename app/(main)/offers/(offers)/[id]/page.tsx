'use client';

import OfferComments from '@/components/offer/OfferComments';
import OfferDetailSkeleton from '@/components/offer/OfferDetailSkeleton';
import OfferHistoryTimeline from '@/components/offer/OfferHistoryTimeline';
import OfferSummaryCard from '@/components/offer/OfferSummaryCard';
import OfferTab from '@/components/offer/OfferTab';
import { useOffer } from '@/features/offers/useOffer';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';


interface Props {
    params: Promise<{ id: string }>;
}

export default function OfferDetailPage({ params }: Props) {
    const { id } = use(params);
    
    const { data: offer, isLoading } = useOffer({ id });
    const [tab, setTab] = useState<'engagements' | 'history'>('engagements');
  
    const router = useRouter();


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

            <OfferSummaryCard offer={offer} />

            <OfferTab activeTab={tab} onChange={setTab} />

            {tab === 'history' ? <OfferHistoryTimeline offer={offer} /> : <OfferComments offerId={id} />}

        </div>
    );
}