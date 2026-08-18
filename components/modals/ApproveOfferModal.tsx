'use client';

import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ApproveOfferModalProps {
    isOpen: boolean;
    isPending: boolean;
    isSuccess: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

type Step = 'confirm' | 'success';

const AUTO_CLOSE_DELAY_MS = 2000;

export default function ApproveOfferModal({
    isOpen,
    isPending,
    isSuccess,
    onConfirm,
    onClose,
}: ApproveOfferModalProps) {
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
                className="bg-white rounded-xl px-6 py-10 max-w-md w-full text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <Image src="/approve.png" width={200} height={200} alt='' priority className="mx-auto w-[150px] lg:w-[200px]" />
                {step === 'confirm' ? (
                    <>
                        <h3 className="font-bold text-xl xs:text-2xl text-gray-900 mb-4">Confirm that you are about to approve this offer</h3>
                        <button
                            type="button"
                            disabled={isPending}
                            onClick={onConfirm}
                            className="w-full cursor-pointer bg-[#00A95D] text-white text-base xs:text-lg rounded-sm font-baloo py-1 font-semibold  hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Approving...
                                </>
                            ) : (
                                'Approve Now'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="w-full border cursor-pointer border-black text-base xs:text-lg rounded-sm py-1 font-semibold font-baloo mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <h3 className="font-bold text-xl xs:text-2xl  text-gray-900 mb-1">Success!</h3>
                        <p className="text-lg xs:text-xl text-gray-500">Offer approved successfully and now live.</p>
                    </>
                )}
            </div>
        </div>
    );
}