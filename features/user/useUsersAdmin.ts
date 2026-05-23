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
    // Keep parameters in queryKey so it recalculates when they change
    queryKey: ["admin-users", search, role, status, page, limit],
    queryFn: async () => {
      // 1. Fetch all users from backend
      const response = await getAllUsersService();
      let users: User[] = response.data || [];

      // 2. Client-side Filtering
      if (search) {
        const lowerSearch = search.toLowerCase();
        users = users.filter(
          (u) =>
            u.name.toLowerCase().includes(lowerSearch) ||
            u.email.toLowerCase().includes(lowerSearch),
        );
      }
      if (role) {
        users = users.filter((u) => u.role === role);
      }
      if (status) {
        // Safe check for status
        users = users.filter((u) => (u.status || "active") === status);
      }

      // 3. Client-side Pagination
      const total = users.length;
      const totalPages = Math.ceil((total || 1) / limit);

      // Slice the array for the current page
      const startIndex = (page - 1) * limit;
      const paginatedUsers = users.slice(startIndex, startIndex + limit);

      return {
        users: paginatedUsers,
        totalPages,
        currentPage: page,
        total,
      };
    },
  });

  return { data, isLoading, error, refetch };
};
