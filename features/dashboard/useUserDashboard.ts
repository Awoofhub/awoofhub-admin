"use client"

import DashboardService from '@/services/dashboard-service';
import { UserDashboard } from '@/types/dashboard';
import { useQuery } from '@tanstack/react-query';


type GetUserDashboardOptions = {
    id: string;
};

export const getUserDashboard = async ({ id }: GetUserDashboardOptions): Promise<UserDashboard> => {
    const result = await DashboardService.userDashboard(id);
    return result.data;
};

export const useUserDashboard = ({ id }: GetUserDashboardOptions) => {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard', "user", id],
        queryFn: () => getUserDashboard({ id }),
        enabled: !!id,
    });

    return { data, isLoading };
};

