'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { FiX } from 'react-icons/fi';
import { useCreateCategory } from '@/features/category/useCreateCategory';
import Image from 'next/image';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

interface FormValues {
    title: string;
}

export default function AddCategoryModal({ isOpen, onClose }: Props) {
    const [succeeded, setSucceeded] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

    const { createCategory, isPending } = useCreateCategory({
        onSuccess: () => setSucceeded(true),
    });

    if (!isOpen) return null;

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPending) return;
        setSucceeded(false);
        reset();
        onClose();
    };

    const onSubmit = (values: FormValues) => {
        createCategory(values.title);
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

                {succeeded ? (
                    <div className="text-center py-4">
                        <Image src="/approve.png" width={200} height={200} alt='' priority className="mx-auto w-[150px] lg:w-[200px]" />
                        <h3 className="font-bold text-xl xs:text-2xl lg:text-3xl text-gray-900 mb-4">Added Successfully!</h3>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-full cursor-pointer bg-primary text-white rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base hover:bg-orange-700"
                        >
                            Back
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="font-semibold text-lg xs:text-xl text-gray-900 mb-4">Create New Category</h3>
                        <input
                            {...register('title', { required: true, validate: (v) => v.trim().length > 0 })}
                            placeholder="Title"
                            disabled={isPending}
                            className="w-full border border-gray-200 rounded-md p-3 text-sm disabled:bg-gray-50"
                        />
                        {errors.title && (
                            <p className="text-xs text-red-600 mt-1">Category name is required.</p>
                        )}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full cursor-pointer bg-primary text-white rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base mt-4 hover:bg-orange-700 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isPending ? <Loader2 className="animate-spin" size={16} /> : 'Add to Category'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}