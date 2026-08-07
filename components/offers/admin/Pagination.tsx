// Pagination.tsx
// "Showing X-Y of Z" + prev/next controls from the bottom of the table.
// Controlled via callbacks — parent owns currentPage.

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number; // 1-indexed
  pageSize: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function Pagination({
  currentPage,
  pageSize,
  totalItems,
  onPrevious,
  onNext,
}: PaginationProps) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  const isFirstPage = currentPage <= 1;
  const isLastPage = end >= totalItems;

  return (
    <div className="flex items-center justify-between px-3 sm:px-4 py-3">
      <span className="text-sm text-gray-500">
        Showing {start}-{end} of {totalItems}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstPage}
          aria-label="Previous page"
          className="rounded-full border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={isLastPage}
          aria-label="Next page"
          className="rounded-full border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}