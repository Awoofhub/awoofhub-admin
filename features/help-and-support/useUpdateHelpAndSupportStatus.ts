import HelpAndSupportService from "@/services/help-and-support-service";
import { HelpAndSupport, UpdateHelpAndSupportData } from "@/types/help-and-support";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateHelpAndSupportStatusOptions = {
    id: string;
    onSuccess?: (helpAndSupport: HelpAndSupport) => void;
};

export const UpdateHelpAndSupportStatus = async ({ id }: UpdateHelpAndSupportStatusOptions, data: UpdateHelpAndSupportData): Promise<HelpAndSupport> => {
    const result = await HelpAndSupportService.updateStatus(id, data);

    return result.data;
};

export const useUpdateHelpAndSupportStatus = ({ id, onSuccess }: UpdateHelpAndSupportStatusOptions) => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (payload: UpdateHelpAndSupportData) => UpdateHelpAndSupportStatus({ id }, payload),
        
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["helpAndSupport"] });
            onSuccess?.(data);
        },
    });

    return {
        updateHelpAndSupport: mutate,
        isPending,
        isError,
        error,
    };
}