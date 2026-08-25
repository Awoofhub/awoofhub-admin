import ReportService from "@/services/report-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DismissReportOptions = {
    onSuccess?: (report: Report) => void;
};

export const dismissReport = async (data: string[]): Promise<any> => {
    const result = await ReportService.dismiss(data);
    return result.data;
};

export const useDismissReport = ({ onSuccess }: DismissReportOptions) => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: dismissReport,

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
            
            onSuccess?.(data);
        },
    });

    return {
        dismissReports: mutate,
        isPending,
        isError,
        error,
    };
}