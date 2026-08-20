import React from "react";

export interface ListItem<T> {
  key: string;
  render?: (item: T) => React.ReactNode;
}

interface ListProps<T> {
  data: T[];
  item: ListItem<T>;
  isFetching: boolean;
  limit: number;
  rowKey: (item: T) => string;
}

export default function List<T>({
  data,
  item,
  limit,
  isFetching,
  rowKey,
}: ListProps<T>) {
  const rows = Array.from({ length: limit }, (_, index) => index);

  return (
    <div className="w-full shadow-sm">
      {isFetching ? (
        <div>
          {rows.map((rowIndex) => (
            <div
              key={rowIndex}
              className="border-b border-muted/20 px-3 py-5"
            >
              <div className="h-6 bg-gray-200 rounded w-full max-w-[300px]" />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {data.map((dataItem) => (
            <div
              key={rowKey(dataItem)}
              className="border-b border-muted/20 px-3 py-5 transition-colors">
              {item.render
                ? item.render(dataItem)
                : (dataItem[item.key as keyof T] as React.ReactNode)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}