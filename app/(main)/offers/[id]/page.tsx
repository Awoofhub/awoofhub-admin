'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import OfferService from '@/services/offer-service';
import { apiClient } from '@/lib/api-client';
import Terms from '@/components/offer/Terms';
import OfferDetailSkeleton from '@/components/offers/OfferDetailsSkeleton';
import { formatDateTime } from '@/utils/formatDateTime';
import Rating from '@mui/material/Rating';
import {
    Check, X,
    Edit2, History,
    Clock, ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { useModerateOffer } from '@/features/offers/useModerateOffer';

export default function OfferDetailPage() {
    const params = useParams();
    const router = useRouter();
    const offerId = params.id as string;

    const [showModerationModal, setShowModerationModal] = useState(false);
    const [adminNote, setAdminNote] = useState('');
    const [moderationAction, setModerationAction] = useState<'approved' | 'rejected' | 'pending' | null>(null);
    const [isModerationDropdownOpen, setIsModerationDropdownOpen] = useState(false);

    const { mutate: moderateOffer, isPending: isModerating } = useModerateOffer();


    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsModerationDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

  
    const { data: offer, isLoading, error } = useQuery({
        queryKey: ['offer', offerId],
        queryFn: async () => {
            const response = await OfferService.offerById(offerId);
            return response.data;
        },
    });

    const { data: moderationHistory, isLoading: isLoadingHistory } = useQuery({
        queryKey: ['moderation-history', offerId],
        queryFn: async () => {
            const res = await apiClient.get(`/moderation/history/${offerId}`);
            return Array.isArray(res.data) ? res.data : [];
        },
        enabled: !!offerId,
    });

    if (isLoading) return (
        <section className="w-full bg-white px-4 py-8 max-w-360 mx-auto h-[90dvh] md:h-[88dvh]">
            <OfferDetailSkeleton />
        </section>
    );

    if (error || !offer) {
        return (
            <section className="pt-14 px-6 w-full h-[90dvh] md:h-[88dvh]">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg mx-auto">
                    <h2 className="text-lg font-bold text-red-700 mb-2">Error Loading Offer</h2>
                    <p className="text-red-600">{error?.message ?? 'Failed to load offer details.'}</p>
                    <button onClick={() => router.back()} className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                        Go Back
                    </button>
                </div>
            </section>
        );
    }

    const handleModeration = async (action: 'approved' | 'rejected' | 'pending') => {
        setModerationAction(action);
        setShowModerationModal(true);
        setIsModerationDropdownOpen(false);
    };

    const confirmModeration = () => {
        if (!moderationAction) return;
        moderateOffer(
            { id: offerId, status: moderationAction, adminNote },
            {
                onSuccess: () => {
                    setShowModerationModal(false);
                    setAdminNote('');
                    setModerationAction(null);
                }
            }
        );
    };

    const statusConfig: Record<string, string> = {
        approved: 'bg-green-50 text-green-700 border border-green-200',
        active: 'bg-green-50 text-green-700 border border-green-200',
        pending: 'bg-orange-50 text-orange-700 border border-orange-200',
        rejected: 'bg-red-50 text-red-700 border border-red-200',
    };


    const currentStatus = (offer.status || offer.moderationStatus || 'pending').toLowerCase();

    return (
        <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden relative">
            <div className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 mx-auto w-full max-w-360 flex flex-col h-full">

                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 shrink-0 relative">
                    <div className="flex-1">
                        <button onClick={() => router.back()} className="text-primary hover:text-orange-700 font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                            ← Back to Offers
                        </button>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{offer.title}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap capitalize ${statusConfig[currentStatus] || 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                            {currentStatus}
                        </div>
                        
                        {/* Sticky Moderation Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsModerationDropdownOpen(!isModerationDropdownOpen)}
                                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${
                                    isModerationDropdownOpen
                                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                        : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                                }`}
                            >
                                <Edit2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Actions</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isModerationDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isModerationDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-40 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 -mr-2 sm:mr-0">
                                    <button
                                        onClick={() => handleModeration('approved')}
                                        disabled={currentStatus === 'approved' || currentStatus === 'active'}
                                        className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm font-medium text-green-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-b border-gray-100"
                                    >
                                        <Check className="w-4 h-4" /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleModeration('pending')}
                                        disabled={currentStatus === 'pending'}
                                        className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm font-medium text-orange-700 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-b border-gray-100"
                                    >
                                        <Clock className="w-4 h-4" /> Pending
                                    </button>
                                    <button
                                        onClick={() => handleModeration('rejected')}
                                        disabled={currentStatus === 'rejected' || currentStatus === 'block'}
                                        className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <X className="w-4 h-4" /> Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-auto min-h-0 pr-2">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 pb-8 lg:pb-0">
                        {/* LEFT COLUMN */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-100 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 flex items-center justify-center">
                                {/* unoptimized added to prevent Next.js image timeouts from cloud storage */}
                                <Image unoptimized src={offer.imageUrl} alt={offer.title} width={200} height={200} className="aspect-square object-cover rounded-md" />
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 mb-4 sm:mb-6">
                                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Business</h3>
                                <p className="text-gray-700 font-semibold text-sm sm:text-base">{offer.business?.name ?? '—'}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                <div><p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Category</p><p className="text-gray-900 font-semibold text-sm sm:text-base">{offer.category.name}</p></div>
                                <div><p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Location</p><p className="text-gray-900 font-semibold text-sm sm:text-base">{offer.location}</p></div>
                                <div><p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Created</p><p className="text-gray-900 font-semibold text-xs sm:text-sm">{formatDateTime(offer.createdAt)}</p></div>
                                <div><p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Expires</p><p className="text-gray-900 font-semibold text-xs sm:text-sm">{formatDateTime(offer.endDate)}</p></div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="lg:col-span-2 space-y-6 md:space-y-8">

                            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Rating & Reviews</h2>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                    <Rating value={offer.avgRating || 0} precision={0.1} readOnly size="large" sx={{ '& .MuiRating-iconFilled': { color: '#FFC000' } }} />
                                    <span className="text-lg sm:text-xl font-bold text-gray-900">{offer.avgRating || 0}</span>
                                    <span className="text-sm sm:text-base text-gray-500">({offer.reviewCount || 0} reviews)</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{offer.description}</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-3">Offer Value</h2>
                                <p className="text-2xl sm:text-3xl font-bold text-primary">{offer.value}</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                                <Terms prop={offer.termsAndConditions} />
                            </div>

                         
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                                <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                                    <History className="w-5 h-5" /> Moderation History & Notes
                                </h2>

                                {isLoadingHistory ? (
                                    <div className="flex items-center gap-2 text-sm text-blue-600"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div> Fetching history...</div>
                                ) : moderationHistory && moderationHistory.length > 0 ? (
                                    <div className="space-y-3">
                                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                        {moderationHistory.map((mod: any, i: number) => (
                                            <div key={i} className="bg-white p-3 rounded-md border border-blue-100 shadow-sm">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className={`font-bold capitalize text-xs ${mod.actionType === 'block' ? 'text-red-600' : mod.actionType === 'suspend' ? 'text-orange-600' : 'text-green-600'}`}>
                                                        Action: {mod.actionType}
                                                    </span>
                                                    <span className="text-xs text-gray-400">{formatDateTime(mod.createdAt)}</span>
                                                </div>
                                                <p className="text-sm text-gray-700 mt-1">
                                                    <span className="font-semibold">Admin Note:</span> {mod.reason || 'No reason provided.'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-blue-600 italic">No previous moderation actions or notes found.</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                {/* 3-Way Moderation Modal */}
                {showModerationModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-150 p-4">
                        <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">
                                {moderationAction === 'approved' ? 'Approve' : moderationAction === 'rejected' ? 'Reject' : 'Mark as Pending'} Offer
                            </h2>
                            <p className="text-gray-600 mb-6 text-sm">
                                {moderationAction === 'approved'
                                    ? 'Add any notes and approve this offer.'
                                    : moderationAction === 'rejected'
                                        ? 'Please explain why you are rejecting this offer.'
                                        : 'Add a reason for marking this offer as pending review.'}
                            </p>
                            <textarea
                                value={adminNote}
                                onChange={(e) => setAdminNote(e.target.value)}
                                placeholder="Enter your notes here..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none mb-6 h-32 resize-none text-sm"
                            />
                            <div className="flex gap-3">
                                <button onClick={() => { setShowModerationModal(false); setAdminNote(''); setModerationAction(null); }} className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg">
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmModeration}
                                    disabled={isModerating || (!adminNote.trim() && moderationAction !== 'approved')}
                                    className={`flex-1 px-4 py-2 text-white font-semibold rounded-lg disabled:opacity-50 ${moderationAction === 'approved' ? 'bg-green-600 hover:bg-green-700'
                                        : moderationAction === 'rejected' ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-orange-500 hover:bg-orange-600'
                                        }`}
                                >
                                    {isModerating ? 'Saving...' : 'Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}