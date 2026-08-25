'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useOffer } from '@/features/offers/useOffer';
import { useModeration } from '@/features/moderation/useModeration';
import { useQueryClient } from '@tanstack/react-query';
import ContributorAvatar from '@/components/offer/ContributorAvatar';
import { LocationIconFor, ValueIconFor } from '@/components/offers/OfferCardIcons';
import { getEffectiveOfferStatus } from '@/utils/getEffectiveOfferStatus';
import { Loader2, CircleCheckBig, Hourglass, Pause, XCircle, AlarmClock } from 'lucide-react';
import { FiX } from 'react-icons/fi';

interface Props {
    offerId: string;
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

function OfferDetails({ description }: { description: string }) {
    const [expanded, setExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const element = textRef.current;

        if (!element) return;

        const checkOverflow = () => {
            if (expanded) {
                setCanExpand(true);
                return;
            }
            setCanExpand(element.scrollHeight > element.clientHeight);
        };

        checkOverflow();

        const observer = new ResizeObserver(checkOverflow);
        observer.observe(element);

        return () => observer.disconnect();
    }, [description, expanded]);

    return (
        <div className="mt-2">
            <h4 className="text-xs font-semibold text-gray-900">Details</h4>
            <p
                ref={textRef}
                className={`text-[10px] text-gray-600 ${expanded ? '' : 'line-clamp-1'}`}
            >
                {description}
            </p>
            {canExpand && (
                <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="text-primary text-[10px] font-medium cursor-pointer"
                >
                    {expanded ? 'less' : 'more'}
                </button>
            )}
        </div>
    );
}

export default function OfferModal({ offerId, isOpen, onClose }: Props) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: offer, isLoading } = useOffer({ id: offerId });

    const { submit, isPending } = useModeration({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
            onClose();
        },
    });

    if (!isOpen) return null;

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPending) return;
        onClose();
    };

    const handleViewMore = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/offers/${offerId}`);
    };

    const handleSuspend = () => {
        submit({ targetType: 'offer', targetId: offerId, actionType: 'suspend' });
    };

    const handleReactivate = () => {
        submit({ targetType: 'offer', targetId: offerId, actionType: 'activate' });
    };

    const effectiveStatus = offer ? getEffectiveOfferStatus(offer) : null;
    const pill = effectiveStatus ? STATUS_PILL[effectiveStatus] : null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center p-3 z-50" onClick={handleClose}>
            <div className="relative mt-24">
                <button
                    onClick={handleClose}
                    className="absolute cursor-pointer -top-10 -right-1 xs:-top-8 xs:-right-8 z-10 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-50"
                >
                    <FiX size={16} />
                </button>
                <div className="bg-white rounded-xl p-3 max-h-[80vh] overflow-y-auto no-scrollbar max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                    {isLoading || !offer ? (
                        <div className="py-16 text-center text-sm text-gray-400">Loading...</div>
                    ) : (
                        <>
                            <div className="relative w-full h-55 rounded-lg overflow-hidden mb-4">
                                <Image src={offer.imageUrl} alt={offer.title} fill unoptimized className="object-cover" />
                            </div>

                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-bold text-base text-gray-900 leading-tight">{offer.title}</h3>
                                {pill && (
                                    <span className={`inline-flex items-center gap-1 shrink-0 text-[10px] font-medium px-3 py-1 rounded-full ${pill.className}`}>
                                        {pill.icon}  {pill.label}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-xs text-muted border border-muted/20 rounded-lg px-3 py-0.5 font-baloo">{offer.brandName}</span>
                                <span className="text-xs text-muted border border-muted/20 rounded-lg px-3 py-0.5 capitalize font-baloo">{offer.dealType?.replace('_', ' ')}</span>
                                {offer.category?.name && (
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

                            <OfferDetails description={offer.description} />

                            <hr className="text-muted/20 mt-1.5" />

                            <div className="flex items-center gap-2 mt-1.5">
                                <ContributorAvatar name={offer.contributor?.name} profileImageUrl={offer.contributor?.profileImageUrl} size={30} className="w-6 h-6 xs:w-8 xs:h-8 text-[10px] xs:text-xs" />
                                <span className="text-xs xs:text-sm font-baloo font-semibold text-gray-900">{offer.contributor?.name}</span>
                            </div>

                            <div className="flex gap-3 mt-4">
                                {effectiveStatus === 'approved' && (
                                    <button
                                        type="button"
                                        disabled={isPending}
                                        onClick={handleSuspend}
                                        className="flex-1 cursor-pointer bg-primary text-white rounded-sm py-2 font-baloo font-semibold text-sm hover:bg-orange-700 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isPending ? <><Loader2 className="animate-spin" size={16} /> Suspending...</> : 'Suspend'}
                                    </button>
                                )}

                                {effectiveStatus === 'suspended' && (
                                    <button
                                        type="button"
                                        disabled={isPending}
                                        onClick={handleReactivate}
                                        className="flex-1 cursor-pointer bg-green-600 text-white rounded-sm py-2 font-baloo font-semibold text-sm hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isPending ? <><Loader2 className="animate-spin" size={16} /> Reactivating...</> : 'Re-activate'}
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={handleViewMore}
                                    className={`cursor-pointer border border-primary text-primary rounded-sm py-2 font-baloo font-semibold text-sm hover:bg-orange-50 ${effectiveStatus === 'approved' || effectiveStatus === 'suspended' ? 'flex-1' : 'w-full'
                                        }`}
                                >
                                    View more
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}