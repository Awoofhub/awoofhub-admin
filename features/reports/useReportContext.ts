"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserByIdService } from "@/services/user-service";
import OfferService from "@/services/offer-service";
import { apiClient } from "@/lib/api-client";
import { Report } from "@/types/report";

export const useReportContext = (report?: Report | null) => {
  const isUser = report?.targetType === "user";
  const isOffer = report?.targetType === "offer";
  const targetId = report?.targetId;

  // Fetch Target User
  const { data: targetUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ["target-user", targetId],
    queryFn: async () => {
      const res = await getUserByIdService(targetId!);
      return res.data;
    },
    enabled: !!targetId && isUser,
  });

  // Fetch Target Offer
  const { data: targetOffer, isLoading: isLoadingOffer } = useQuery({
    queryKey: ["target-offer", targetId],
    queryFn: async () => {
      const res = await OfferService.offerById(targetId!);
      return res.data;
    },
    enabled: !!targetId && isOffer,
  });

  // Fetch Moderation History
  const { data: moderationHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["moderation-history", targetId],
    queryFn: async () => {
      const res = await apiClient.get(`/moderation/history/${targetId}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!targetId,
  });

  return {
    targetUser,
    targetOffer,
    isLoadingTarget: isLoadingUser || isLoadingOffer,
    moderationHistory,
    isLoadingHistory,
  };
};
