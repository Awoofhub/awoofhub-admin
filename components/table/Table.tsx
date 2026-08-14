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
    <table className=" w-full min-w-[1000px] text-left shadow-sm">
      <thead>
        <tr className="text-sm text-left font-baloo uppercase tracking-wide whitespace-nowrap bg-[#F9F9F9] text-black border-b border-muted">
          {columns.map((column) => (
            <th
              key={column.key}
              className={` py-4 px-3 font-bold ${column.className ?? ""}`}
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
              border-b border-muted/20 transition-colors
              ${onRowClick ? "cursor-pointer hover:bg-orange-50" : ""}
            `}
          >
            {columns.map((column) => (
              <td
                key={column.key}
                className={`px-3 py-5 text-left text-sm text-black ${column.className ?? ""}`}
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