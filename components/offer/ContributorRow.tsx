'use client';
import UserAvatar from '@/components/users/UserAvatar';
import { Offer, OfferDisplayStatus } from '@/types/offer';
import { Ban, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import ReactivateOfferModal from '../modals/offer/ReactivateOfferModal';
import SuspendOfferModal from '../modals/offer/SuspendOfferModal';
import Link from 'next/link';


interface Props {
    offer: Offer;
    status: OfferDisplayStatus;
}

export default function ContributorRow({ offer, status }: Props) {

    const [openSuspendModal, setOpenSuspendModal] = useState(false);
    const [openReactivateModal, setOpenReactivateModal] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between mt-4">
                <Link href={`/users/${offer.contributor.username}`} className="flex items-center gap-2">
                    <UserAvatar
                        name={offer.contributor.name}
                        profileImageUrl={offer.contributor.profileImageUrl}
                        size={40}
                        className="w-7.5 h-7.5 xs:w-8 xs:h-8"
                        textClassName="text-xs"
                    />
                    <span className="text-sm xs:text-base font-baloo font-semibold text-black">{offer.contributor.name}</span>
                </Link>

                {status === 'approved' && (
                    <button
                        type="button"
                        onClick={() => setOpenSuspendModal(true)}
                        className="flex items-center gap-1.5 bg-primary text-white text-xs xs:text-base font-baloo font-semibold px-3 py-2 rounded-sm hover:bg-orange-700"
                    >
                        <Ban size={16} />
                        Suspend Offer
                    </button>
                )}

                {status === 'suspended' && (
                    <button
                        type="button"
                        onClick={() => setOpenReactivateModal(true)}
                        className="flex items-center gap-1.5 bg-emerald-600 text-white text-xs xs:text-base font-baloo font-semibold px-3 py-2 rounded-sm hover:bg-emerald-700"
                    >
                        <CheckCircle size={16} />
                        Reactivate Offer
                    </button>
                )}
            </div>

            <ReactivateOfferModal
                offerId={offer.id}
                isOpen={openReactivateModal}
                onClose={() => setOpenReactivateModal(false)}
            />

            <SuspendOfferModal
                offerId={offer.id}
                isOpen={openSuspendModal}
                onClose={() => setOpenSuspendModal(false)}
            />
        </>
    );
}