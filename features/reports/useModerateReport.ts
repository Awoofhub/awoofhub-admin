"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReportService from "@/services/report-service";
import { notificationsStore } from "@/store/notifications/notifications";

interface ModerateReportPayload {
  id: string;
  status: "pending" | "resolved" | "dismissed";
}

export const useModerateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: ModerateReportPayload) =>
      ReportService.updateStatus(id, { status }),
    onSuccess: () => {
      notificationsStore.getState().showNotification({
        type: "success",
        title: "Report Updated",
        duration: 3000,
        message: "Report status has been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
      queryClient.invalidateQueries({ queryKey: ["report"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      notificationsStore.getState().showNotification({
        type: "error",
        title: "Update Failed",
        duration: 5000,
        message: error?.message || "Failed to update report status.",
      });
    },
  });
};
