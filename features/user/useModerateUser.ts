/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createModerationLog } from "@/services/user-service";
import { notificationsStore } from "@/store/notifications/notifications";

interface ModerateUserPayload {
  id: string;
  status: "active" | "suspended" | "banned" | "warn";
  reason?: string;
  reportId?: string;
}

export const useModerateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      reason,
      reportId,
    }: ModerateUserPayload) => {
      const actionMap: Record<
        ModerateUserPayload["status"],
        "activate" | "suspend" | "block" | "warn"
      > = {
        active: "activate",
        suspended: "suspend",
        banned: "block",
        warn: "warn",
      };
      const payload: any = {
        targetType: "user",
        targetId: id,
        actionType: actionMap[status],
        reason: reason || `Admin marked user as ${status}`,
      };

      if (reportId) payload.reportId = reportId;

      const res = await createModerationLog(payload);
      return res.data;
    },
    onSuccess: () => {
      notificationsStore.getState().showNotification({
        type: "success",
        title: "User Updated",
        duration: 3000,
        message: "User status and history successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["moderation-history"] });
    },
    onError: (error: any) => {
      notificationsStore.getState().showNotification({
        type: "error",
        title: "Update Failed",
        duration: 5000,
        message: error?.message || "Failed to moderate user.",
      });
    },
  });
};
