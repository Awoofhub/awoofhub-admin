"use client"
import { getUserStatsService } from '@/services/user-service';
import { UserStats } from '@/types/user';
import { useQuery } from '@tanstack/react-query';



export const getUserStats = async ({id}:{id:string}): Promise<UserStats> => {
    const result = await getUserStatsService(id);
    return result.data; 
}; 

export const useUserStats = ({id}: {id: string}) => {
    const { data, isLoading } = useQuery({
        queryKey: ["user","stats",id],
        queryFn: () => getUserStats({id}),
    });
    
    return { data, isLoading };
};

