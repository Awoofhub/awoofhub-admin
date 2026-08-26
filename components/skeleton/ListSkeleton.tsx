interface ListSkeletonProps {
  rows?: number;
  title?: boolean;
}

export default function ListSkeleton({ rows = 4, title = true }: ListSkeletonProps) {
  return (
    <div className="animate-pulse flex flex-col gap-3">
      {title && <div className="h-4 bg-gray-100 rounded w-32 mb-2" />}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-2">
          <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="h-3.5 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-50 rounded w-1/2" />
          </div>
          <div className="h-3 bg-gray-100 rounded w-16 shrink-0" />
        </div>
      ))}
    </div>
  );
}