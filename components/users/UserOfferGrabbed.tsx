// components/users/panels/UserOffersGrabbed.tsx
"use client";

import { formatDate } from "@/utils/formatDate";
import UserCardListSkeleton from "./UserCardListSkeleton";
import { Offer } from "@/types/offer";
import { ShoppingBag } from "lucide-react";
import HeaderIconTitleCount from "../common/HeaderIconTitleCount";
import { usePagination } from "@/features/user/usePagination";
import ShowMoreButton from "../common/ShowMoreButton";
import ListRow from "../common/ListRow";
import Thumbnail from "../common/Thumbnail";
import PanelCard from "../common/PanelCard";
import EmptyMessage from "../common/EmptyMessage";

export interface GrabbedOffer {
  id: string;
  user: {
    id: string;
    name: string;
    profileImageUrl: string;
  };
  offer: Offer;
  grabbedAt: string;
}

interface UserOffersGrabbedProps {
  offers: GrabbedOffer[];
  isLoading?: boolean;
  initialLimit?: number;
  emptyMessage?: string;
}

export default function UserOffersGrabbed({
  offers,
  isLoading = false,
  initialLimit = 5,
  emptyMessage = "No offers grabbed yet.",
}: UserOffersGrabbedProps) {
  const {
    visibleItems: visibleOffers,
    hasMore,
    showMore,
  } = usePagination(offers, initialLimit);

  if (isLoading) return <UserCardListSkeleton />;

  return (
    <PanelCard>
      <HeaderIconTitleCount label="Offers Grabbed" count={offers.length} icon={ShoppingBag} iconColor="orange" />

      {offers.length === 0 ? (
        <EmptyMessage message={emptyMessage} />
      ) : (
        <div className="divide-y divide-gray-100">
          {visibleOffers.map((g) => (
            <ListRow
              key={g.id}
              leading={
                <Thumbnail
                  imageUrl={g.offer.imageUrl}
                  alt={g.offer.title}
                  rounded="lg"
                  fallback={<span className="text-xs">N/A</span>}
                />
              }
              title={g.offer.title}
              subtitle={`${g.offer.category?.name ?? "Uncategorized"} · Grabbed ${formatDate(g.grabbedAt)}`}
            />
          ))}
        </div>
      )}

      <ShowMoreButton visible={hasMore} onClick={showMore} />
    </PanelCard>
  );
}