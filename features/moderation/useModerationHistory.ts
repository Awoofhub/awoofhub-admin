import ModerationService from '@/services/moderation-service';
import { Moderation } from '@/types/moderation';
import { useQuery } from '@tanstack/react-query';

type GetModerationHistoryOptions = {
    id: string;
};

export const getModerationHistory = async ({ id }: GetModerationHistoryOptions): Promise<Moderation[]> => {
    const result = await ModerationService.moderationHistory(id)
    return result.data;
};

export const useModerationHistory = ({ id }: GetModerationHistoryOptions) => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['moderation', 'history', id],
        queryFn: () => getModerationHistory({ id }),
        enabled: !!id,
        staleTime: 0,
    });

    return { data, isLoading, isFetching };
};