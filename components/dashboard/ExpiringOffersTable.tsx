'use client';

import { useState } from 'react';
import { useExpiringOffers } from '@/features/offers/useExpiringOffers';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ExpiresInCell from './ExpiresInCell';

const PAGE_SIZE = 4;
const EXPANDED_LIMIT = 100;

export default function ExpiringOffersTable() {
    const [expanded, setExpanded] = useState(false);
    const [page, setPage] = useState(1);
    const { data: offers, totalPages, isLoading } = useExpiringOffers({
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
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Offers Expiring in 3 Days</h2>
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
                            <th className="py-4 font-bold">Brand Name</th>
                            <th className="py-4 font-bold">Category</th>
                            <th className="py-4 font-bold">Deal Type</th>
                            <th className="py-4 font-bold">Expires In</th>
                            <th className="py-4 font-bold">Action</th>
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
                                <td className="py-6 text-gray-900">{offer.brandName}</td>
                                <td className="py-6 text-gray-900">{offer.category?.name}</td>
                                <td className="py-6 text-gray-900 capitalize">{offer.dealType?.replace('_', ' ')}</td>
                                <td className="py-6">
                                    <ExpiresInCell endDate={offer.endDate} />
                                </td>
                                <td className="py-3">
                                    <Link href={`/all-offers/${offer.id}`} className="text-black hover:text-primary">
                                        <Eye size={20} />
                                    </Link>
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
                        className="p-1 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                        className="p-1 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}