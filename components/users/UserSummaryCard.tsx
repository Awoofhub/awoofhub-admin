"use client";
import { User } from "@/types/user";

import UserAvatar from "@/components/users/UserAvatar";
import { Mail, MapPin } from "lucide-react";
import { useUserDashboard } from "@/features/dashboard/useUserDashboard";
import { formatHistoryDate } from "@/utils/formatHistoryDateTime";

import UserStatsCard from "./UserStatCard";
import UserActionButton from "./UserActionButton";
import UserStatusBadge from "./UserStatusBadge";

interface UserSummaryCardProps {
  user: User;
}

export default function UserSummaryCard({ user }: UserSummaryCardProps) {
  const { data } = useUserDashboard({ id: user.id });

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 lg:p-6 mb-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div>
          <UserAvatar
            name={user.name}
            profileImageUrl={user.profileImageUrl}
            size={40}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full"
            textClassName="text-2xl"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">
              {user.name}
            </h1>
            <span className="text-sm text-gray-500 font-medium shrink-0">
              @{user.username}
            </span>
            <UserStatusBadge status={user.status} />
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-3 mt-1.5 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center gap-1 min-w-0">
              <Mail size={14} className="shrink-0" />
              <span className="truncate">{user.email}</span>
            </span>

            <span className="flex items-center gap-1 min-w-0">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">
                {user.address || "Address not provided"}
              </span>
            </span>
          </div>

          <p className="mt-2 sm:mt-3 text-gray-700 text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
            {user.bio || "—"}
          </p>

          <p className="mt-1.5 text-xs text-gray-400">
            Joined {formatHistoryDate(user.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 mt-5 mb-5 sm:mb-6 sm:mt-8 items-center justify-center align-middle">
        <UserStatsCard
          label="Offers Posted"
          value={data?.offers?.totalUserOffers ?? 0}
          color="text-gray-900"
        />
        <UserStatsCard
          label="Approved"
          value={data?.offers?.activeUserOffers ?? 0}
          color="text-green-500"
        />
        <UserStatsCard
          label="Rejected"
          value={data?.offers?.rejectedUserOffers ?? 0}
          color="text-red-500"
        />
        <UserStatsCard
          label="Expired"
          value={data?.offers?.expiredUserOffers ?? 0}
          color="text-gray-400"
        />
        <UserStatsCard
          label="Comments"
          value={data?.comments?.totalUserComments ?? 0}
          color="text-gray-900"
        />
      </div>
      <UserActionButton user={user} />
    </div>
  );
}
