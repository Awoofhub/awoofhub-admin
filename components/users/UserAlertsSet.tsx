// components/users/UserAlertsSet.tsx
"use client";

import UserCardListSkeleton from "./UserCardListSkeleton";
import { Bell } from "lucide-react";
import HeaderIconTitleCount from "../common/HeaderIconTitleCount";
import { usePagination } from "@/features/user/usePagination";
import ShowMoreButton from "../common/ShowMoreButton";
import UserAvatar from "./profile/UserAvatar";
import ListRow from "../common/ListRow";
import { Alert } from "@/types/alert";
import PanelCard from "../common/PanelCard";
import EmptyMessage from "../common/EmptyMessage";




interface UserAlertsSetProps {
  alerts: Alert[];
  isLoading?: boolean;
  initialLimit?: number;
  emptyMessage?: string;
}

export default function UserAlertsSet({
  alerts,
  isLoading = false,
  initialLimit = 5,
  emptyMessage = "No alerts set.",
}: UserAlertsSetProps) {
  const { visibleItems: visibleAlerts, hasMore, showMore } = usePagination(alerts, initialLimit);

  if (isLoading) return <UserCardListSkeleton />;

  return (
    <PanelCard>
      <HeaderIconTitleCount label="Alerts Set" count={alerts.length} icon={Bell} iconColor="orange" />

      {alerts.length === 0 ? (
       <EmptyMessage message={emptyMessage} />
      ) : (
        <div className="divide-y divide-gray-100">
          {visibleAlerts.map((a) => (
            <ListRow
              key={a.id}
              leading={<UserAvatar name={a.user.name} imageUrl={a.user.profileImageUrl} size="sm" />}
              title={a.user.name}
              subtitle={`@${a.user.username}`}
            />
          ))}
        </div>
      )}

      <ShowMoreButton visible={hasMore} onClick={showMore} />
    </PanelCard>
  );
}