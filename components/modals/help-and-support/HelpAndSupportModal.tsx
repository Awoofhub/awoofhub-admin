'use client';

import { useState } from 'react';
import { HelpAndSupport } from '@/types/help-and-support';
import { formatDate } from '@/utils/formatDate';
import ContributorAvatar from '@/components/offer/ContributorAvatar';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

interface Props {
    ticket: HelpAndSupport | null;
    isOpen: boolean;
    isPending: boolean;
    onResolve: () => void;
    onCloseTicket: () => void;
    onClose: () => void;
}

type ConfirmStep = 'resolve' | 'close' | null;

function ConfirmScreen({
    variant, onCancel, onConfirm, isPending,
}: {
    variant: 'resolve' | 'close';
    onCancel: () => void;
    onConfirm: () => void;
    isPending: boolean;
}) {
    const isResolve = variant === 'resolve';
    return (
        <div className="text-center py-4">
            <div className="relative mx-auto mb-4 flex items-center justify-center">
                {isResolve ? (
                    <Image src="/approve.png" width={200} height={200} alt='' priority className="mx-auto w-[150px] lg:w-[200px]" />
                ) : (
                    <Image src="/suspend.png" width={200} height={200} alt='' priority className="mx-auto w-[150px] lg:w-[200px]" />
                )}
            </div>
            <h3 className="font-bold text-xl xs:text-2xl lg:text-3xl text-gray-900 mb-4">
                {isResolve ? 'Resolve this ticket?' : 'Close this ticket?'}
            </h3>
            <div className="flex-col xs:flex-row flex gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isPending}
                    className={`flex-1 cursor-pointer border rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base disabled:opacity-50 ${isResolve ? 'border-[#00A95D] text-[#00A95D]' : 'border-primary text-primary'
                        }`}
                >
                    Not yet
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isPending}
                    className={`flex-1 cursor-pointer text-white rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base disabled:opacity-50 flex items-center justify-center gap-2 ${isResolve ? 'bg-[#00A95D] hover:bg-green-700' : 'bg-primary hover:bg-orange-700'
                        }`}
                >
                    {isPending ? <Loader2 className="animate-spin" size={16} /> : 'Continue'}
                </button>
            </div>
        </div>
    );
}

export default function HelpAndSupportModal({ ticket, isOpen, isPending, onResolve, onCloseTicket, onClose }: Props) {
    const [confirmStep, setConfirmStep] = useState<ConfirmStep>(null);

    if (!isOpen || !ticket) return null;

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPending) return;
        setConfirmStep(null);
        onClose();
    };

    const canAct = ticket.status === 'open' || ticket.status === 'inProgress';

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="relative bg-white rounded-xl px-4 xs:px-6 py-10 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={handleClose}
                    className="absolute cursor-pointer -top-10 -right-1 z-10 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-50"
                >
                    <FiX size={16} />
                </button>

                {confirmStep ? (
                    <ConfirmScreen
                        variant={confirmStep}
                        isPending={isPending}
                        onCancel={() => setConfirmStep(null)}
                        onConfirm={() => {
                            if (confirmStep === 'resolve') onResolve();
                            else onCloseTicket();
                            setConfirmStep(null);
                        }}
                    />
                ) : (
                    <>
                        <div className="flex items-start justify-between gap-3 pb-3 border-b border-muted/20">
                            <div className="flex items-center gap-2">
                                <ContributorAvatar name={ticket.name} profileImageUrl={null} size={60} className="w-10 h-10 xs:w-12 xs:h-12 lg:w-15 lg:h-15" textClassName="text-sm xs:text-base lg:text-lg" />
                                <div className="flex flex-col gap-1 xs:gap-1.5 lg:gap-2">
                                    <h3 className="font-semibold text-base xs:text-lg text-gray-900">{ticket.name}</h3>
                                    <p className="text-sm font-medium text-muted">{ticket.email}</p>
                                </div>
                            </div>
                            <span className="text-xs xs:text-sm text-gray-800">{formatDate(ticket.createdAt)}</span>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold text-base xs:text-lg text-black">Category: {ticket.category}</h4>
                            <p className="text-sm xs:text-base text-gray-900 mt-2">{ticket.message}</p>
                        </div>

                        {canAct && (
                            <div className="flex flex-col gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setConfirmStep('resolve')}
                                    disabled={isPending}
                                    className="w-full cursor-pointer bg-primary text-white rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base hover:bg-orange-700 disabled:opacity-50"
                                >
                                    Mark Resolved
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setConfirmStep('close')}
                                    disabled={isPending}
                                    className="w-full cursor-pointer border border-primary text-primary rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base hover:bg-orange-50 disabled:opacity-50"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}