'use client';

import PaginationButtons from '@/components/button/PaginationButtons';
import ContributorAvatar from '@/components/offer/ContributorAvatar';
import { useCommentsForOffer } from '@/features/comments/useCommentsForOffer';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import { useState } from 'react';


interface Props {
    offerId: string;
}

export default function OfferComments({ offerId }: Props) {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useCommentsForOffer({ id: offerId, page, limit: 3 });
    const comments = data?.data ?? [];
    const totalPages = data?.meta?.totalPages ?? 1;

    return (
        <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 uppercase text-sm xs:text-base lg:text-lg mb-4">Comments</h3>
            {!isLoading && comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center pt-2 pb-6">
                    <p className="text-sm xs:text-base font-semibold text-gray-700">No comments yet</p>
                    <p className="text-xs text-gray-400 mt-1">Comments on this offer will show up here.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-center gap-3">
                            <ContributorAvatar
                                name={comment.user.name}
                                profileImageUrl={comment.user.profileImageUrl}
                                size={50}
                                className="w-7.5 h-7.5 xs:w-10 xs:h-10 lg:w-12.5 lg:h-12.5"
                                textClassName="text-xs xs:text-base lg:text-xl"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1 items-center">
                                        <span className="font-semibold font-baloo text-xs xs:text-base text-muted">{comment.user.name}</span>
                                        <span className="font-medium text-[10px] xs:text-xs text-muted">@{comment.user.username}</span>
                                    </div>
                                    <span className="text-[10px] xs:text-xs text-muted/70 font-medium shrink-0">{formatRelativeTime(comment.createdAt)}</span>
                                </div>
                                <p className="text-sm xs:text-base text-black font-medium mt-1">{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )} 
            {totalPages > 1 && (
                <PaginationButtons currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            )}
        </div>
    );
}