"use client"
import {getCommentsByUser} from "@/services/comment-service";
import { Comment } from "@/types/comment";
import { useQuery } from '@tanstack/react-query';



export const getUserComments = async ({userid} : {userid:string}): Promise<Comment[]> => {
    const result = await getCommentsByUser({ userid: userid });
    return result.data; 
}; 

export const useUserComments = ({userid}: {userid: string}) => {
    const { data, isLoading } = useQuery({
        queryKey: ["comments","user",userid],
        queryFn: () => getUserComments({userid}),
    });
    
    return { data, isLoading };
};

