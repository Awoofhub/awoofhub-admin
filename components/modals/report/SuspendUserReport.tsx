'use client';

import { FormSelectDropdown } from '@/components/form/FormSelectDropdown';
import { useModeration } from '@/features/moderation/useModeration';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

interface Props {
    userId: string;
    reportIds: string[];
    isOpen: boolean;
    onClose: () => void;
}


interface FormValues {
    reason: string;
    selectedTime: string;
}

export default function SuspendUserReportModal({ userId, reportIds, isOpen, onClose }: Props) {
    const { submit, isPending, reset: resetModeration } = useModeration({
        onSuccess: () => {
            onClose();
        },
    });

    const { register, handleSubmit, control, reset: resetForm } = useForm<FormValues>();

    if (!isOpen) return null;

    const handleClose = () => {
        if (isPending) return;

        resetForm();
        resetModeration();
        onClose();
    };


    const onSubmit = (data: FormValues) => {

        const daysToAdd = parseInt(data.selectedTime, 10);
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + daysToAdd);
        submit({
            targetType: 'user',
            targetId: userId,
            actionType: 'suspend',
            reportIds,
            reason: data.reason,
            endsAt: expirationDate.toISOString(),
        });
    };

    const timelineOptions = [
        { value: "7", label: "One week (7 days)" },
        { value: "14", label: "Two weeks (14 days)" },
        { value: "30", label: "One month (30 days)" },
    ];


    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="bg-white rounded-xl px-6 py-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="selectedTime"
                        control={control}
                        rules={{ required: "Timeline is required" }}
                        render={({ field, fieldState }) => (
                            <FormSelectDropdown
                                label="Suspension Timeline"
                                data={timelineOptions}
                                value={field.value}
                                compulsory={true}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                            />
                        )}
                    />

                    <label className="text-sm text-gray-500 block mt-4 mb-1">Reason for suspension</label>
                    <textarea
                        {...register("reason", { required: "Please provide a reason for rejection." })}
                        placeholder="Briefly describe the situation."
                        rows={4}
                        disabled={isPending}
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none disabled:bg-gray-50 disabled:text-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={isPending}

                        className="w-full cursor-pointer bg-[#CD0F0F] text-white rounded-sm py-1 font-baloo font-semibold text-base xs:text-lg mt-4 hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
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
                    className="w-full cursor-pointer border border-black rounded-sm py-1 font-semibold font-baloo text-base xs:text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Cancel
                </button>

            </div>
        </div>
    );
}