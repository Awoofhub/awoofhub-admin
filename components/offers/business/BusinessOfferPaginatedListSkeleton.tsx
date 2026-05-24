export default function BusinessOfferPaginatedListSkeleton() {
  return (
    <div className="overflow-x-auto min-h-[455px] rounded-lg">
      <div className="w-full min-w-[1283px] shadow-sm">

        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_1.5fr_1fr_1fr_1fr] text-[11px] uppercase tracking-wider whitespace-nowrap bg-gray-100 text-gray-600 border-y border-gray-200">
          <div className="px-3 py-4 font-bold">Title</div>
          <div className="px-3 py-4 text-center font-bold">Category</div>
          <div className="px-3 py-4 font-bold">Date Created</div>
          <div className="px-3 py-4 text-center font-bold">Rating</div>
          <div className="px-3 py-4 font-bold">Reviews</div>
          <div className="px-3 py-4 text-center font-bold">Ends On</div>
          <div className="px-3 py-4 text-center font-bold">Status</div>
          <div className="px-3 py-4 text-center font-bold">Expiry Status</div>
          <div className="px-3 py-4 text-center font-bold">Actions</div>
        </div>

        {/* Rows */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_1.5fr_1fr_1fr_1fr] items-center border-y border-gray-200 px-3 py-5 animate-pulse"
          >
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E0E0E0] rounded-md" />
              <div className="h-3 w-45 bg-[#E0E0E0] rounded-md" />
            </div>

            {/* Category */}
            <div className="flex justify-center">
              <div className="h-3 w-20 bg-[#E0E0E0] rounded-md" />
            </div>

            {/* Date */}
            <div className="flex justify-center">
              <div className="h-3 w-40 bg-[#E0E0E0] rounded-md" />
            </div>

            {/* Rating */}
            <div className="flex justify-center">
              <div className="h-4 w-23 bg-[#E0E0E0] rounded-md" />
            </div>

            {/* Reviews */}
            <div className="flex justify-center">
              <div className="h-3 w-10 bg-[#E0E0E0] rounded-md" />
            </div>

            {/* Ends */}
            <div className="flex justify-center">
              <div className="h-3 w-40 bg-[#E0E0E0] rounded-md" />
            </div>

            {/* Status */}
            <div className="flex justify-center">
              <div className="h-5 w-20 bg-[#E0E0E0] rounded-full" />
            </div>

            {/* Expiry */}
            <div className="flex justify-center">
              <div className="h-5 w-20 bg-[#E0E0E0] rounded-full" />
            </div>

            {/* Actions */}
            <div className="flex justify-center">
              <div className="h-4 w-8 bg-[#E0E0E0] rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}