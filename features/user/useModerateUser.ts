"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moderateUserService } from "@/services/user-service";
import { notificationsStore } from "@/store/notifications/notifications";

interface ModerateUserPayload {
  id: string;
  status: "active" | "suspended" | "banned";
}

export const useModerateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: ModerateUserPayload) =>
      moderateUserService(id, status),
    onSuccess: () => {
      notificationsStore.getState().showNotification({
        type: "success",
        title: "User Updated",
        duration: 3000,
        message: "User status has been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
