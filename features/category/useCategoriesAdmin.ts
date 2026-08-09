"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoriesService } from "@/services/category-service"; // adjust path to match your actual file
import { Category } from "@/types/category";

export default function useCategoriesAdmin(
  search: string = "",
  page: number = 1,
  limit: number = 50,
) {
  return useQuery({
    queryKey: ["categories", search, page, limit],
    queryFn: async () => {
      const res = await getCategoriesService(search, page, limit);
      return {
        categories: res.data,
        currentPage: res.meta?.page ?? page,
        totalPages: res.meta?.totalPages ?? 1,
      };
    },
  });
}