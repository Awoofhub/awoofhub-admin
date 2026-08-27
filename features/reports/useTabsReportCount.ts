import ReportService from "@/services/report-service";
import { ReportTabsCount } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

export const getTabsReportCount = async (): Promise<ReportTabsCount> => {
    const result = await ReportService.getTabsReportCount();
    return result.data;
};


export const useTabsReportCount = () => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['reports', 'tabs', 'count'],
        queryFn: () => getTabsReportCount(),
        refetchInterval: 5000
    });

    return {
        data,
        isFetching,
        isFetched
    };
};