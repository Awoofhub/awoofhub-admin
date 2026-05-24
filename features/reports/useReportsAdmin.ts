"use client";

import { useQuery } from "@tanstack/react-query";
import ReportService from "@/services/report-service";
import { Report } from "@/types/report";

interface UseReportsAdminParams {
  search: string;
  status: string;
  targetType: string;
  page: number;
  limit: number;
}

// FIX: Use the Report type here to define the structure of the returned data
interface ReportsResponse {
  reports: Report[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const useReportsAdmin = ({
  search,
  status,
  targetType,
  page,
  limit,
}: UseReportsAdminParams) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-reports", search, status, targetType, page, limit],
    queryFn: async (): Promise<ReportsResponse> => {
      const response = await ReportService.reports(
        search,
        status,
        targetType,
        page,
        limit,
      );
      const reports = response.data || [];

      return {
        reports,
        totalPages: Math.ceil((reports.length || 1) / limit),
        currentPage: page,
        total: reports.length,
      };
    },
  });

  return { data, isLoading, error, refetch };
};
