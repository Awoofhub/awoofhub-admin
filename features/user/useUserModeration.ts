"use client"
import ModerationService from "@/services/moderation-service";
import { Moderation } from "@/types/moderation";
import { useQuery } from '@tanstack/react-query';



export const getUserModerationHistory = async ({id} : {id:string}): Promise<Moderation> => {
    const result = await ModerationService.history( id );
    return result.data; 
}; 

export const useUserModerationHistory = ({id}: {id: string}) => {
    const { data, isLoading } = useQuery({
        queryKey: ["moderation","history",id],
        queryFn: () => getUserModerationHistory({id}),
    });
    
    return { data, isLoading };
};

