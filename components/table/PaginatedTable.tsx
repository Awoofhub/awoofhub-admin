import { ApiResponse } from "@/types/api-response";
import PaginationButtons from "../button/PaginationButtons";
import BaseTable, { Column } from "./BaseTable";


interface PaginatedTableProps<T> {
  response?: ApiResponse<T[]>;
  columns: Column<T>[];
  limit: number,
  rowKey: (item: T) => string;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowClick?: (item: T) => void;
  isFetching: boolean;
  isFetched: boolean;
  title?: string;
}

export default function PaginatedTable<T>({
  response,
  columns,
  rowKey,
  limit,
  currentPage,
  onPageChange,
  onRowClick,
  isFetching,
  isFetched,
  title,
}: PaginatedTableProps<T>) {

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

      {/* Empty state */}
      {hasNoData && (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-gray-400">
            No data available
          </p>
        </div>
      )}

      {/* Table */}
      {(hasData || isFetching) && (
        <div className="overflow-x-auto">
          <BaseTable
            data={data}
            isFetching={isFetching}
            limit={limit}
            columns={columns}
            rowKey={rowKey}
            onRowClick={onRowClick}
          />
        </div>
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