'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import OfferService from '@/services/offer-service';
import Loading from '@/components/loading/Loading';
import Action from '@/components/offer/Action';
import Terms from '@/components/offer/Terms';
import { formatDateTime } from '@/utils/formatDateTime';
import Rating from '@mui/material/Rating';
import { Check, X, AlertCircle, Clock, Edit2 } from 'lucide-react';
import { useState } from 'react';

export default function OfferDetailPage() {
    const params = useParams();
    const router = useRouter();
    const offerId = params.id as string;
    const [showModerationModal, setShowModerationModal] = useState(false);
    const [adminNote, setAdminNote] = useState('');
    const [moderationAction, setModerationAction] = useState<'approved' | 'rejected' | null>(null);

    const { data: offer, isLoading, error } = useQuery({
        queryKey: ['offer', offerId],
        queryFn: async () => {
            const response = await OfferService.offerById(offerId);
            return response.data;
        },
    });

    if (isLoading) return <Loading />;
    if (error || !offer) {
        return (
            <section className="pt-14 px-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-lg font-bold text-red-700 mb-2">Error Loading Offer</h2>
                    <p className="text-red-600">Failed to load offer details. Please try again.</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </section>
        );
    }

    const handleModeration = async (action: 'approved' | 'rejected') => {
        setModerationAction(action);
        setShowModerationModal(true);
    };

    const statusConfig = {
        approved: 'bg-green-50 text-green-700 border border-green-200',
        pending: 'bg-orange-50 text-orange-700 border border-orange-200',
        rejected: 'bg-red-50 text-red-700 border border-red-200',
    };

    return (
        <section className="max-w-360 bg-white flex flex-col w-full overflow-auto">
            <div className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 mx-auto">
                {/* Back Button & Title */}
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1">
                        <button
                            onClick={() => router.back()}
                            className="text-primary hover:text-orange-700 font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base"
                        >
                            ← Back to Offers
                        </button>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{offer.title}</h1>
                    </div>
                    <div className={`px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap ${statusConfig[offer.moderationStatus]}`}>
                        {offer.moderationStatus.charAt(0).toUpperCase() + offer.moderationStatus.slice(1)}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Image & Basic Info */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-100 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                            <Image
                                src={offer.imageUrl}
                                alt={offer.title}
                                width={400}
                                height={400}
                                className="w-full aspect-square object-contain"
                            />
                        </div>

                        {/* Business Info */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-4 sm:mb-6">
                            <h3 className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Business</h3>
                            <p className="text-gray-700 font-semibold text-sm sm:text-base">{offer.business.name}</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3 sm:space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Category</p>
                                <p className="text-gray-900 font-semibold text-sm sm:text-base">{offer.category.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Location</p>
                                <p className="text-gray-900 font-semibold text-sm sm:text-base">{offer.location}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Created</p>
                                <p className="text-gray-900 font-semibold text-xs sm:text-sm">{formatDateTime(offer.createdAt)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Expires</p>
                                <p className="text-gray-900 font-semibold text-xs sm:text-sm">{formatDateTime(offer.endDate)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Details & Moderation */}
                    <div className="md:col-span-2 space-y-6 md:space-y-8">
                        {/* Rating & Reviews */}
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Rating & Reviews</h2>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                <Rating
                                    value={offer.avgRating}
                                    precision={0.1}
                                    readOnly
                                    size="large"
                                    sx={{
                                        '& .MuiRating-iconFilled': { color: '#FFC000' },
                                        '& .MuiRating-iconEmpty': { color: '#ccc' },
                                    }}
                                />
                                <span className="text-lg sm:text-xl font-bold text-gray-900">{offer.avgRating}</span>
                                <span className="text-sm sm:text-base text-gray-500">({offer.reviewCount} reviews)</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Description</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{offer.description}</p>
                        </div>

                        {/* Value */}
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Offer Value</h2>
                            <p className="text-2xl sm:text-3xl font-bold text-primary">{offer.value}</p>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                            <Terms prop={offer.termsAndConditions} />
                        </div>

                        {/* Admin Notes */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                Admin Notes
                            </h2>
                            {offer.adminNote ? (
                                <p className="text-sm sm:text-base text-blue-800">{offer.adminNote}</p>
                            ) : (
                                <p className="text-sm sm:text-base text-blue-600 italic">No admin notes yet</p>
                            )}
                            {offer.statusUpdatedAt && (
                                <p className="text-xs text-blue-600 mt-2">
                                    Updated: {formatDateTime(offer.statusUpdatedAt)}
                                </p>
                            )}
                        </div>

                        {/* Moderation Controls */}
                        {offer.moderationStatus === 'pending' && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6">
                                <h2 className="text-lg sm:text-xl font-bold text-amber-900 mb-3 sm:mb-4 flex items-center gap-2">
                                    <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Moderation Actions
                                </h2>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <button
                                        onClick={() => handleModeration('approved')}
                                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base\"
                                    >
                                        <Check className="w-4 h-4 sm:w-5 sm:h-5\" />
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleModeration('rejected')}
                                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base\"
                                    >
                                        <X className="w-4 h-4 sm:w-5 sm:h-5\" />
                                        Reject
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Moderation Modal */}
                {showModerationModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                                {moderationAction === 'approved' ? 'Approve' : 'Reject'} Offer
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                                {moderationAction === 'approved'
                                    ? 'Add any notes and approve this offer.'
                                    : 'Please explain why you are rejecting this offer.'}
                            </p>
                            <textarea
                                value={adminNote}
                                onChange={(e) => setAdminNote(e.target.value)}
                                placeholder="Enter your notes here..."
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none mb-4 sm:mb-6 h-24 sm:h-32 resize-none text-sm"
                            />
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => {
                                        setShowModerationModal(false);
                                        setAdminNote('');
                                        setModerationAction(null);
                                    }}
                                    className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // TODO: Implement API call to update moderation status
                                        console.log('Moderating:', {
                                            offerId,
                                            action: moderationAction,
                                            note: adminNote,
                                        });
                                        setShowModerationModal(false);
                                        setAdminNote('');
                                        setModerationAction(null);
                                    }}
                                    className={`flex-1 px-3 sm:px-4 py-2 text-white font-semibold rounded-lg transition-colors text-sm ${moderationAction === 'approved'
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-red-600 hover:bg-red-700'
                                        }`}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
