import HelpAndSupportService from '@/services/help-and-support-service';
import { ApiResponse } from '@/types/api-response';
import { HelpAndSupport } from '@/types/help-and-support';
import { useQuery } from '@tanstack/react-query';


type GetHelpAndSupportOptions = {
    search: string,
    category: string,
    status: string,
    submittedAt: string,
    page: number,
    limit: number
};

export const getHelpAndSupport = ({ search, category, status, submittedAt, page, limit }: GetHelpAndSupportOptions): Promise<ApiResponse<HelpAndSupport[]>> => {
    return HelpAndSupportService.helpAndSupport(search, category, status, submittedAt, page, limit);
};

export const useHelpAndSupport = ({ search, category, status, submittedAt, page, limit = 8, }: GetHelpAndSupportOptions) => {
    const { data, isFetching, isFetched, isLoading, isError, error } = useQuery({
        queryKey: ['helpAndSupport', search, category, status, submittedAt, page, limit],
        queryFn: () => getHelpAndSupport({  search, category, status, submittedAt, page, limit }),

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
