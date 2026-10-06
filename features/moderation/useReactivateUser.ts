
import { useModeration } from "@/features/moderation/useModeration";

interface UseReactivateUserProps {
    userId: string;
    onSuccess?: () => void;
}

export function useReactivateUser({ userId, onSuccess }: UseReactivateUserProps) {
    const { submit, isPending } = useModeration({
        onSuccess,
    });

    const reactivate = () => {
        submit({
            targetType: "user",
            targetId: userId,
            actionType: "activate",
            reportIds: [],
        });
    };

    return { reactivate, isReactivating: isPending };
}