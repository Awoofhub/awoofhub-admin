'use client';

import { useState } from 'react';
import { useTrendingOffers } from '@/features/offer/useTrendingOffers';
import { formatDateTime } from '@/utils/formatDateTime';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import ExpiresInCell from './ExpiresInCell';

const PAGE_SIZE = 3;
const EXPIRING_THRESHOLD_DAYS = 3;

function isExpiringSoon(endDate: string) {
    const diffMs = new Date(endDate).getTime() - Date.now();
    const daysLeft = diffMs / (1000 * 60 * 60 * 24);
    return diffMs > 0 && daysLeft < EXPIRING_THRESHOLD_DAYS;
}

export default function TrendingOffersTable() {
    const [page, setPage] = useState(1);
    const { data: offers, totalPages, isLoading } = useTrendingOffers({
        page,
        limit: PAGE_SIZE,
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
                <h2 className="font-bold text-lg text-gray-900">Trending Offers</h2>
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
                            <th className="py-4 font-bold">Grabs</th>
                            <th className="py-4 font-bold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer) => (
                            <tr key={offer.id} className="border-b border-muted/20">
                                <td className="py-6 flex items-center gap-2">
                                    <Link href={`/all-offers/${offer.id}`} className="flex items-center gap-2">
                                        <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0">
                                            <Image src={offer.imageUrl} alt={offer.title} priority fill className="object-cover" />
                                        </div>
                                        <span className="line-clamp-2 text-sm max-w-[160px] text-gray-900 hover:text-primary">{offer.title}</span>
                                    </Link>
                                </td>
                                <td className="py-6  text-gray-900">{offer.category?.name}</td>
                                <td className="py-6 text-gray-900 capitalize">{offer.dealType?.replace('_', ' ')}</td>
                                <td className="py-6 font-medium text-gray-900">@{offer.contributor?.username}</td>
                                <td className="py-6 text-gray-900">{formatDateTime(offer.createdAt)}</td>
                                <td className="py-6 text-gray-900">{offer.clickCount}</td>
                                <td className="py-6">
                                    {isExpiringSoon(offer.endDate) ? (
                                        <ExpiresInCell endDate={offer.endDate} />
                                    ) : (
                                        <span className="inline-flex items-center gap-1 bg-[#20B5261A] text-[#006400] text-sm font-baloo font-medium px-4 py-1 rounded-xl">
                                            <CheckCircle2 size={14} />
                                            Active
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4">
                <span className="text-base font-baloo font-medium text-gray-500 mr-auto">Showing {page} of {totalPages}</span>
                <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="p-1 rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    <ChevronLeft size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="p-1 rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}