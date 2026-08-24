"use client";

import { useUserOffers } from "@/features/offers/useUserOffer";
import { useState } from "react";
import PaginatedList from "../list/PaginatedList";
import ListRow from "../common/ListRow";
import Thumbnail from "../common/Thumbnail";
import StatusBadge from "../button/StatusBadge";
import { formatDate } from "@/utils/formatDate";
import { Offer } from "@/types/offer";

interface Props {
  username: string;
}

type ModerationStatus = Offer["status"];
const moderationVariant: Record<
  ModerationStatus,
  { variant: "green" | "gray" | "red" | "orange"; label: string }> = {
  approved: { variant: "green", label: "Approved" },
  pending: { variant: "gray", label: "Pending" },
  rejected: { variant: "red", label: "Rejected" },
  suspended: { variant: "orange", label: "Suspended" },
};

export default function UserOffersList({ username }: Props) {
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data: offers, isFetched, isFetching } = useUserOffers({
    username,
    page,
    limit,
  });

  return (
    <PaginatedList
      response={offers}
      limit={limit}
      rowKey={(offer) => offer.id}
      currentPage={page}
      onPageChange={setPage}
      renderItem={{
        key: "id",
        render: (offer) => (
          <ListRow
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
            trailing={<StatusBadge {...moderationVariant[offer.status]} />}
          />
        ),
      }}
      isFetching={isFetching}
      isFetched={isFetched}
      title="OFFERS POSTED"
    />
  );
}