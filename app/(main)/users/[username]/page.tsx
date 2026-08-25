"use client";

import { useUserByUsername } from "@/features/user/useUserByUsername";
import UserProfileHeader from "@/components/user/UserHeaderProfile";
import { useParams } from "next/navigation";
import UserDetailSkeleton from "@/components/skeleton/UserListSkeleton";
import BackButton from "@/components/button/BackButton";
import Tabs from "@/components/common/Tabs";
import UserModerationTimeline from "@/components/user/UserModerationTimeline";
import UserCommentList from "@/components/comments/UserCommentList";
import UserOffersList from "@/components/offers/UserOfferList";

export default function UserDetailPage() {
  const params = useParams();
  const { data: username, isLoading } = useUserByUsername({
    username: params.username as string,
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
          <UserProfileHeader username={username}/>
          
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
                     userId={username.id}
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
