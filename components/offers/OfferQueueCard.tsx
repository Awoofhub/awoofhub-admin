'use client';

import { Offer } from '@/types/offer';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import { UserRound } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ApproveOfferModal from '../modals/ApproveOfferModal';
import RejectOfferModal from '../modals/RejectOfferModal';
import { LocationIconFor, ValueIconFor } from './OfferCardIcons';
import OfferDetails from './OfferQueueDetail';

interface Props {
    offer: Offer;
}


export default function OfferQueueCard({ offer }: Props) {


    const [openApproveModal, setOpenApproveModal] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);


    return (
        <div className="bg-white rounded-xl shadow-sm p-3 xs:p-4 lg:p-5">
            <div className="flex flex-col xs:flex-row gap-3">
                <div className="relative w-full h-[260px] xs:w-58 md:w-65 xs:h-52 lg:w-85 lg:h-75 xl:w-110 xl:h-87.5 rounded-xl overflow-hidden shrink-0">
                    <Image
                        src={offer.imageUrl}
                        alt={offer.title}
                        unoptimized
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                            <span className="text-xs xs:text-sm lg:text-base font-semibold text-muted">@{offer.contributor?.username}</span>
                            <div className="flex gap-1 text-primary items-center bg-primary/10 rounded-full px-2.5 py-0.5 lg:py-1">
                                <UserRound size={12} />
                                <span className="text-[10px] lg:text-xs font-medium "> Awoofer</span>
                            </div>
                        </div>
                        <span className="text-xs xs:text-sm xl:text-lg font-baloo font-semibold text-primary shrink-0">
                            {formatRelativeTime(offer.createdAt)}
                        </span>
                    </div>

                    <h3 className="font-semibold text-black mt-2 text-lg xs:text-xl xl:text-2xl">{offer.title}</h3>

                    <div className="flex items-center flex-wrap gap-2 lg:gap-4 mt-2">
                        <span className="text-sm xl:text-base font-baloo text-primary font-semibold">{offer.brandName}</span>
                        <span className="text-sm  xl:text-base text-muted border border-muted/20 font-semibold font-baloo rounded-lg px-3 py-0.5 capitalize">{offer.dealType?.replace('_', ' ')}</span>
                        {offer.category?.name && (
                            <span className="text-sm xl:text-base text-muted border border-muted/20 font-baloo font-semibold rounded-lg px-3 py-0.5">{offer.category.name}</span>
                        )}
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

                    <hr className="border border-muted/20 mt-4 lg:mt-4 block xs:hidden lg:block" />

                    <OfferDetails description={offer.description} />

                    <div className="hidden lg:block">
                        <div className="flex flex-col xs:flex-row gap-2 mt-2">
                            <button
                                type="button"
                                onClick={() => setOpenApproveModal(true)}
                                className="flex-1 bg-[#00A95D] text-white rounded-sm py-1.5 font-baloo cursor-pointer font-semibold text-sm xs:text-base lg:text-lg hover:bg-green-700 disabled:opacity-50"
                            >
                                Approve
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpenRejectModal(true)}
                                className="flex-1 bg-[#E70606] text-white rounded-sm py-1.5 font-baloo cursor-pointer font-semibold text-sm xs:text-base lg:text-lg hover:bg-red-700 disabled:opacity-50"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden">
                <div className="flex flex-col xs:flex-row gap-2 mt-2">
                    <button
                        type="button"
                        onClick={() => setOpenApproveModal(true)}
                        className="flex-1 bg-[#00A95D] text-white rounded-sm py-1.5 font-baloo cursor-pointer font-semibold text-sm xs:text-base lg:text-lg hover:bg-green-700 disabled:opacity-50"
                    >
                        Approve
                    </button>
                    <button
                        type="button"
                        onClick={() => setOpenRejectModal(true)}
                        className="flex-1 bg-[#E70606] text-white rounded-sm py-1.5 font-baloo cursor-pointer font-semibold text-sm xs:text-base lg:text-lg hover:bg-red-700 disabled:opacity-50"
                    >
                        Reject
                    </button>
                </div>
            </div>


            <ApproveOfferModal offerId={offer.id} isOpen={openApproveModal} onClose={() => setOpenApproveModal(false)} />
            <RejectOfferModal offerId={offer.id} isOpen={openRejectModal} onClose={() => setOpenRejectModal(false)} />
        </div>
    );
}