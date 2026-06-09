/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { notificationsStore } from "@/store/notifications/notifications";

interface ModeratePayload {
  id: string;
  status: "approved" | "rejected" | "pending";
  adminNote?: string;
  reportId?: string;
}

export const useModerateOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      adminNote,
      reportId,
    }: ModeratePayload) => {
      const actionMap: Record<string, "activate" | "block" | "suspend"> = {
        approved: "activate",
        rejected: "block",
        pending: "suspend",
      };

      const payload: any = {
        targetType: "offer",
        targetId: id,
        actionType: actionMap[status],
        reason: adminNote || `Admin marked offer as ${status}`,
      };

      if (reportId) payload.reportId = reportId;

      const res = await apiClient.post("/moderation", payload);

      return res.data;
    },
    onSuccess: () => {
      notificationsStore.getState().showNotification({
        type: "success",
        title: "Success",
        duration: 3000,
        message: "Offer updated and logged successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
      queryClient.invalidateQueries({ queryKey: ["offer"] });
      queryClient.invalidateQueries({ queryKey: ["moderation-history"] }); // Refresh history instantly!
    },

    onError: (error: any) => {
      notificationsStore.getState().showNotification({
        type: "error",
        title: "Failed",
        duration: 5000,
        message: error?.message || "Failed to moderate offer.",
      });
    },
  });
};
