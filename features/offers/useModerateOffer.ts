/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { notificationsStore } from "@/store/notifications/notifications";

interface ModeratePayload {
  id: string;
  status: "approved" | "rejected" | "pending";
  adminNote?: string;
}

export const useModerateOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, adminNote }: ModeratePayload) => {
      await apiClient
        .post("/moderation/", {
          targetType: "offer",
          targetId: id,
          actionType: status,
          reason: adminNote || `Admin marked offer as ${status}`,
        })
        .catch((e) => console.error("Moderation logging failed", e));

      const res = await apiClient.patch(`/offers/${id}`, {
        moderationStatus: status,
        adminNote: adminNote,
      });
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
    },
    onError: (error: any) => {
      notificationsStore.getState().showNotification({
        type: "error",
        title: "Failed",
        duration: 5000,
        message: error?.message || "Failed to update offer.",
      });
    },
  });
};
