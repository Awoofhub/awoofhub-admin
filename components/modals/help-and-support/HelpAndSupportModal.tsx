'use client';

import ContributorAvatar from '@/components/offer/ContributorAvatar';
import { HelpAndSupport } from '@/types/help-and-support';
import { formatDate } from '@/utils/formatDate';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import CloseTicketModal from './CloseTicketModal';
import ResolveTicketModal from './ResolveTicketModal';

interface Props {
    data: HelpAndSupport;
    isOpen: boolean;
    onClose: () => void;
}


export default function HelpAndSupportModal({ data, isOpen, onClose }: Props) {
    const [actionModal, setActionModal] = useState<'resolve' | 'close' | null>(null);

    if (!isOpen) return null;

    const isActionModalOpen = actionModal === null;
    const canAct = data.status === 'open' || data.status === 'inProgress';

    return (
        <>
            {isActionModalOpen && <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                <div className="relative bg-white rounded-xl px-4 xs:px-6 py-10 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={onClose}
                        className="absolute cursor-pointer -top-10 -right-1 z-10 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-50"
                    >
                        <FiX size={16} />
                    </button>

                    <div>
                        <div className="flex items-start justify-between gap-3 pb-3 border-b border-muted/20">
                            <div className="flex items-center gap-2">
                                <ContributorAvatar name={data.name} profileImageUrl={null} size={60} className="w-10 h-10 xs:w-12 xs:h-12 lg:w-15 lg:h-15" textClassName="text-sm xs:text-base lg:text-lg" />
                                <div className="flex flex-col gap-1 xs:gap-1.5 lg:gap-2">
                                    <h3 className="font-semibold text-base xs:text-lg text-gray-900">{data.name}</h3>
                                    <p className="text-sm font-medium text-muted">{data.email}</p>
                                </div>
                            </div>
                            <span className="text-xs xs:text-sm text-gray-800">{formatDate(data.createdAt)}</span>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold text-base xs:text-lg text-black">Category: {data.category}</h4>
                            <p className="text-sm xs:text-base text-gray-900 mt-2">{data.message}</p>
                        </div>

                        {canAct && (
                            <div className="flex flex-col gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setActionModal('resolve')}
                                    className="w-full cursor-pointer bg-primary text-white rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base hover:bg-orange-700 disabled:opacity-50"
                                >
                                    Mark Resolved
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActionModal('close')}
                                    className="w-full cursor-pointer border border-primary text-primary rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base hover:bg-orange-50 disabled:opacity-50"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            }

            <ResolveTicketModal
                data={data}
                isOpen={actionModal === 'resolve'}
                onDone={() => {
                    setActionModal(null);
                    onClose();
                }}
            />

            <CloseTicketModal
                data={data}
                isOpen={actionModal === 'close'}
                onDone={() => {
                    setActionModal(null);
                    onClose();
                }}
            />
        </>
    );
}