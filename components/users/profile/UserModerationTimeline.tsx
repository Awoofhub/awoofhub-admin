// components/users/UserModerationTimeline.tsx
"use client";

import { AlertTriangle } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import HeaderIconTitleCount from "../../common/HeaderIconTitleCount";
import ListRow from "../../common/ListRow";
import ShowMoreButton from "../../common/ShowMoreButton";
import UserCardListSkeleton from "../UserCardListSkeleton";
import { usePagination } from "@/features/user/usePagination";
import EmptyMessage from "@/components/common/EmptyMessage";
import { Moderation } from "@/types/moderation";

interface UserModerationTimelineProps {
  events: Moderation[];
  isLoading?: boolean;
  initialLimit?: number;
  emptyMessage?: string;
}

export default function UserModerationTimeline({
  events,
  isLoading = false,
  initialLimit = 5,
  emptyMessage = "No moderation events yet.",
}: UserModerationTimelineProps) {
  const { visibleItems: visibleEvents, hasMore, showMore } = usePagination(events, initialLimit);

  if (isLoading) return <UserCardListSkeleton />;

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5">
      <HeaderIconTitleCount label="Moderation Timeline" />

      {events.length === 0 ? (
        <EmptyMessage message={emptyMessage} />
      ) : (
        <div className="divide-y divide-gray-100">
          {visibleEvents.map((e) => (
            <ListRow
              key={e.id}
              leading={
                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-orange-500" />
                </div>
              }
              title={`${e.actionType} by ${e.admin}`}
              subtitle={e.reason}
              trailing={
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {formatDate(e.createdAt)}
                </span>
              }
            />
          ))}
        </div>
      )}

      <ShowMoreButton visible={hasMore} onClick={showMore} />
    </div>
  );
}