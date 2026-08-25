
"use client";

import { CheckCircle, XCircle, PauseCircle, Ban, AlertTriangle } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import HeaderIconTitleCount from "../common/HeaderIconTitleCount";
import UserDetailSkeleton from "../skeleton/UserListSkeleton";
import EmptyMessage from "@/components/common/EmptyMessage";
import { useModerationHistory } from "@/features/moderation/useModerationHistory";
import { Moderation } from "@/types/moderation";

interface UserModerationTimelineProps {
  userId: string;
  emptyMessage?: string;
}

type ActionType = Moderation["actionType"] | "approved" | "rejected";

const actionStyles: Record<
  string,
  { icon: typeof CheckCircle; iconColor: string; bg: string; label: string }
> = {
  approved: { icon: CheckCircle, iconColor: "text-green-600", bg: "bg-green-100", label: "Approved" },
  rejected: { icon: XCircle, iconColor: "text-red-600", bg: "bg-red-100", label: "Rejected" },
  suspend: { icon: PauseCircle, iconColor: "text-orange-500", bg: "bg-orange-100", label: "Suspended" },
  block: { icon: Ban, iconColor: "text-red-600", bg: "bg-red-100", label: "Banned" },
  activate: { icon: CheckCircle, iconColor: "text-green-600", bg: "bg-green-100", label: "Reactivated" },
  warning: { icon: AlertTriangle, iconColor: "text-orange-500", bg: "bg-orange-100", label: "Warned" },
  delete: { icon: XCircle, iconColor: "text-red-600", bg: "bg-red-100", label: "Deleted" },
};
export default function UserModerationTimeline({
  userId,
  emptyMessage = "No moderation events yet.",
}: UserModerationTimelineProps) {
  const { data: events = [], isLoading } = useModerationHistory({ id: userId });

  if (isLoading) return <UserDetailSkeleton />;

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5">
      <HeaderIconTitleCount label="Moderation Timeline" />

      {events.length === 0 ? (
        <EmptyMessage message={emptyMessage} />
      ) : (
        <div className="mt-4">
          {events.map((e, index) => {
            const style = actionStyles[e.actionType] ?? actionStyles.warning;
            const Icon = style.icon;
            const isLast = index === events.length - 1;

            return (
              <div key={e.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 shrink-0 rounded-full ${style.bg} flex items-center justify-center`}>
                    <Icon size={18} className={style.iconColor} />
                  </div>
                  {!isLast && <div className="w-px flex-1 bg-gray-200 my-1" />}
                </div>

                <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-6"}`}>
                  <p className="text-sm text-gray-900">
                    <span className="font-bold">{style.label}</span>
                    {" by "}
                    <span className="font-semibold">{e.admin?.name ?? "Admin"}</span>
                    <span className="text-gray-400"> · </span>
                    <span className="text-gray-400">{formatDate(e.createdAt)}</span>
                  </p>
                  {e.reason && (
                    <p className="text-sm text-gray-500 mt-0.5">{e.reason}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}