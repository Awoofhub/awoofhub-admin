"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  moderateUserService,
  createModerationLog,
} from "@/services/user-service";
import { notificationsStore } from "@/store/notifications/notifications";

interface ModerateUserPayload {
  id: string;
  status: "active" | "suspended" | "banned";
  reason?: string;
}

export const useModerateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, reason }: ModerateUserPayload) => {
      // If banning or suspending, log status to the moderation history with the reason
      if (status !== "active" && reason) {
        await createModerationLog({
          targetType: "user",
          targetId: id,
          actionType: status,
          reason: reason,
        });
      }
      // update the user's status
      return moderateUserService(id, status);
    },

    onSuccess: () => {
      notificationsStore.getState().showNotification({
        type: "success",
        title: "User Updated",
        duration: 3000,
        message:
          "User status and moderation history have been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["moderation-history"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      notificationsStore.getState().showNotification({
        type: "error",
        title: "Update Failed",
        duration: 5000,
        message: error?.message || "Failed to update user status.",
      });
    },
  });
};
