import DashboardService from '@/services/dashboard-service';
import { DashboardOfferChartData } from '@/types/dashboard';
import { useQuery } from '@tanstack/react-query';


type GetDashboardOfferChartOption = {
   month?: string
};

export const GetDashboardOfferChart = async ({ month } :GetDashboardOfferChartOption): Promise<DashboardOfferChartData> => {
    const result = await DashboardService.dashboardOfferChart(month)
    return result.data;
};

export const useDashboardOfferChart = ({ month }: GetDashboardOfferChartOption  = {}) => {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard', 'offer', 'chart', month],
        queryFn: () => GetDashboardOfferChart({ month }),
        refetchInterval: 180000,
        staleTime: 60000,
    });

    return { data, isLoading };
};