"use client"

import CommentService from "@/services/comment-service";
import { ApiResponse } from "@/types/api-response";
import { Comment } from "@/types/comment";
import { useQuery } from '@tanstack/react-query';


type GetCommentsByUserOptions = {
    userId: string;
    page: number;
    limit: number;
};


export const getCommentsByUser = async ({ userId, page, limit }: GetCommentsByUserOptions): Promise<ApiResponse<Comment[]>> => {
    return CommentService.commentsByUser(userId, page, limit);
};

export const useCommentsByUser = ({ userId, page, limit = 8 }: GetCommentsByUserOptions) => {
    const { data, isFetching, isFetched, isLoading,  isError, error } = useQuery({
        queryKey: ["comments", "user", userId, page, limit],
        queryFn: () => getCommentsByUser({ userId, page, limit }),
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

