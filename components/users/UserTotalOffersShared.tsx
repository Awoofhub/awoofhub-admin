import {Share2 } from "lucide-react";
import HeaderIconTitleCount from "../common/HeaderIconTitleCount";
import UserCardListSkeleton from "./UserCardListSkeleton";
import PanelCard from "../common/PanelCard";

export interface TotalSharedOffers {
  totalShares: number;
  sharesToday: number;
}

interface UserTotalSharedOffersProps {
  stats: TotalSharedOffers | null;
  isLoading?: boolean;
}

export default function UserTotalSharedOffers({
  stats,
  isLoading = false,
}: UserTotalSharedOffersProps) {
  if (isLoading) {
    return (
     <UserCardListSkeleton/>
    );
  }

  const totalShares = stats?.totalShares ?? 0;
  const sharesToday = stats?.sharesToday ?? 0;

  return (
    <PanelCard >
      <HeaderIconTitleCount label="Total Shares" icon={Share2} iconColor="orange"/>
      <div className="text-2xl font-bold text-gray-900">{totalShares}</div>
      <p className="text-xs text-gray-400 mt-1">
        {sharesToday > 0
          ? `${sharesToday} share${sharesToday === 1 ? "" : "s"} sent today`
          : "No shares sent b4 today"}
      </p>
    </PanelCard>
  );
}