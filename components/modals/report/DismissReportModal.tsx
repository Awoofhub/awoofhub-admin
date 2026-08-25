'use client';

import { useDismissReport } from '@/features/reports/useDismissReport';
import { Loader2 } from 'lucide-react';

interface Props {
    ids: string[];
    isOpen: boolean;
    onClose: () => void;
}

export default function DismissReportModal({ ids, isOpen, onClose }: Props) {

    const { dismissReports, isPending } = useDismissReport({
        onSuccess: () => {
            onClose();
        },
    });


    if (!isOpen) return null;

    const handleClose = () => {
        if (isPending) return;
        onClose();
    };

    const onSubmit = () => {
        dismissReports(ids);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="bg-white rounded-xl px-6 py-10 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>

                <h3 className="font-bold text-xl xs:text-2xl text-gray-900 mb-4">Are you sure you wanna dismiss this report</h3>


                <button
                    type="submit"
                    disabled={isPending}
                    onClick={onSubmit}
                    className="w-full cursor-pointer bg-primary text-white text-base xs:text-lg rounded-sm font-baloo py-1 font-semibold  hover:bg-primary-light disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Dismissing...
                        </>
                    ) : (
                        'Dismiss'
                    )}
                </button>


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