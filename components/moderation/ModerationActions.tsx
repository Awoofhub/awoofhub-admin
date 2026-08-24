// components/user/ModerationActions.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useModeration } from "@/features/moderation/useModeration";
import { Moderation } from "@/types/moderation";

const SUSPEND_OPTIONS = [1, 7, 14, 30];

type TargetType = "user" | "offer" | "comment";
type Size = "sm" | "md" | "lg";

interface ModerationActionsProps {
  targetType: TargetType;
  targetId: string;
  isBlocked: boolean;
  isSuspended: boolean;
  size?: Size;
  reason?: string;
  onSuccess?: (moderation: Moderation) => void;
  className?: string;
}

const sizeClasses: Record<Size, { button: string; text: string; gap: string; menuItem: string }> = {
  sm: { button: "py-1.5 px-3", text: "text-xs", gap: "gap-2", menuItem: "px-3 py-1.5 text-xs" },
  md: { button: "py-2.5", text: "text-sm", gap: "gap-3", menuItem: "px-4 py-2 text-sm" },
  lg: { button: "py-3", text: "text-base", gap: "gap-4", menuItem: "px-4 py-2.5 text-base" },
};

function daysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export default function ModerationActions({
  targetType,
  targetId,
  isBlocked,
  isSuspended,
  size = "md",
  reason,
  onSuccess,
  className = "",
}: ModerationActionsProps) {
  const [showSuspendMenu, setShowSuspendMenu] = useState(false);
  const { submit, isPending } = useModeration({ onSuccess });
  const sc = sizeClasses[size];

  const handleBlock = () => {
    submit({ targetType, targetId, actionType: "block", reason });
  };

  const handleSuspend = (days: number) => {
    submit({
      targetType,
      targetId,
      actionType: "suspend",
      endsAt: daysFromNow(days),
      reason,
    });
    setShowSuspendMenu(false);
  };

  const handleActivate = () => {
    submit({ targetType, targetId, actionType: "activate", reason });
  };

  const isRestricted = isBlocked || isSuspended;

  return (
    <div className={`flex ${sc.gap} ${className}`}>
      <button
        onClick={handleBlock}
        disabled={isPending || isBlocked}
        className={`flex-1 ${sc.button} ${sc.text} rounded-lg border border-red-600 text-red-600 font-semibold hover:bg-red-50 transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed`}
      >
        {isPending ? "Banning..." : "Ban account"}
      </button>

      <div className="relative flex-1">
        <button
          onClick={() => setShowSuspendMenu((v) => !v)}
          disabled={isPending || isBlocked}
          className={`w-full ${sc.button} ${sc.text} rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:hover:bg-orange-500 disabled:cursor-not-allowed flex items-center justify-center gap-1`}
        >
          {isPending ? "Suspending..." : "Suspend account"}
          <ChevronDown size={size === "sm" ? 14 : 16} />
        </button>

        {showSuspendMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowSuspendMenu(false)}
            />
            <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
              {SUSPEND_OPTIONS.map((days) => (
                <button
                  key={days}
                  onClick={() => handleSuspend(days)}
                  className={`w-full text-left ${sc.menuItem} text-gray-700 hover:bg-gray-50`}
                >
                  {days} {days === 1 ? "day" : "days"}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {isRestricted && (
        <button
          onClick={handleActivate}
          disabled={isPending}
          className={`flex-1 ${sc.button} ${sc.text} rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50`}
        >
          {isPending ? "Reactivating..." : "Reactivate account"}
        </button>
      )}
    </div>
  );
}