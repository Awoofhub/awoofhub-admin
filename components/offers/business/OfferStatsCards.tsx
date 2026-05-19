'use client';

import { Tag, Clock, CheckCircle, XCircle } from 'lucide-react';

interface OfferStats {
    totalOffers: number;
    approvedOffers: number;
    pendingOffers: number;
    rejectedOffers: number;
}

interface StatCard {
    label: string;
    valueGetter: (stats: OfferStats) => number;
    Icon: React.ElementType;
    iconBg: string;
}

interface Props {
    stats: OfferStats;
}

const cards: StatCard[] = [
    { label: 'Total Offers', valueGetter: (s) => s.totalOffers, Icon: Tag, iconBg: 'bg-emerald-100' },
    { label: 'Pending',     valueGetter: (s) => s.pendingOffers, Icon: Clock, iconBg: 'bg-orange-100' },
    { label: 'Approved',    valueGetter: (s) => s.approvedOffers, Icon: CheckCircle, iconBg: 'bg-green-100' },
    { label: 'Rejected',    valueGetter: (s) => s.rejectedOffers, Icon: XCircle, iconBg: 'bg-rose-100' },
];

export default function OfferStatsCards({ stats }: Props) {
    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {cards.map((card) => {
                const value = card.valueGetter(stats);
                return (
                    <div
                        key={card.label}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${card.iconBg}`}>
                                <card.Icon className="w-5 h-5 text-gray-700" />
                            </div>
                            <p className="text-gray-600 font-medium text-sm">{card.label}</p>
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{value}</p>
                    </div>
                );
            })}
        </div>
    );
}
