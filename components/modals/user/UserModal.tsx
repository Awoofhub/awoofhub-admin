"use client"

import { useState } from 'react';
import { Ban, CircleX, Loader2 } from 'lucide-react';
import { useModeration } from '@/features/moderation/useModeration';
import { User } from '@/types/user';

interface Props {
    userId: string;
    status: User["status"];
    isOpen: boolean;
    onClose: () => void;
    anchorRect: DOMRect | null;
}

export default function UserModal({ userId, status, isOpen, onClose, anchorRect }: Props) {
    const [pendingAction, setPendingAction] = useState<'suspend' | 'block' | null>(null);
    const { submit, isPending } = useModeration({ onSuccess: onClose });

    if (!isOpen || !anchorRect) return null;

    const handleAction = (actionType: 'suspend' | 'block') => {
        setPendingAction(actionType);
        submit({ targetType: 'user', targetId: userId, actionType });
    };

    const isDisabled = status !== 'active';
    const style: React.CSSProperties = {
        top: anchorRect.bottom + 8,
        right: window.innerWidth - anchorRect.right,
    };

    return (
        <>
            <div
                className="fixed inset-0 z-40"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            />
            <div
                className="fixed z-50 bg-white rounded-xl shadow-lg w-40 overflow-hidden"
                style={style}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    disabled={isDisabled || isPending}
                    onClick={() => handleAction('suspend')}
                    className="w-full flex items-center gap-2 px-5 py-4 text-primary cursor-pointer font-baloo font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending && pendingAction === 'suspend' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Ban className="w-4 h-4" />
                    )}
                    Suspend User
                </button>
                <div className="border-t border-gray-200" />
                <button
                    type="button"
                    disabled={isDisabled || isPending}
                    onClick={() => handleAction('block')}
                    className="w-full flex items-center gap-2 px-5 py-4 text-red-600 cursor-pointer font-baloo font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending && pendingAction === 'block' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <CircleX className="w-4 h-4" />
                    )}
                    Ban User
                </button>
            </div>
        </>
    );
}