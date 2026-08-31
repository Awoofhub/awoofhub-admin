'use client';

import ContributorAvatar from '@/components/offer/ContributorAvatar';
import OfferModalDetails from '@/components/offer/OfferModalDetails';
import { LocationIconFor, ValueIconFor } from '@/components/offers/OfferCardIcons';
import { Offer } from '@/types/offer';
import { getEffectiveOfferStatus } from '@/utils/getEffectiveOfferStatus';
import { AlarmClock, CircleCheckBig, Hourglass, Pause, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import ReactivateOfferModal from './ReactivateOfferModal';
import SuspendOfferModal from './SuspendOfferModal';

interface Props {
    offer: Offer;
    isOpen: boolean;
    onClose: () => void;
}

const STATUS_PILL: Record<string, { label: string; className: string; icon: any }> = {
    approved: { label: 'Active', className: 'bg-[#20B5261A] text-[#006400]', icon: <CircleCheckBig size={12} /> },
    pending: { label: 'Pending', className: 'bg-yellow-50 text-yellow-700', icon: <Hourglass size={12} /> },
    rejected: { label: 'Rejected', className: 'bg-[#E706061A] text-[#E70606]', icon: <XCircle size={12} /> },
    suspended: { label: 'Suspended', className: 'bg-[#FFC0001A] text-[#FE4F04]', icon: <Pause size={12} /> },
    expired: { label: 'Expired', className: 'bg-[#59585833] text-[#595858]', icon: <AlarmClock size={12} /> },
};

export default function OfferModal({ offer, isOpen, onClose }: Props) {
    const router = useRouter();
    const [actionModal, setActionModal] = useState<'suspend' | 'reactivate' | null>(null);

    if (!isOpen) return null;

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };

    const isActionModalOpen = actionModal === null;
    const DisplayStatus = getEffectiveOfferStatus(offer)
    const pill = STATUS_PILL[DisplayStatus]

    return (
        <>
            {isActionModalOpen && <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3 z-50" onClick={handleClose}>
                <div className="relative max-w-lg w-full mt-18" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={handleClose}
                        className="absolute cursor-pointer -top-10 -right-1 xs:-top-7 xs:-right-7 z-10 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-50"
                    >
                        <FiX size={16} />
                    </button>
                    <div className="bg-white rounded-xl p-3 max-h-[90vh] overflow-y-auto no-scrollbar w-full" onClick={(e) => e.stopPropagation()}>

                        <div>
                            <div className="relative w-full h-55 rounded-lg overflow-hidden mb-4">
                                <Image src={offer.imageUrl} alt={offer.title} fill unoptimized className="object-cover" />
                            </div>

                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-bold text-base text-gray-900 leading-tight">{offer.title}</h3>

                                <span className={`inline-flex items-center gap-1 shrink-0 text-[10px] font-medium px-3 py-1 rounded-full ${pill.className}`}>
                                    {pill.icon}  {pill.label}
                                </span>

                            </div>

                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-xs text-muted border border-muted/20 rounded-lg px-3 py-0.5 font-baloo">{offer.brandName}</span>
                                <span className="text-xs text-muted border border-muted/20 rounded-lg px-3 py-0.5 capitalize font-baloo">{offer.dealType?.replace('_', ' ')}</span>
                                {offer.category.name && (
                                    <span className="text-xs text-muted border border-muted/20 rounded-lg px-3 py-0.5 font-baloo">{offer.category.name}</span>
                                )}
                            </div>

                            <div className="flex items-center gap-1 text-[10px] text-muted mt-1">
                                <LocationIconFor location={offer.location} />
                                <span>{offer.location}</span>
                            </div>

                            {offer.externalLink && (
                                <div className="flex items-center gap-1 text-[10px] mt-1">
                                    <span>🔗</span>
                                    <a href={offer.externalLink} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary truncate">
                                        {offer.externalLink}
                                    </a>
                                </div>
                            )}

                            <div className="flex items-center justify-between mt-2 text-[10px]">
                                <span className="text-muted">
                                    Expires: <span className="font-semibold">{new Date(offer.endDate).toLocaleDateString()}</span>
                                </span>
                                {offer.value && (
                                    <span className="flex items-center gap-1 text-primary font-medium">
                                        <ValueIconFor dealType={offer.dealType} />
                                        {offer.value}
                                    </span>
                                )}
                            </div>

                            <OfferModalDetails description={offer.description} />

                            <hr className="text-muted/20 mt-1.5" />

                            <div className="flex items-center gap-2 mt-1.5">
                                <ContributorAvatar name={offer.contributor?.name} profileImageUrl={offer.contributor?.profileImageUrl} size={30} className="w-6 h-6 xs:w-8 xs:h-8 text-[10px] xs:text-xs" />
                                <span className="text-xs xs:text-sm font-baloo font-semibold text-gray-900">{offer.contributor?.name}</span>
                            </div>

                            <div className="flex gap-3 mt-4">
                                {DisplayStatus === 'approved' && (
                                    <button
                                        type="button"
                                        onClick={() => setActionModal('suspend')}
                                        className="flex-1 cursor-pointer bg-primary text-white rounded-sm py-2 font-baloo font-semibold text-sm hover:bg-orange-700 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        Suspend
                                    </button>
                                )}

                                {DisplayStatus === 'suspended' && (
                                    <button
                                        type="button"
                                        onClick={() => setActionModal('reactivate')}
                                        className="flex-1 cursor-pointer bg-green-600 text-white rounded-sm py-2 font-baloo font-semibold text-sm hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        Re-activate
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={() => router.push(`/offers/${offer.id}`)}
                                    className={`cursor-pointer border border-primary text-primary rounded-sm py-2 font-baloo font-semibold text-sm hover:bg-orange-50 ${DisplayStatus === 'approved' || DisplayStatus === 'suspended' ? 'flex-1' : 'w-full'
                                        }`}
                                >
                                    View more
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            <ReactivateOfferModal
                offerId={offer.id}
                isOpen={actionModal === 'reactivate'}
                onClose={() => setActionModal(null)}
            />

            <SuspendOfferModal
                offerId={offer.id}
                isOpen={actionModal === 'suspend'}
                onClose={() => setActionModal(null)}
            />
        </>
    );
}