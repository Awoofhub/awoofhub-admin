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
    reason: string;
}

export default function SuspendOfferModal({ offerId, isOpen, onClose }: Props) {
    const { submit, isPending, reset: resetModeration } = useModeration({
        onSuccess: () => {
            onClose();
        },
    });

    const {register, handleSubmit, reset: resetForm } = useForm<FormValues>();

    if (!isOpen) return null;

    const handleClose = () => {
        if (isPending) return;

        resetForm();
        resetModeration();
        onClose();
    };

    const onSubmit = (data: FormValues) => {
        submit({ targetType: 'offer', targetId: offerId, actionType: 'suspend', reason: data.reason });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <Image src="/suspend.png" width={200} height={200} alt='' priority className="mx-auto w-[150px]" />

                <h3 className="font-bold text-lg text-gray-900 mb-4 text-center">Specify why this offer is being suspended.</h3>
                <label className="text-sm text-gray-500 block mt-4 mb-1">Reason for suspension</label>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        {...register("reason", { required: "Please provide a reason for suspension." })}
                        placeholder="Briefly describe the situation."
                        rows={4}
                        disabled={isPending}
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none disabled:bg-gray-50 disabled:text-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full cursor-pointer bg-primary text-white text-base xs:text-lg rounded-sm font-baloo py-1  mt-4 font-semibold hover:bg-orange-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Suspending...
                            </>
                        ) : (
                            'Suspend'
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