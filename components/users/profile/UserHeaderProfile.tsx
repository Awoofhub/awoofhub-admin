// components/users/UserProfileHeader.tsx
"use client";

import { formatDate } from "@/utils/formatDate";
import StatusBadge from "../../common/StatusBadge";
import DropdownMenu from "../../common/DropdownMenu";
import TextareaField from "@/components/common/TextAreaField";
import { User } from "@/types/user";
import UserAvatar from "./UserAvatar";
import { AlertTriangle, Ban } from "lucide-react";
import { useState } from "react";
import { useModerateUser } from "@/features/user/useModerateUser";

interface UserProfileHeaderProps {
  user: User;
  username?: string;
}

export default function UserProfileHeader({ user, username }: UserProfileHeaderProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    action: "suspended" | "banned" | "warn" | null;
  }>({ isOpen: false, action: null });
  const [reason, setReason] = useState("");

  const { mutate: moderateUser, isPending: isModerating } = useModerateUser();

  const confirmModeration = () => {
    if (!modalState.action) return;
    moderateUser(
      { id: user.id, status: modalState.action, reason },
      {
        onSuccess: () => {
          setModalState({ isOpen: false, action: null });
          setReason("");
        },
      }
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl p-6 flex flex-col sm:flex-row items-center sm:gap-6 gap-4">
        <UserAvatar name={user.name} imageUrl={user.profileImageUrl ?? undefined} size="lg" />

        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
              {user.name}
            </h1>
            <StatusBadge label={user.status || "active"} variant="green" size="md" />
            {username && (
              <h2 className="text-xl font-thin text-gray-500 mb-1">@{username}</h2>
            )}

            <div className="ml-auto">
              <DropdownMenu
                items={[
                  {
                    label: "Send warning",
                    icon: AlertTriangle,
                    onClick: () => setModalState({ isOpen: true, action: "warn" }),
                  },
                  {
                    label: "Ban this user",
                    icon: Ban,
                    variant: "danger",
                    onClick: () => setModalState({ isOpen: true, action: "banned" }),
                  },
                ]}
              />
            </div>
          </div>

          <p className="text-gray-500 mb-2 text-sm truncate">
            {user.email} . {user.address}
          </p>

          {user.bio && (
            <p className="text-sm text-gray-500 line-clamp-2 sm:line-clamp-3">
              {user.bio}
            </p>
          )}

          <p className="text-gray-500 mb-2">Joined {formatDate(user.createdAt)}</p>
        </div>
      </div>

      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-150 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2 capitalize">
              {modalState.action} User
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Please provide a reason for this action. This will be logged in their moderation history.
            </p>
            <TextareaField
              value={reason}
              onChange={setReason}
              placeholder={`Reason for ${modalState.action}...`}
              height="h-28"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setModalState({ isOpen: false, action: null });
                  setReason("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmModeration}
                disabled={isModerating || !reason.trim()}
                className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 font-semibold rounded-lg disabled:opacity-50">
                {isModerating ? "Saving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}