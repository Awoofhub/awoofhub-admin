import React from "react";

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: (item: T) => string;
  onRowClick?: (item: T) => void;
}

export default function Table<T>({
  data,
  columns,
  rowKey,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <table className="w-full min-w-[1283px] text-left shadow-sm">
      <thead>
        <tr className="text-[11px] uppercase tracking-wider whitespace-nowrap bg-gray-100 text-gray-600 border-y border-gray-200">
          {columns.map((column) => (
            <th
              key={column.key}
              className={`px-3 py-4 font-bold ${column.className ?? ""}`}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr
            key={rowKey(item)}
            onClick={() => onRowClick?.(item)}
            className={`
              border-y border-gray-200 transition-colors
              ${onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
            `}
          >
            {columns.map((column) => (
              <td
                key={column.key}
                className={`px-3 py-5 text-xs text-gray-600 ${column.className ?? ""}`}
              >
                {column.render
                  ? column.render(item)
                  : (item[column.key as keyof T] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}