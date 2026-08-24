"use client";

import { useUserByUsername } from "@/features/user/useUserByUsername";
import UserProfileHeader from "@/components/user/UserHeaderProfile";
import { useParams } from "next/navigation";
import { useState } from "react";
import UserDetailSkeleton from "@/components/skeleton/UserListSkeleton";
import BackButton from "@/components/button/BackButton";
import UserDashboardCard from "@/components/user/UserDashboardCard";
import { useUserDashboard } from "@/features/dashboard/useUserDashboard";
import Tabs from "@/components/common/Tabs";
import UserModerationTimeline from "@/components/user/UserModerationTimeline";
import { useCommentsByUser } from "@/features/comments/useCommentsByUser";
import { useModerationHistory } from "@/features/moderation/useModerationHistory";
import { useUserOffers } from "@/features/offers/useUserOffer";
import UserCommentList from "@/components/comments/UserCommentList";
import UserOffersList from "@/components/offers/UserOfferList";
import ModerationActions from "@/components/moderation/ModerationActions";

export default function UserDetailPage() {
  const [commentsPage, setCommentsPage] = useState(1);
  const [offersPage, setOffersPage] = useState(1);
  const params = useParams();

  const { data: username, isLoading } = useUserByUsername({
    username: params.username as string,
  });

  const { data: stats, isLoading: isDashboardLoading } = useUserDashboard({
    id: username?.id ?? "",
  });

  const { data: offers, isLoading: offersLoading } = useUserOffers({
    username: username?.username ?? "",
    page: offersPage,
    limit: 8,
  });

  const { data: comments, isLoading: commentsLoading } = useCommentsByUser({
    userId: username?.id ?? "",
    page: commentsPage,
    limit: 8,
  });

  const { data: events, isLoading: historyLoading } = useModerationHistory({
    id: username?.id ?? "",
  });

  if (isLoading)
    return (
      <section className="w-full bg-white px-4 py-8 max-w-360 mx-auto h-[90dvh] md:h-[88dvh]">
        <UserDetailSkeleton />
      </section>
    );
  if (!username)
    return (
      <div className="p-8 text-center text-red-500">Failed to load user.</div>
    );

  return (
    <section className="w-full bg-gray-50 flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
      <div className="py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full flex flex-col h-full">
        <div className="mb-4 shrink-0 flex justify-between items-center">
          <BackButton label="Back" />
        </div>

        <div className="flex-1 overflow-auto pr-2">
          <UserProfileHeader username={username} />
          <div className="mt-3 sm:mt-4">
            {stats && <UserDashboardCard stats={stats} />}
          </div>
          <div className="mt-3 sm:mt-4">
            <ModerationActions
              targetType="user"
              targetId={username.id}
              isBlocked={username.status === "blocked"}
              isSuspended={username.status === "suspended"}
              size="lg"
            />
          </div>

          <Tabs
            tabs={[
              {
                label: "Activity",
                content: (
                  <>
                    <UserOffersList username={username.username} />
                    <div className="space-y-3 sm:space-y-4">
                      <UserCommentList userId={username.id} />
                    </div>
                  </>
                ),
              },
              {
                label: "Admin History",
                content: (
                  <div className="space-y-3 sm:space-y-4">
                    <UserModerationTimeline
                      events={events}
                      isLoading={historyLoading}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
