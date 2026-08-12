// components/users/UserOffersList.tsx
"use client";

import { formatDate } from "@/utils/formatDate";
import UserCardListSkeleton from "@/components/users/UserCardListSkeleton";
import HeaderIconTitleCount from "../common/HeaderIconTitleCount";
import { usePagination } from "@/features/user/usePagination";
import ShowMoreButton from "../common/ShowMoreButton";
import ListRow from "../common/ListRow";
import Thumbnail from "../common/Thumbnail";
import StatusBadge from "../common/StatusBadge";
import { Offer } from "@/types/offer";
import PanelCard from "../common/PanelCard";
import EmptyMessage from "../common/EmptyMessage";

interface UserOffersListProps {
  offers: Offer[];
  isLoading?: boolean;
  initialLimit?: number;
  label?: string;
  emptyMessage?: string;
}

type ModerationStatus = Offer["moderationStatus"];
const moderationVariant: Record<
  ModerationStatus,
  { variant: "green" | "gray" | "red" | "orange"; label: string }
> = {
  approved: { variant: "green", label: "Approved" },
  pending: { variant: "gray", label: "Pending" },
  rejected: { variant: "red", label: "Rejected" },
  suspended: { variant: "orange", label: "Suspended" },
  expired: { variant: "gray", label: "Expired" },
};

export default function UserOffersList({
  offers,
  isLoading = false,
  initialLimit = 6,
  label = "Offers Posted",
  emptyMessage = "No offers posted yet.",
}: UserOffersListProps) {
  const {
    visibleItems: visibleOffers,
    hasMore,
    showMore,
  } = usePagination(offers, initialLimit);

  if (isLoading) return <UserCardListSkeleton />;

  return (
    <PanelCard>
      <HeaderIconTitleCount label={label} count={offers.length} />

      {offers.length === 0 ? (
      <EmptyMessage message={emptyMessage} />
      ) : (
        <div className="divide-y divide-gray-100">
          {visibleOffers.map((offer) => (
            <ListRow
              key={offer.id}
              leading={
                <Thumbnail
                  imageUrl={offer.imageUrl}
                  alt={offer.title}
                  rounded="lg"
                  fallback={<span className="text-xs">N/A</span>}
                />
              }
              title={offer.title}
              subtitle={`${offer.category?.name ?? "Uncategorized"} · Posted ${formatDate(offer.createdAt)}`}
              trailing={
                <StatusBadge {...moderationVariant[offer.moderationStatus]} />
              }
            />
          ))}
        </div>
      )}

      <ShowMoreButton visible={hasMore} onClick={showMore} />
    </PanelCard>
  );
}
