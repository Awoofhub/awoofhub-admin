'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {  Loader2 } from 'lucide-react';
import { FiX } from 'react-icons/fi';
import { useCategoryById } from '@/features/category/useCategoryById';
import { useUpdateCategory } from '@/features/category/useUpdateCategory';
import { useDeleteCategory } from '@/features/category/useDelateCategory';
import Image from 'next/image';

interface Props {
    categoryId: string;
    isOpen: boolean;
    onClose: () => void;
}

interface FormValues {
    name: string;
}

type ConfirmStep = 'update' | 'delete' | null;

function ConfirmScreen({
    variant, onCancel, onConfirm, isPending,
}: {
    variant: 'update' | 'delete';
    onCancel: () => void;
    onConfirm: () => void;
    isPending: boolean;
}) {
    const isUpdate = variant === 'update';
    return (
        <div className="text-center py-4">
            {isUpdate ? (
                <Image src="/approve.png" width={200} height={200} alt='' priority className="mx-auto w-[150px] lg:w-[200px]" />
            ) : (
                <Image src="/suspend.png" width={200} height={200} alt='' priority className="mx-auto w-[150px] lg:w-[200px]" />
            )}
            <h3 className="font-bold text-xl xs:text-2xl lg:text-3xl text-gray-900 mb-4">
                {isUpdate ? 'Update this category?' : 'Delete this category?'}
            </h3>
            <div className="flex-col xs:flex-row flex gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isPending}
                    className={`flex-1 cursor-pointer border rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base disabled:opacity-50 ${isUpdate ? 'border-[#00A95D] text-[#00A95D]' : 'border-primary text-primary'
                        }`}
                >
                    Not yet
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isPending}
                    className={`flex-1 cursor-pointer text-white rounded-sm py-2 font-baloo font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-2 ${isUpdate ? 'bg-[#00A95D] hover:bg-green-700' : 'bg-primary hover:bg-orange-700'
                        }`}
                >
                    {isPending ? <Loader2 className="animate-spin" size={16} /> : 'Continue'}
                </button>
            </div>
        </div>
    );
}

export default function CategoryModal({ categoryId, isOpen, onClose }: Props) {
    const { data: category } = useCategoryById({ id: categoryId });
    const { register, handleSubmit, reset, getValues } = useForm<FormValues>();

    const [confirmStep, setConfirmStep] = useState<ConfirmStep>(null);

    const { updateCategory, isPending: isUpdating } = useUpdateCategory({
        id: categoryId,
        onSuccess: () => { setConfirmStep(null); onClose(); },
    });

    const { delete: deleteCategory, isPending: isDeleting } = useDeleteCategory({
        id: categoryId,
        onSuccess: () => { setConfirmStep(null); onClose(); },
    });

    const isPending = isUpdating || isDeleting;

    useEffect(() => {
        if (category) reset({ name: category.name });
    }, [category, reset]);

    if (!isOpen) return null;

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPending) return;
        setConfirmStep(null);
        onClose();
    };

    const handleUpdateConfirm = () => {
        updateCategory({ name: getValues('name') });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="relative bg-white rounded-xl px-6 py-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
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
                        onConfirm={confirmStep === 'update' ? handleUpdateConfirm : () => deleteCategory()}
                    />
                ) : (
                    <form onSubmit={handleSubmit(() => setConfirmStep('update'))}>
                        <h3 className="font-semibold text-lg xs:text-xl text-gray-900 mb-4">Edit this category</h3>
                        <input
                            {...register('name', { required: true })}
                            disabled={isPending}
                            className="w-full border border-gray-200 rounded-md p-3 text-sm disabled:bg-gray-50"
                        />
                        <div className="flex gap-3 mt-8">
                            <button
                                type="button"
                                onClick={() => setConfirmStep('delete')}
                                disabled={isPending}
                                className="flex-1 cursor-pointer border border-black rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base disabled:opacity-50"
                            >
                                Delete
                            </button>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex-1 cursor-pointer bg-primary text-white rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base hover:bg-orange-700 disabled:opacity-50"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}