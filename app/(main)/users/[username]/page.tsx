"use client";

import { useParams } from "next/navigation";
import { useUserById } from "@/features/user/useUserById";
import OfferDetailSkeleton from "@/components/offers/OfferDetailsSkeleton";
import UserProfileHeader from "@/components/users/profile/UserHeaderProfile";
import UserStatCard from "@/components/users/profile/UserStatCard";
import { useUserOffers } from "@/features/user/useUserOffer";
import UserOffersList from "@/components/users/UserOffersList";
import UserComments from "@/components/users/UserComments";
import Tabs from "@/components/common/Tabs";
import BackButton from "@/components/common/BackButton";
import UserModerationTimeline from "@/components/users/profile/UserModerationTimeline";

import { useUserComments } from "@/features/comments/useUserComment";
import { useModerationHistory } from "@/features/user/useModerationHistory";

export default function UserDetailPage() {
  const params = useParams();
  const { data: user, isLoading } = useUserById({ id: params.id as string });
    const {
    offers,
    stats,
    isLoading: offersLoading,
  } = useUserOffers(user?.username ?? "");

  const { comments, isLoading: commentsLoading } = useUserComments(user?.id ?? "");
    const { events, isLoading: historyLoading } = useModerationHistory(user?.id ?? "");

  if (isLoading)
    return (
      <section className="w-full bg-white px-4 py-8 max-w-360 mx-auto h-[90dvh] md:h-[88dvh]">
        <OfferDetailSkeleton />
      </section>
    );
  if (!user)
    return (
      <div className="p-8 text-center text-red-500">Failed to load user.</div>
    );


  const rejectedOffers = offers.filter(
    (o) => o.moderationStatus === "rejected",
  );

  return (
    <section className="w-full bg-gray-50 flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
      <div className="py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full flex flex-col h-full">
        <div className="mb-4 shrink-0 flex justify-between items-center">
          <BackButton label="Back to Users" />
        </div>

        <div className="flex-1 overflow-auto pr-2">
         <UserProfileHeader user={user} username={user.username} />

          <div className="mt-3 sm:mt-4">
            {stats && <UserStatCard stats={stats} />}
          </div>

          <Tabs
            tabs={[
              {
                label: "Activity",
                content: (
                  <>
                    <UserOffersList
                      offers={offers}
                      isLoading={offersLoading}
                      initialLimit={6}
                    />
                    <div className="space-y-3 sm:space-y-4">
                      <UserComments
                        comments={comments}
                        isLoading={commentsLoading}
                      />
                    </div>
                  </>
                ),
              },
              {
                label: "Admin History",
                content: (
                  <div className="space-y-3 sm:space-y-4">
                    <UserModerationTimeline events={events} isLoading={historyLoading} />
                    <UserOffersList
                      offers={rejectedOffers}
                      label="Rejected Offers"
                      emptyMessage="No rejected offers from this user."
                      initialLimit={5}
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