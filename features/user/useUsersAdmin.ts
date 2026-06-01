/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllUsersService } from "@/services/user-service";
import { User } from "@/types/user";

interface UseUsersAdminParams {
  search: string;
  role: string;
  status: string;
  page: number;
  limit: number;
}

export const useUsersAdmin = ({
  search,
  role,
  status,
  page,
  limit,
}: UseUsersAdminParams) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-users", search, role, status, page, limit],
    queryFn: async () => {
      const response = await getAllUsersService(
        search,
        role,
        status,
        page,
        limit,
      );
      const users: User[] = response.data || [];

      const meta = (response as any).meta;

      return {
        users,
        totalPages: meta?.totalPages || 1,
        currentPage: meta?.page || page,
        total: users.length,
      };
    },
  });

  return { data, isLoading, error, refetch };
};
