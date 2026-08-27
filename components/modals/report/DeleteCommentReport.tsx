'use client';

import { useModeration } from '@/features/moderation/useModeration';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Props {
    reportId: string;
    commentId: string;
    isOpen: boolean;
    onClose: () => void;
}

interface FormValues {
    reason?: string;
}

export default function DeleteCommentReportModal({ commentId, reportId, isOpen, onClose }: Props) {

    const { submit, isPending, reset: resetModeration } = useModeration({
        onSuccess: () => {
            onClose();
        },
    });

    const { register, handleSubmit, reset: resetForm } = useForm<FormValues>();


    if (!isOpen) return null;

   
    const handleClose = () => {
        if (isPending) return;

        resetForm();
        resetModeration();
        onClose();
    };

    const onSubmit = (data: FormValues) => {
        submit({ targetType: 'comment', targetId: commentId, actionType: 'delete', reportIds: [reportId], reason: data.reason });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="bg-white rounded-xl p-6 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
               

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="text-sm text-start text-gray-800 font-bold block mb-1">Reason for deleting</label>
                    <textarea
                        {...register("reason", { required: "Please provide a reason for rejection." })}
                        placeholder="State a reason..."
                        rows={4}
                        disabled={isPending}
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none disabled:bg-gray-50 disabled:text-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full cursor-pointer bg-red-500 text-white text-base xs:text-lg rounded-sm font-baloo py-1 font-semibold mt-4 hover:bg-red-300 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </button>
                </form>




                <button
                    type="button"
                    onClick={handleClose}
                    disabled={isPending}
                    className="w-full border cursor-pointer border-black text-base xs:text-lg rounded-sm py-1 font-semibold font-baloo mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Cancel
                </button>

            </div>
        </div>
    );
}