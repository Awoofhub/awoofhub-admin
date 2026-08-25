'use client';

import { useEffect, useState } from 'react';
import { Moderation } from '@/types/moderation';
import { Offer } from '@/types/offer';
import { ModerationActionIcon, moderationActionLabel } from '@/components/offer/ModerationHistoryIcons';
import { formatHistoryDateTime } from '@/utils/formatHistoryDateTime';
import { CircleCheckBig, Clock } from 'lucide-react';

interface OfferHistoryTimelineProps {
    offer: Offer;
    history: Moderation[] | undefined;
}

export default function OfferHistoryTimeline({ offer, history }: OfferHistoryTimelineProps) {
    const [now, setNow] = useState<number | null>(null);

    useEffect(() => {
        const readNow = () => setNow(Date.now());
        readNow();
    }, []);

    const isExpired = now !== null && offer.status === 'approved' && new Date(offer.endDate).getTime() < now;

    const items = [
        ...(isExpired ? [{
            key: 'expired',
            icon: (
                <div className="bg-gray-200/60 p-2 lg:p-3 rounded-full">
                    <Clock size={18} className="text-gray-500 shrink-0" />
                </div>
            ),
            title: (
                <>
                    <span className="font-baloo font-semibold text-black text-sm xs:text-lg">Expired{' '}</span>
                    <span className="text-muted font-medium text-[10px] xs:text-sm">{formatHistoryDateTime(offer.endDate)}</span>
                </>
            ),
            subtitle: 'Offer reached its end date',
        }] : []),

        ...(history ?? []).map((entry) => ({
            key: entry.id,
            icon: <ModerationActionIcon actionType={entry.actionType} />,
            title: (
                <>
                    <span className="font-baloo font-semibold text-black text-sm xs:text-lg"> {moderationActionLabel(entry.actionType)}{' '}</span>
                    <span className="font-medium text-xs xs:text-base text-black">by {entry.admin?.name}</span>
                    {' · '}
                    <span className="text-muted font-medium text-[10px] xs:text-sm">{formatHistoryDateTime(entry.createdAt)}</span>
                </>
            ),
            subtitle: entry.actionType === 'activate' ? 'Went live' : entry.reason,
        })),

        {
            key: 'created',
            icon: <div className=" bg-[#006400]/10 p-2 lg:p-3 rounded-full"><CircleCheckBig size={18} className="text-[#006400] shrink-0" /></div>,
            title: (
                <>
                    <span className="font-baloo font-semibold text-black text-sm xs:text-lg"> Offer Created{' '}</span>
                    <span className="text-muted font-medium text-[10px] xs:text-sm">{formatHistoryDateTime(offer.createdAt)}</span>
                </>
            ),
            subtitle: `By ${offer.contributor?.name}`,
        },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 uppercase text-sm xs:text-base lg:text-lg mb-4">Status History</h3>
            <div>
                {items.map((item, id) => (
                    <div key={item.key} className="flex gap-3">
                        <div className="flex flex-col items-center">
                            {item.icon}
                            {id < items.length - 1 && (
                                <div className="w-px flex-1 min-h-8 bg-primary/60 my-1"/>
                            )}
                        </div>
                        <div className={id < items.length - 1 ? 'pb-6' : ''}>
                            <p>{item.title}</p>
                            {item.subtitle && <p className="text-xs xs:text-sm lg:text-base text-muted mt-1">{item.subtitle}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}