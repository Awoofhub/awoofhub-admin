import ReportService from "@/services/report-service";
import { Report } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

export const getReportById = async ( id: string): Promise<Report> => {
    const result = await ReportService.reportById(id);
    return result.data;
};

export const useReportById = (id: string) => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ["reports", id],
        queryFn: () => getReportById(id),
    });

    return {
        data,
        isFetching,
        isFetched,
    };
};