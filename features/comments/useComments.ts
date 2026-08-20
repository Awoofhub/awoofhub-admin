import CommentService from '@/services/comment-service';
import { ApiResponse } from '@/types/api-response';
import { Comment } from "@/types/comment";
import { useQuery } from '@tanstack/react-query';


type GetCommentsOptions = {
    page: number;
    limit: number;
};

export const getComments = ({ page, limit, }: GetCommentsOptions): Promise<ApiResponse<Comment[]>> => {
    return CommentService.comments( page, limit );
};

export const useComments = ({  page, limit = 8, }: GetCommentsOptions) => {
    const { data, isFetching, isFetched, isLoading,  isError, error } = useQuery({
        queryKey: ['comments',  page, limit],
        queryFn: () => getComments({ page, limit }),
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
