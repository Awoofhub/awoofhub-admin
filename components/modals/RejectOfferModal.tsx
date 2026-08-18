'use client';

import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RejectOfferModalProps {
    isOpen: boolean;
    reason: string;
    isPending: boolean;
    isSuccess: boolean;
    onReasonChange: (reason: string) => void;
    onSubmit: () => void;
    onClose: () => void;
}

type Step = 'confirm' | 'reason' | 'success';

const AUTO_CLOSE_DELAY_MS = 2000;

export default function RejectOfferModal({
    isOpen,
    reason,
    isPending,
    isSuccess,
    onReasonChange,
    onSubmit,
    onClose,
}: RejectOfferModalProps) {
    const [step, setStep] = useState<Step>('confirm');
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
    const [prevIsSuccess, setPrevIsSuccess] = useState(isSuccess);

    if (isOpen !== prevIsOpen) {
        setPrevIsOpen(isOpen);
        if (isOpen) setStep('confirm');
    }

    if (isSuccess !== prevIsSuccess) {
        setPrevIsSuccess(isSuccess);
        if (isSuccess) setStep('success');
    }

    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    useEffect(() => {
        if (step !== 'success') return;
        const timer = setTimeout(onClose, AUTO_CLOSE_DELAY_MS);
        return () => clearTimeout(timer);
    }, [step, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl px-6 py-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <Image src="/reject.png" width={200} height={200} alt='' priority className="mx-auto w-[150px] lg:w-[200px]" />
                {step === 'confirm' && (
                    <div className="text-center">
                        <h3 className="font-bold text-xl xs:text-2xl text-gray-900 mb-4">Confirm that you are about to reject this offer</h3>
                        <button
                            type="button"
                            onClick={() => setStep('reason')}
                            className="w-full cursor-pointer bg-[#CD0F0F] text-white text-base xs:text-lg rounded-sm font-baloo py-1 font-semibold hover:bg-red-700"
                        >
                            Reject Now
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full cursor-pointer border border-black rounded-sm py-1 font-semibold font-baloo text-base xs:text-lg mt-2"
                        >
                            Cancel
                        </button>
                    </div>
                )}

                {step === 'reason' && (
                    <>
                        <h3 className="font-bold text-lg xs:text-xl text-gray-900 mb-4 text-center">Specify why this offer is being rejected.</h3>
                        <label className="text-sm text-gray-500 block mt-4 mb-1">Reason for rejection</label>
                        <textarea
                            value={reason}
                            onChange={(e) => onReasonChange(e.target.value)}
                            placeholder="Briefly describe the situation."
                            rows={4}
                            disabled={isPending}
                            className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none disabled:bg-gray-50 disabled:text-gray-400"
                        />
                        <button
                            type="button"
                            disabled={isPending || !reason.trim()}
                            onClick={onSubmit}
                            className="w-full cursor-pointer bg-[#CD0F0F] text-white rounded-sm py-1 font-baloo font-semibold text-base xs:text-lg mt-4 hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Rejecting...
                                </>
                            ) : (
                                'Reject'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="w-full cursor-pointer border border-black rounded-sm py-1 font-semibold font-baloo text-base xs:text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </>
                )}

                {step === 'success' && (
                    <div className="text-center">
                        <h3 className="font-bold text-xl xs:text-2xl text-gray-900">Success!</h3>
                        <p className="text-lg xs:text-xl text-gray-500">Offer rejected successfully.</p>
                    </div>
                )}
            </div>
        </div>
    );
}