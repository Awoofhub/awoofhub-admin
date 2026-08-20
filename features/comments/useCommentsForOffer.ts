"use client"

import CommentService from "@/services/comment-service";
import { ApiResponse } from "@/types/api-response";
import { Comment } from "@/types/comment";
import { useQuery } from '@tanstack/react-query';


type GetCommentsByOfferOptions = {
    id: string;
    page: number;
    limit: number;
};


export const getCommentsForOffer = async ({ id, page, limit }: GetCommentsByOfferOptions): Promise<ApiResponse<Comment[]>> => {
    return CommentService.commentsForOffer(id, page, limit);
};

export const useCommentsForOffer = ({ id, page, limit = 8 }: GetCommentsByOfferOptions) => {
    const { data, isFetching, isFetched, isLoading, isError, error } = useQuery({
        queryKey: ["comments", "offer", id, page, limit],
        queryFn: () => getCommentsForOffer({ id, page, limit }),
    });

    return {
        data,
        isFetching,
        isFetched,
        isLoading,
        isError,
        error
    };
};

