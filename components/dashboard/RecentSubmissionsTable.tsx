'use client';

import { useState } from 'react';
import { useRecentPendingOffers } from '@/features/offers/useRecentPendingOffers';
import { formatDateTime } from '@/utils/formatDateTime';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const PAGE_SIZE = 3;
const EXPANDED_LIMIT = 100;

export default function RecentSubmissionsTable() {
    const [expanded, setExpanded] = useState(false);
    const [page, setPage] = useState(1);
    const { data: offers, totalPages, isLoading } = useRecentPendingOffers({
        page: expanded ? 1 : page,
        limit: expanded ? EXPANDED_LIMIT : PAGE_SIZE,
    });

    if (isLoading) {
        return (
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-center text-gray-400 py-8 text-sm">Loading...</div>
            </div>
        );
    }

    if (offers.length === 0 && page === 1) {
        return null;
    }

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-gray-900">Recent Offer Submissions</h2>
                <button
                    type="button"
                    onClick={() => {
                        setExpanded((v) => !v);
                        setPage(1);
                    }}
                    className="text-primary font-baloo font-medium text-sm md:text-base  hover:underline cursor-pointer"
                >
                    {expanded ? 'Show less' : 'View all'}
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[1000px]">
                    <thead>
                        <tr className="text-left bg-[#F9F9F9] font-baloo text-black text-sm uppercase border-b border-muted">
                            <th className="py-4 font-bold pl-2">Offer Title</th>
                            <th className="py-4 font-bold">Category</th>
                            <th className="py-4 font-bold">Deal Type</th>
                            <th className="py-4 font-bold">Awoofer</th>
                            <th className="py-4 font-bold">Submitted</th>
                            <th className="py-4 font-bold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer) => (
                            <tr key={offer.id} className="border-b border-muted/20">
                                <td className="py-6 flex items-center gap-2">
                                    <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0">
                                        <Image src={offer.imageUrl} alt={offer.title} priority fill className="object-cover" />
                                    </div>
                                    <span className="line-clamp-2 text-sm max-w-[160px] text-gray-900">{offer.title}</span>
                                </td>
                                <td className="py-6  text-gray-900">{offer.category?.name}</td>
                                <td className="py-6 text-gray-900 capitalize">{offer.dealType?.replace('_', ' ')}</td>
                                <td className="py-6 font-medium text-gray-900">@{offer.contributor?.username}</td>
                                <td className="py-6 text-gray-900">{formatDateTime(offer.createdAt)}</td>
                                <td className="py-6">
                                    <span className="inline-flex items-center gap-1 bg-[#FFC0001F] text-gray-900 text-sm font-baloo font-medium px-4 py-1 rounded-xl">
                                        <Clock size={12} />
                                        Pending
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!expanded && (
                <div className="flex items-center justify-end gap-2 mt-4">
                    <span className="text-base font-baloo font-medium text-gray-500 mr-auto">Showing {page} of {totalPages}</span>
                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        className="p-1 rounded  disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                        className="p-1 rounded  disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}