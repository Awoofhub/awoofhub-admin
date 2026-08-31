import DashboardService from '@/services/dashboard-service';
import { DashboardData } from '@/types/dashboard';
import { useQuery } from '@tanstack/react-query';

export const GetDashboard = async (): Promise<DashboardData> => {
    const result = await DashboardService.dashboard()
    return result.data;
};

export const useDashboard = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: () => GetDashboard(),
        refetchInterval: 180000,
    });

    return { data, isLoading };
};