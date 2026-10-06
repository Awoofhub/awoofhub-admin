"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { useUserByUsername } from "@/features/user/useUserByUsername";
import UserSummaryCard from "@/components/users/UserSummaryCard";
import UserTabs from "@/components/users/UserTabs";
import UserActivityList from "@/components/users/UserActivityList";
import UserHistoryTimeline from "@/components/users/UserHistoryTimeline";
import { use, useState } from "react";
import UserDetailSkeleton from "@/components/users/UserDetailSkeleton";

interface Props {
  params: Promise<{ username: string }>;
}

export default function UserDetailPage({ params }: Props) {
  
  const { username } = use(params);

  const { data: user, isLoading } = useUserByUsername({
    username,
  });

  const [tab, setTab] = useState<"activity" | "history">("activity", );
  const router = useRouter();

  if (isLoading) {
    return <UserDetailSkeleton />;
  }

  if (!user) {
    return (
      <div className="text-center text-gray-400 py-8 text-sm">
        User not found.
      </div>
    );
  }

  return (
    <div className="pt-6 pb-10 px-3 xs:px-4 max-w-[1440px] mx-auto w-full">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm xs:text-lg font-baloo font-semibold mb-4"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <UserSummaryCard user={user} />

      <UserTabs activeTab={tab} onChange={setTab} />

      {tab === "activity" ? <UserActivityList user={user} />  : <UserHistoryTimeline user={user} />}
    </div>);
    
}
