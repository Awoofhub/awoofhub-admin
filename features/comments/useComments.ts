import { useQuery } from '@tanstack/react-query';
import CommentService from '@/services/comment-service';
import { Comment } from '@/types/comment';

interface UseCommentsParams {
  page: number;
  limit: number;
}

export const useComments = ({ page, limit }: UseCommentsParams) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['comments', page, limit],
    queryFn: async () => {
      const response = await CommentService.getAllComments(page, limit);
      return response.data || [];
    },
  });

  return { comments: data, isLoading, error, refetch };
};
