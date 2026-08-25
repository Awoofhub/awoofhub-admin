// components/user/ModerationActions.tsx
"use client";

import { useState } from "react";
import { useModeration } from "@/features/moderation/useModeration";
import ModerationConfirmModal from "../modals/moderation/ModerationConfirmModal";
import { CreateModerationData, Moderation } from "@/types/moderation";

const SUSPEND_OPTIONS = [1, 7, 14, 30];

function daysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

interface ModerationActionsProps {
  targetType: CreateModerationData["targetType"];
  targetId: string;
  isBlocked: boolean;
  isSuspended: boolean;
  onSuccess?: (moderation: Moderation) => void;
  className?: string;
}

export default function ModerationActions({
  targetType,
  targetId,
  isBlocked,
  isSuspended,
  onSuccess,
  className = "",
}: ModerationActionsProps) {
  const [action, setAction] = useState<CreateModerationData["actionType"] | null>(null);
  const [reason, setReason] = useState("");
  const [suspendDays, setSuspendDays] = useState<number>(7);

  const { submit, isPending, reset } = useModeration({
    onSuccess: (data) => {
      setAction(null);
      setReason("");
      setSuspendDays(7);
      reset();
      onSuccess?.(data);
    },
  });

  const isRestricted = isBlocked || isSuspended;

  const closeModal = () => {
    setAction(null);
    setReason("");
    setSuspendDays(7);
  };

  const confirmBlock = () => {
    submit({ targetType, targetId, actionType: "block", reason: reason.trim() || undefined });
  };

  const confirmSuspend = () => {
    submit({ targetType, targetId, actionType: "suspend", endsAt: daysFromNow(suspendDays) });
  };

  const confirmActivate = () => {
    submit({ targetType, targetId, actionType: "activate" });
  };

  return (
    <>
      <div className={`flex gap-3 ${className}`}>
        {isRestricted ? (
          <>
            <button
              disabled
              className="flex-1 py-2.5 rounded-lg bg-gray-200 text-gray-400 text-sm font-semibold cursor-not-allowed"
            >
              Suspend account
            </button>
            <button
              onClick={() => setAction("activate")}
              className="flex-1 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors"
            >
              Reactivate account
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setAction("block")}
              className="flex-1 py-2.5 rounded-lg border border-red-600 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors"
            >
              Ban account
            </button>
            <button
              onClick={() => setAction("suspend")}
              className="flex-1 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
            >
              Suspend account
            </button>
          </>
        )}
      </div>

      {action === "block" && (
        <ModerationConfirmModal
          variant="danger"
          title="Specify why this is being banned"
          confirmLabel="Ban account"
          reason={reason}
          onReasonChange={setReason}
          onConfirm={confirmBlock}
          onCancel={closeModal}
          isLoading={isPending}
        />
      )}

      {action === "suspend" && (
        <ModerationConfirmModal
          variant="warning"
          title="Confirm that you are about to suspend this account"
          confirmLabel={isPending ? "Saving..." : "Suspend now"}
          onConfirm={confirmSuspend}
          onCancel={closeModal}
          isLoading={isPending}
        >
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-700 mb-2">Duration</p>
            <div className="flex gap-2">
              {SUSPEND_OPTIONS.map((days) => (
                <button
                  key={days}
                  onClick={() => setSuspendDays(days)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                    suspendDays === days
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {days}d
                </button>
              ))}
            </div>
          </div>
        </ModerationConfirmModal>
      )}

      {action === "activate" && (
        <ModerationConfirmModal
          variant="success"
          title="Confirm that you are about to reactivate this account"
          confirmLabel="Reactivate account"
          onConfirm={confirmActivate}
          onCancel={closeModal}
          isLoading={isPending}
        />
      )}
    </>
  );
}