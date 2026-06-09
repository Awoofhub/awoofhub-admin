/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoriesService } from "@/services/category-service";
import { Category } from "@/types/category";

export const useCategoriesAdmin = (
  search: string,
  page: number,
  limit: number,
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-categories", search, page, limit],
    queryFn: async () => {
      const response = await getCategoriesService(search, page, limit);
      const categories: Category[] = response.data || [];
      const meta = (response as any).meta;

      return {
        categories,
        totalPages:
          meta?.totalPages || Math.ceil((categories.length || 1) / limit),
        currentPage: meta?.page || page,
        total: meta?.total || categories.length,
      };
    },
  });

  return { data, isLoading, error, refetch };
};
