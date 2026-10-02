"use client";

import { User } from "@/types/user";
import { useModerationHistory } from "@/features/moderation/useModerationHistory";
import {UserModerationActionIcon,userModerationActionLabel,} from "./UserModerationHistoryIcons";
import { formatHistoryDateTime } from "@/utils/formatHistoryDateTime";
import { CircleCheckBig } from "lucide-react";

interface UserHistoryTimelineProps {
  user: User;
}

export default function UserHistoryTimeline({ user }: UserHistoryTimelineProps) {
  const { data: history } = useModerationHistory({ id: user.id });

  const items = [
    ...(history ?? []).map((entry) => ({
      key: entry.id,
      icon: <UserModerationActionIcon actionType={entry.actionType} />,
      title: (
        <>
          <span className="font-baloo font-semibold text-black text-sm xs:text-lg">{userModerationActionLabel(entry.actionType)}{" "}</span>
          <span className="font-medium text-xs xs:text-base text-black"> by {entry.admin?.name}
          </span>
          {" · "}
          <span className="text-muted font-medium text-[10px] xs:text-sm">{formatHistoryDateTime(entry.createdAt)}</span>
        </>
      ),
      subtitle: entry.actionType === "activate" ? "Account activated" : entry.reason,
    })),
    {
      key: "created",
      icon: (
        <div className="bg-[#006400]/10 p-2 lg:p-3 rounded-full">
          <CircleCheckBig size={18} className="text-[#006400] shrink-0" />
        </div>
      ),
      title: (
        <>
          <span className="font-baloo font-semibold text-black text-sm xs:text-lg">
            User Created{" "}
          </span>
          {" · "}
          <span className="text-muted font-medium text-[10px] xs:text-sm">
            {formatHistoryDateTime(user.createdAt)}
          </span>
        </>
      ),
      subtitle: `By ${user.name}`,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="font-semibold text-gray-900 uppercase text-sm xs:text-base lg:text-lg mb-4">
        Status History
      </h3>

      
        <div>
          {items.map((item, id) => (
            <div key={item.key} className="flex gap-3">
              <div className="flex flex-col items-center">
                {item.icon}
                {id < items.length - 1 && (
                  <div className="w-px flex-1 min-h-8 bg-primary/60 my-1" />
                )}
              </div>
              <div className={id < items.length - 1 ? "pb-6" : ""}>
                <p>{item.title}</p>
                {item.subtitle && (
                  <p className="text-xs xs:text-sm lg:text-base text-muted mt-1">{item.subtitle} </p>)}
              </div>
            </div>
          ))}
        </div>
      
    </div>
  );
}
