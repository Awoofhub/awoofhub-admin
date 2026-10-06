"use client";

import { User } from "@/types/user";
import { useState } from "react";

import PaginationButtons from "@/components/button/PaginationButtons";
import { useCommentsByUser } from "@/features/comments/useCommentsByUser";
import { useOffersByUser } from "@/features/offers/useOffersByUser";
import { TbFileCheckFilled, TbMessageCircle } from "react-icons/tb";
import UserCommentListItem from "./UserCommentListItem";
import UserCommentListItemSkeleton from "./UserCommentListItemSkeleton";
import UserOfferListItem from "./UserOfferListItem";
import UserOfferListItemSkeleton from "./UserOfferlistitemskeleton";

interface UserActivityListProps {
  user: User;
}

export default function UserActivityList({ user }: UserActivityListProps) {
  const [offersPage, setOffersPage] = useState(1);
  const [commentsPage, setCommentsPage] = useState(1);

  const { data: offersData, isFetching: offersFetching } = useOffersByUser({
    userId: user.id,
    page: offersPage,
    limit: 3,
  });

  const { data: commentsData, isFetching: commentsFetching } = useCommentsByUser({
    userId: user.id,
    page: commentsPage,
    limit: 3,
  });

  const offers = offersData?.data ?? [];
  const comments = commentsData?.data ?? [];

  const offersTotalPages = offersData?.meta?.totalPages ?? 1;
  const commentsTotalPages = commentsData?.meta?.totalPages ?? 1;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <TbFileCheckFilled className="w-4 h-4 text-orange-500" />
          Offers Posted
        </h2>

        {offersFetching &&  <UserOfferListItemSkeleton />} 
        {!offersFetching && offers.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-4">
            No offers posted yet.
          </p>
        ) }
        { !offersFetching && offers.length > 0 && (
          offers.map((offer) => (
            <UserOfferListItem key={offer.id} offer={offer} />
          ))
        )}

        {offersTotalPages > 1 && (
          <PaginationButtons
            currentPage={offersPage}
            totalPages={offersTotalPages}
            onPageChange={setOffersPage}
          />
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <TbMessageCircle className="w-4 h-4 text-orange-500" />
          Comments
        </h2>

        {commentsFetching &&  <UserCommentListItemSkeleton />} 
        {!commentsFetching && comments.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-4">
            No comments yet.
          </p>
        ) }
        { !commentsFetching && comments.length > 0 && (
          comments.map((comment) => (
            <UserCommentListItem key={comment.id} comment={comment} />
          ))
        )}

        {commentsTotalPages > 1 && (
          <PaginationButtons
            currentPage={commentsPage}
            totalPages={commentsTotalPages}
            onPageChange={setCommentsPage}
          />
        )}
      </div>
    </div>
  );
}
