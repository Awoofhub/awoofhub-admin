"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import OfferService from "@/services/offer-service";
import { notificationsStore } from "@/store/notifications/notifications";

interface ModeratePayload {
  id: string;
  status: "approved" | "rejected";
  adminNote?: string;
}

export const useModerateOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, adminNote }: ModeratePayload) =>
      OfferService.moderateOffer(id, status, adminNote),
    onSuccess: () => {
      notificationsStore.getState().showNotification({
        type: "success",
        title: "Success",
        duration: 3000,
        message: "Offer moderation status updated successfully.",
      });
      // Invalidate queries to refresh both the list and the specific offer
      queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
      queryClient.invalidateQueries({ queryKey: ["offer"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      notificationsStore.getState().showNotification({
        type: "error",
        title: "Moderation Failed",
        duration: 5000,
        message: error?.message || "Failed to update offer status.",
      });
    },
  });
};
