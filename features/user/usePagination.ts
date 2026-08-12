// hooks/usePagination.ts
import { useState } from "react";

interface UsePaginationResult<T> {
  visibleItems: T[];
  hasMore: boolean;
  showMore: () => void;
  visibleCount: number;
}

export function usePagination<T>(
  items: T[],
  initialLimit: number
): UsePaginationResult<T> {
  const [visibleCount, setVisibleCount] = useState(initialLimit);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = items.length > visibleCount;

  const showMore = () => {
    setVisibleCount((prev) => prev + initialLimit);
  };

  return { visibleItems, hasMore, showMore, visibleCount };
}