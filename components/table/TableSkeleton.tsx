interface Props {
  rows: number;
  columns: number;
}

export default function TableSkeleton({ rows, columns }: Props) {
  return (
    <div className="w-full animate-pulse">
      {[...Array(rows)].map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="flex items-center justify-between border-y border-gray-200 px-3 py-4 gap-4"
        >
          {[...Array(columns)].map((_, colIdx) => (
            <div
              key={colIdx}
              className="h-4 bg-gray-200 rounded flex-1"
              style={{ minWidth: `${100 / columns}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
