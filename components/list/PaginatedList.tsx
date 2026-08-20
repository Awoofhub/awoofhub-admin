import { ApiResponse } from "@/types/api-response";
import PaginationButtons from "../button/PaginationButtons";
import List, { ListItem } from "./List";

interface PaginatedListProps<T> {
  response?: ApiResponse<T[]>;
  limit: number;
  rowKey: (item: T) => string;
  currentPage: number;
  onPageChange: (page: number) => void;
  renderItem: ListItem<T>;
  isFetching: boolean;
  isFetched: boolean;
  title?: string;
}

export default function PaginatedList<T>({
  response,
  limit,
  rowKey,
  currentPage,
  onPageChange,
  renderItem,
  isFetching,
  isFetched,
  title,
}: PaginatedListProps<T>) {
  const data = response?.data ?? [];
  const totalPages = response?.meta?.totalPages ?? 0;

  const hasData = data.length > 0;
  const hasNoData = isFetched && !isFetching && !hasData;

  return (
    <div className="bg-white px-4 py-6 rounded-2xl">
      {title && (
        <h2 className="font-bold text-black text-lg mb-4">
          {title}
        </h2>
      )}

      {hasNoData && (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-gray-400">
            No data available
          </p>
        </div>
      )}

      {(hasData || isFetching) && (
        <List
          data={data}
          isFetching={isFetching}
          limit={limit}
          rowKey={rowKey}
          item={renderItem}
        />
      )}

      {!isFetching && hasData && totalPages > 1 && (
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}