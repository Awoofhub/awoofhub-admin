"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import ModerationService from "@/services/moderation-service";
import { CreateModerationData } from "@/types/moderation";
import { notificationsStore } from "@/store/notifications/notifications";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateModerationData) =>
      ModerationService.create(payload),
    onSuccess: () => {
      notificationsStore.getState().showNotification({
        type: "success",
        title: "Comment Moderated",
        duration: 3000,
        message: "Comment has been successfully moderated/deleted.",
      });
      // Invalidate both comments list and individual query queries if any
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      notificationsStore.getState().showNotification({
        type: "error",
        title: "Moderation Failed",
        duration: 5000,
        message: error?.message || "Failed to moderate/delete comment.",
      });
    },
  });
};
