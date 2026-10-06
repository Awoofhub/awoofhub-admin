import BaseTable, { Column } from "./BaseTable";


interface TableProps<T> {
  response?: T[];
  columns: Column<T>[];
  rowKey: (item: T) => string;
  onRowClick?: (item: T) => void;
  isFetching: boolean;
  isFetched: boolean;
  title?: string;
}

export default function Table<T>({
  response,
  columns,
  rowKey,
  onRowClick,
  isFetching,
  isFetched,
  title,
}: TableProps<T>) {

  const data = response ?? [];

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
            limit={50}
            columns={columns}
            rowKey={rowKey}
            onRowClick={onRowClick}
          />
        </div>
      )}
    </div>
  );
}