// components/users/UserProfileHeader.tsx
"use client";

import { formatDate } from "@/utils/formatDate";
import StatusBadge from "../button/StatusBadge";
import { User } from "@/types/user";
import UserAvatar from "./UserAvatar";

interface UserProfileHeaderProps {
  username: User;
}

export default function UserProfileHeader({ username }: UserProfileHeaderProps) {
  const isBlocked = username.status === "blocked";
  const isSuspended = username.status === "suspended";

  return (
    <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-center sm:gap-6 gap-4">
        <UserAvatar name={username.name} imageUrl={username.profileImageUrl ?? undefined} size="lg" />

        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
              {username.name}
            </h1>
            <StatusBadge
              label={isBlocked ? "Banned" : isSuspended ? "Suspended" : username.role || "active"}
              variant={isBlocked ? "red" : isSuspended ? "orange" : "green"}
              size="md"
            />
            <h2 className="text-xl font-thin text-gray-500 mb-1">@{username.name}</h2>
          </div>

          <p className="text-gray-500 mb-2 text-sm truncate">
            {username.email} . {username.address}
          </p>

          {username.bio && (
            <p className="text-sm text-gray-500 line-clamp-2 sm:line-clamp-3">
              {username.bio}
            </p>
          )}

          <p className="text-gray-500 mb-2">Joined {formatDate(username.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}