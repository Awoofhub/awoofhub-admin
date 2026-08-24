import Image from 'next/image';
import { Offer } from '@/types/offer';
import { LocationIconFor, ValueIconFor } from '@/components/offers/OfferCardIcons';
import ContributorAvatar from '@/components/offer/ContributorAvatar';
import OfferStatusBadge from '@/components/offer/OfferStatusBadge';
import { getEffectiveOfferStatus } from '@/utils/getEffectiveOfferStatus';
import { Ban } from 'lucide-react';

interface OfferSummaryCardProps {
    offer: Offer;
    onSuspendClick: () => void;
}

function ContributorRow({ offer, onSuspendClick, effectiveStatus }: OfferSummaryCardProps & { effectiveStatus: string }) {
    return (
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
                <ContributorAvatar
                    name={offer.contributor?.name}
                    profileImageUrl={offer.contributor?.profileImageUrl}
                    size={40}
                    className="w-7.5 h-7.5 xs:w-8 xs:h-8"
                    textClassName="text-xs"
                />
                <span className="text-sm xs:text-base font-baloo font-semibold text-black">{offer.contributor?.name}</span>
            </div>

            {/* Suspend only shows for a currently-live*/}
            {effectiveStatus === 'approved' && (
                <button
                    type="button"
                    onClick={onSuspendClick}
                    className="flex items-center gap-1.5 bg-primary text-white text-xs xs:text-base font-baloo font-semibold px-3 py-2 rounded-sm hover:bg-orange-700"
                >
                    <Ban size={16} />
                    Suspend Offer
                </button>
            )}
        </div>
    );
}

export default function OfferSummaryCard({ offer, onSuspendClick }: OfferSummaryCardProps) {
    const effectiveStatus = getEffectiveOfferStatus(offer);

    return (
        <div className="bg-white rounded-xl shadow-sm p-3 xs:p-4 lg:p-5 mb-4">
            <div className="flex flex-col items-start xs:flex-row gap-3">
                <div className="relative w-full h-50.5 xs:w-55 md:w-57.5 xs:h-45.5 lg:w-80 lg:h-70 xl:w-90 xl:h-72.5 rounded-xl overflow-hidden shrink-0">
                    <Image src={offer.imageUrl} alt={offer.title} fill unoptimized className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                    <h1 className="font-semibold text-black mt-2 text-lg xs:text-xl xl:text-2xl">{offer.title}</h1>

                    <div className="flex items-center flex-wrap gap-2 lg:gap-4 mt-2">
                        <span className="text-sm xl:text-base font-baloo text-primary font-semibold">{offer.brandName}</span>
                        <span className="text-sm  xl:text-base text-muted border border-muted/20 font-semibold font-baloo rounded-lg px-3 py-0.5 capitalize">{offer.dealType?.replace('_', ' ')}</span>
                        {offer.category?.name && (
                            <span className="text-sm xl:text-base text-muted border border-muted/20 font-baloo font-semibold rounded-lg px-3 py-0.5">{offer.category.name}</span>
                        )}
                        <OfferStatusBadge status={effectiveStatus} />
                    </div>

                    <div className="flex items-center gap-1 text-xs xs:text-sm lg:text-base text-muted mt-2">
                        <LocationIconFor location={offer.location} />
                        <span>{offer.location}</span>
                    </div>

                    {offer.externalLink && (
                        <div className="flex items-center gap-1 text-xs xs:text-sm lg:text-base  mt-2">
                            <span>🔗</span>
                            <a href={offer.externalLink} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary truncate">
                                {offer.externalLink}
                            </a>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-2 xs:mt-3 text-xs xs:text-sm lg:text-base">
                        <span className="text-muted">
                            Expires: <span className="font-semibold text-muted">{new Date(offer.endDate).toLocaleDateString()}</span>
                        </span>
                        {offer.value && (
                            <span className="flex items-center gap-1 text-primary font-baloo font-medium">
                                <ValueIconFor dealType={offer.dealType} />
                                {offer.value}
                            </span>
                        )}
                    </div>

                    <div className="mt-3">
                        <h4 className="text-sm font-semibold text-gray-900">Details</h4>
                        <p className="text-xs xs:text-sm lg:text-base text-muted mt-1">{offer.description}</p>
                    </div>

                    <div className="block xs:hidden lg:block">
                        <hr className="border border-muted/20 mt-4 lg:mt-4" />
                        <ContributorRow offer={offer} onSuspendClick={onSuspendClick} effectiveStatus={effectiveStatus} />
                    </div>
                </div>
            </div>

            <div className="hidden xs:block lg:hidden">
                <hr className="border border-muted/20 mt-4 lg:mt-4" />
                <ContributorRow offer={offer} onSuspendClick={onSuspendClick} effectiveStatus={effectiveStatus} />
            </div>
        </div>
    );
}