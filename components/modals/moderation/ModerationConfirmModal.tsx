// components/modals/moderation/ModerationConfirmModal.tsx
"use client";

import Image from "next/image";
import { ReactNode } from "react";

type Variant = "danger" | "warning" | "success";

interface ModerationConfirmModalProps {
  variant: Variant;
  title: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  reason?: string;
  onReasonChange?: (value: string) => void;
  reasonPlaceholder?: string;
  children?: ReactNode;
}

const variantStyles: Record<Variant, { image: string; button: string }> = {
  danger: {
    image: "/reject.png",
    button: "bg-red-600 hover:bg-red-700",
  },
  warning: {
    image: "/suspend.png",
    button: "bg-orange-500 hover:bg-orange-600",
  },
  success: {
    image: "/approve.png",
    button: "bg-green-600 hover:bg-green-700",
  },
};

export default function ModerationConfirmModal({
  variant,
  title,
  confirmLabel,
  onConfirm,
  onCancel,
  isLoading = false,
  reason,
  onReasonChange,
  reasonPlaceholder = "Briefly describe the situation... (optional)",
  children,
}: ModerationConfirmModalProps) {
  const styles = variantStyles[variant];
  const showReasonField = onReasonChange !== undefined;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-150 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-5 relative">
          <Image src={styles.image} alt="" fill className="object-contain" />
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-1">{title}</h2>

        {children && <div className="w-full mt-4">{children}</div>}

        {showReasonField && (
          <div className="w-full mt-4 mb-2 text-left">
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
              Reason (optional)
            </label>
            <textarea
              value={reason ?? ""}
              onChange={(e) => onReasonChange?.(e.target.value)}
              placeholder={reasonPlaceholder}
              className="w-full h-24 rounded-lg border border-gray-200 p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
            />
          </div>
        )}

        <div className="w-full flex flex-col gap-2.5 mt-5">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full py-2.5 rounded-lg text-white text-sm font-semibold transition-colors disabled:opacity-50 ${styles.button}`}
          >
            {isLoading ? "Saving..." : confirmLabel}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}