'use client';

import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SummaryPillCard from '@/components/dashboard/SummaryPillCard';
import { useOfferInsights } from '@/features/offers/useOfferInsights';
import {
    MessageSquare, Headphones, UserPlus, Pause, Ban, Hourglass, XCircle, History,
} from 'lucide-react';

function isWithinPeriod(dateStr: string, period: string) {
    const d = new Date(dateStr);
    const now = new Date();

    if (period === 'week') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        return d >= startOfWeek;
    }

    if (period === 'month') {
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }

    const monthIndex = Number(period);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === monthIndex;
}

interface Props {
    bannedAccounts: number;
    totalComments: number;
    expiredOffers: number;
}

export default function SecondaryStatsRow({ bannedAccounts, totalComments, expiredOffers }: Props) {
    const { offers } = useOfferInsights();
    const [period, setPeriod] = useState<string>('week');

    const pastMonthOptions = useMemo(() => {
        const currentMonth = new Date().getMonth();
        return Array.from({ length: currentMonth }, (_, i) => ({
            value: String(i),
            label: new Date(2000, i, 1).toLocaleString('en-US', { month: 'long' }),
        }));
    }, []);

    const { suspendedCount, rejectedCount } = useMemo(() => {
        const filtered = offers.filter((o) => isWithinPeriod(o.createdAt, period));
        return {
            suspendedCount: filtered.filter((o) => o.status === 'suspended').length,
            rejectedCount: filtered.filter((o) => o.moderationStatus === 'rejected').length,

        };
    }, [offers, period]);

    return (
        <div className="mb-8 bg-[#FFFFFF]/20 shadow-sm rounded-2xl ">
            <div className='px-4 pt-4'>
                <div className="relative w-fit mb-4">
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm text-gray-700 cursor-pointer bg-white"
                    >
                        <option value="week">This week</option>
                        <option value="month">This month</option>
                        {pastMonthOptions.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryPillCard label="Suspended Offers" value={suspendedCount} icon={Pause} iconBg="bg-primary" />
                <SummaryPillCard label="Expired offers" value={expiredOffers} icon={Hourglass} iconBg="bg-primary" />
                <SummaryPillCard label="Rejected Offers" value={rejectedCount} icon={XCircle} iconBg="bg-primary" />
                <SummaryPillCard label="Banned Account" value={bannedAccounts} icon={Ban} iconBg="bg-primary" />
                <SummaryPillCard label="Total Comments" value={totalComments} icon={MessageSquare} iconBg="bg-primary" />
                <SummaryPillCard label="Support Tickets" value={0} icon={Headphones} iconBg="bg-primary" />
                <SummaryPillCard label="New Sign up" value={0} icon={UserPlus} iconBg="bg-primary" />
                <SummaryPillCard label="Your Activity log" value={0} icon={History} iconBg="bg-primary" />
            </div>
        </div>
    );
}