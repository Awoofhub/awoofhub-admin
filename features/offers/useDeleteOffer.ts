"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { notificationsStore } from "@/store/notifications/notifications";

export const useDeleteOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      await apiClient
        .post("/moderation", {
          targetType: "offer",
          targetId: id,
          actionType: "delete",
          reason: reason || "Admin deleted offer",
        })
        .catch((e) => console.error("Logging failed", e));

      const res = await apiClient.delete(`/offers/${id}`);
      return res.data;
    },
    onSuccess: () => {
      notificationsStore.getState().showNotification({
        type: "success",
        title: "Deleted",
        duration: 3000,
        message: "Offer deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      notificationsStore.getState().showNotification({
        type: "error",
        title: "Failed",
        duration: 5000,
        message: error?.message || "Failed to delete offer.",
      });
    },
  });
};
