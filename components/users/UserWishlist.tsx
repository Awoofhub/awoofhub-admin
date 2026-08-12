"use client";

import { formatDate } from "@/utils/formatDate";
import UserCardListSkeleton from "./UserCardListSkeleton";
import { Heart } from "lucide-react";
import HeaderIconTitleCount from "../common/HeaderIconTitleCount";
import { usePagination } from "@/features/user/usePagination";
import ShowMoreButton from "../common/ShowMoreButton";
import ListRow from "../common/ListRow";
import Thumbnail from "../common/Thumbnail";
import { Wishlist } from "@/types/wishlist";
import PanelCard from "../common/PanelCard";




interface UserWishlistProps {
  items: Wishlist[];
  isLoading?: boolean;
  initialLimit?: number;
}

export default function UserWishlist({
  items,
  isLoading = false,
  initialLimit = 5,
}: UserWishlistProps) {
  const { visibleItems, hasMore, showMore } = usePagination(items, initialLimit);

  if (isLoading) return <UserCardListSkeleton />;

  return (
    <PanelCard>
      <HeaderIconTitleCount label="Wishlist" count={items.length} icon={Heart} iconColor="orange" />

      {items.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">
          No items in wishlist.
        </p>
      ) : (
        <div className="divide-y divide-gray-100">
          {visibleItems.map((w) => (
            <ListRow
              key={w.id}
              leading={
                <Thumbnail
                  imageUrl={w.offer.imageUrl}
                  alt={w.offer.title}
                  rounded="lg"
                  fallback={<span className="text-xs">N/A</span>}
                />
              }
              title={w.offer.title}
              subtitle={`${w.offer.category?.name ?? "Uncategorized"} · Saved ${formatDate(w.savedAt)}`}
            />
          ))}
        </div>
      )}

      <ShowMoreButton visible={hasMore} onClick={showMore} />
    </PanelCard>
  );
}