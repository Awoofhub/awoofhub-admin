"use client";

import React, { useState, useEffect } from "react";
import { X, ShieldAlert, AlertCircle } from "lucide-react";
import { useDeleteComment } from "@/features/comments/useDeleteComment";

interface CommentModerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  commentId: string;
  commentText?: string;
  onSubmitSuccess?: () => void;
}

type ActionType = "delete";

export default function CommentModerationModal({
  isOpen,
  onClose,
  commentId,
  commentText = "",
  onSubmitSuccess,
}: CommentModerationModalProps) {
  const { mutate: deleteComment, isPending } = useDeleteComment();

  const [actionType, setActionType] = useState<ActionType>("delete");
  const [reason, setReason] = useState("");
  const [reportId, setReportId] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Reset fields when modal is opened/closed
  useEffect(() => {
    if (isOpen) {
      setActionType("delete");
      setReason("");
      setReportId("");
      setEndsAt("");
      setErrorMsg("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!reason.trim()) {
      setErrorMsg("Reason is required.");
      return;
    }



    const payload = {
      targetType: "comment" as const,
      targetId: commentId,
      actionType,
      reason: reason.trim(),
      endsAt: endsAt ? new Date(endsAt).toISOString() : null,
      reportId: reportId.trim(),
    };

    deleteComment(payload, {
      onSuccess: () => {
        onClose();
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[150] p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-red-600">
            <ShieldAlert className="w-5 h-5" />
            <h2 className="text-lg font-bold text-slate-800">Moderate Comment</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {commentText && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-sm text-slate-600">
              <span className="font-semibold block text-slate-700 mb-1">Comment Preview:</span>
              <p className="italic line-clamp-3">"{commentText}"</p>
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2.5 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Type */}
          <div className="space-y-1">
            <label htmlFor="mod-action-type" className="block text-sm font-semibold text-slate-700">
              Action Type
            </label>
            <select
              id="mod-action-type"
              value={actionType}
              disabled
              onChange={(e) => setActionType(e.target.value as ActionType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm transition-shadow"
            >
              <option value="delete">Delete/Remove</option>
            </select>
          </div>

          {/* Reason */}
          <div className="space-y-1">
            <label htmlFor="mod-reason" className="block text-sm font-semibold text-slate-700">
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              id="mod-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide a detailed reason for this moderation action..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm transition-shadow resize-none"
              required
            />
          </div>

          {/* Report ID */}
          <div className="space-y-1">
            <label htmlFor="mod-report-id" className="block text-sm font-semibold text-slate-700">
              Report ID (Optional)
            </label>
            <input
              id="mod-report-id"
              type="text"
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              placeholder="e.g. 550e8400-e29b-41d4-a716-446655440999"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm transition-shadow"
            />
          </div>

          {/* Ends At (Conditional) */}


          {/* Buttons */}
          <div className="pt-4 border-t border-gray-200 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Processing..." : "Confirm Action"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
