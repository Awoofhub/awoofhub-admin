import { useQuery } from "@tanstack/react-query";
import CommentService from "@/services/comment-service";

const fetchUserComments = async (userId: string) => {
  try {
    const response = await CommentService.byUser(userId);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching user comments:", error);
    return [];
  }
};

export const useUserComments = (userId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user-comments", userId],
    queryFn: () => fetchUserComments(userId),
    enabled: !!userId,
    staleTime: 60_000,
  });

  return { comments: data ?? [], isLoading, error: error as Error | null, refetch };
};