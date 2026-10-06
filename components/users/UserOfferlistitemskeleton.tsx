interface UserOfferListItemSkeletonProps {
  count?: number;
}

export default function UserOfferListItemSkeleton({
  count = 3,
}: UserOfferListItemSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-0 px-2 rounded-lg -mx-2 animate-pulse"
        >
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-gray-200 mt-0.5" />

          <div className="flex-1 min-w-0">
            <div className="h-4 w-32 sm:w-40 bg-gray-200 rounded" />
            <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 mt-2 text-xs text-gray-500">
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <span>•</span>
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <span>•</span>
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="shrink-0">
            <div className="h-6 w-20 rounded-full bg-gray-200" />
          </div>
        </div>
      ))}
    </>
  );
}
