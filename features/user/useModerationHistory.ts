// features/user/useModerationHistory.ts
import { useQuery } from "@tanstack/react-query";
import ModerationService from "@/services/moderation-service";

export const useModerationHistory = (userId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["moderation-history", userId],
    queryFn: () => ModerationService.history(userId),
    enabled: !!userId,
    staleTime: 60_000,
  });

  return {
    events: Array.isArray(data?.data) ? data.data : [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};