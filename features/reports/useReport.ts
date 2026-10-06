import ReportService from "@/services/report-service";
import { Report } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

interface GetReportsOptions {
    search?: string;
    status?: Report["status"];
    targetType?: Report["targetType"];
    page?: number;
    limit?: number;
}

export const getReports = async ({ search,status,targetType,page = 1,limit = 10,}: GetReportsOptions): Promise<Report[]> => {
    const result = await ReportService.reports(
        search,
        status,
        targetType,
        page,
        limit
    );

    return result.data;
};

export const useReports = ({search,status,targetType,page = 1,limit = 10,}: GetReportsOptions = {}) => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: [
            "reports",
            search,
            status,
            targetType,
            page,
            limit,
        ],
        queryFn: () =>
            getReports({
                search,
                status,
                targetType,
                page,
                limit,
            }),
    });

    return {
        data,
        isFetching,
        isFetched,
    };
};