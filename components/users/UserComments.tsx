"use client";

import { Comment } from "@/types/comment";
import { formatDate } from "@/utils/formatDate";
import UserCardListSkeleton from "./UserCardListSkeleton";
import { MessageSquare } from "lucide-react";
import HeaderIconTitleCount from "../common/HeaderIconTitleCount";
import UserAvatar from "./profile/UserAvatar";
import ShowMoreButton from "../common/ShowMoreButton";
import { usePagination } from "@/features/user/usePagination";
import PanelCard from "../common/PanelCard";
import EmptyMessage from "../common/EmptyMessage";

interface UserCommentsProps {
  comments: Comment[];
  isLoading?: boolean;
  initialLimit?: number;
  emptyMessage?: string;
}

export default function UserComments({
  comments,
  isLoading = false,
  initialLimit = 5,
  emptyMessage = "No comments yet.",
}: UserCommentsProps) {
  const { visibleItems: visibleComments, hasMore, showMore } = usePagination(comments, initialLimit);

  if (isLoading) return <UserCardListSkeleton />;

  return (
    <PanelCard>
      <HeaderIconTitleCount
        label="Comments"
        count={comments.length}
        icon={MessageSquare}
        iconColor="orange"
      />

      {comments.length === 0 ? (
        <EmptyMessage message={emptyMessage}/>
      ) : (
        <div className="divide-y divide-gray-100">
          {visibleComments.map((c) => (
            <div key={c.id} className="flex items-start gap-3 py-3 min-w-0">
              <UserAvatar name={c.user.name} imageUrl={c.user.profileImageUrl} size="sm" />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{c.user.name}</p>
                <p className="text-sm text-gray-700 line-clamp-2">{c.comment}</p>
                <p className="text-xs text-gray-400 mt-1 truncate">
                  on {c.offer.title} · {formatDate(c.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <ShowMoreButton visible={hasMore} onClick={showMore} />
    </PanelCard>
  );
}