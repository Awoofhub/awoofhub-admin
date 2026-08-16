"use client"

import CommentService from "@/services/comment-service";
import { Comment } from "@/types/comment";
import { useQuery } from '@tanstack/react-query';


type GetCommentsByUserOptions = {
    userId: string;
};


export const getCommentsByUser = async ({ userId }: GetCommentsByUserOptions): Promise<Comment[]> => {
    const result = await CommentService.commentsByUser(userId);
    return result.data;
};

export const useCommentsByUser = ({ userId }: GetCommentsByUserOptions) => {
    const { data, isLoading } = useQuery({
        queryKey: ["comments", "user", userId],
        queryFn: () => getCommentsByUser({ userId }),
    });

    return { data, isLoading };
};

