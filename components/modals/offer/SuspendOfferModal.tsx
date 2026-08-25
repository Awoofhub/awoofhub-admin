'use client';

import { useModeration } from '@/features/moderation/useModeration';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useForm } from "react-hook-form";

interface Props {
    offerId: string;
    isOpen: boolean;
    onClose: () => void;
}

interface FormValues {
    reason?: string;
}

export default function SuspendOfferModal({ offerId, isOpen, onClose }: Props) {
    const { submit, isPending, reset: resetModeration } = useModeration({
        onSuccess: () => {
            onClose();
        },
    });

    const { handleSubmit, reset: resetForm } = useForm<FormValues>();

    if (!isOpen) return null;

    const handleClose = () => {
        if (isPending) return;

        resetForm();
        resetModeration();
        onClose();
    };

    const onSubmit = () => {
        submit({ targetType: 'offer', targetId: offerId, actionType: 'suspend' });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="bg-white rounded-xl px-6 py-10 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
                <Image src="/suspend.png" width={200} height={200} alt='' priority className="mx-auto w-[150px] lg:w-[200px]" />

                <h3 className="font-bold text-xl xs:text-2xl text-gray-900 mb-4">Confirm that you are about to suspend this offer.</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full cursor-pointer bg-primary text-white text-base xs:text-lg rounded-sm font-baloo py-1 font-semibold hover:bg-orange-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Suspending...
                            </>
                        ) : (
                            'Suspend Now'
                        )}
                    </button>
                </form>

                <button
                    type="button"
                    onClick={handleClose}
                    disabled={isPending}
                    className="w-full border cursor-pointer text-primary border-primary text-base xs:text-lg rounded-sm py-1 font-semibold font-baloo mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}