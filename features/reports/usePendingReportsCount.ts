import ReportService from "@/services/report-service";
import { useQuery } from "@tanstack/react-query";

export const getPendingReportsCount = async (): Promise<number> => {
    const result = await ReportService.getPendingReportCount();
    return result.data.count;
};


export const usePendingReportsCount = () => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['reports', 'pending', 'count'],
        queryFn: () => getPendingReportsCount(),
        refetchInterval: 5000
    });

    return {
        data,
        isFetching,
        isFetched
    };
};