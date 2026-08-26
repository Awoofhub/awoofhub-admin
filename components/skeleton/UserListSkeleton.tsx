export default function UserDetailSkeleton() {
  return (
    <div className="animate-pulse w-full">
      {/* Profile header card */}
      <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center sm:gap-6 gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 shrink-0" />

          <div className="flex flex-col gap-2 min-w-0 flex-1 w-full">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-6 bg-gray-200 rounded w-40" />
              <div className="h-5 bg-gray-100 rounded-full w-14" />
            </div>
            <div className="h-4 bg-gray-100 rounded w-56" />
            <div className="h-4 bg-gray-100 rounded w-32" />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-100 px-6 py-4 flex flex-col items-center gap-2">
              <div className="h-3 bg-gray-100 rounded w-16" />
              <div className="h-5 bg-gray-200 rounded w-8" />
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <div className="flex-1 h-10 bg-gray-100 rounded-lg" />
          <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mt-4 mb-4">
        <div className="h-9 w-20 bg-gray-100 rounded-t-md" />
        <div className="h-9 w-28 bg-gray-50 rounded-t-md" />
      </div>

      {/* Tab content list */}
      <div className="bg-white rounded-xl p-4 sm:p-5 flex flex-col gap-3">
        <div className="h-4 bg-gray-100 rounded w-32 mb-2" />
        {Array.from({ length: 4 }).map((_, i) => (
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
    </div>
  );
}