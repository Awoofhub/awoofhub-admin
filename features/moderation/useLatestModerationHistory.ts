import ModerationService from '@/services/moderation-service';
import { Moderation } from '@/types/moderation';
import { useQuery } from '@tanstack/react-query';

type GetLatestModerationHistoryOptions = {
    id: string;
};

export const getLatestModerationHistory = async ({ id }: GetLatestModerationHistoryOptions): Promise<Moderation> => {
    const result = await ModerationService.latestModerationHistory(id)
    return result.data;
};

export const useLatestModerationHistory = ({ id }: GetLatestModerationHistoryOptions) => {
    const { data, isLoading } = useQuery({
        queryKey: ['moderation', 'history', id, 'latest'],
        queryFn: () => getLatestModerationHistory({ id }),
    });

    return { data, isLoading };
};