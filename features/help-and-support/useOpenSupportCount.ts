import HelpAndSupportService from "@/services/help-and-support-service";
import { useQuery } from "@tanstack/react-query";

export const getOpenSupportCount = async (): Promise<number> => {
    const result = await HelpAndSupportService.getOpenSupportCount();
    return result.data.count;
};


export const useOpenSupportCount = () => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['support', 'open', 'count'],
        queryFn: () => getOpenSupportCount(),
        refetchInterval: 5000
    });

    return {
        data,
        isFetching,
        isFetched
    };
};