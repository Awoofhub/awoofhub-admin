interface Props {
  number: number;
}

export default function AdminOfferListSkeleton({ number }: Props) {
  return (
    <div className="w-full min-w-[1283px] shadow-sm">
      {[...Array(number)].map((_, i) => (
        <div key={i} className="flex items-center justify-around border-y border-gray-200 px-3 py-5 animate-pulse">
          <div className="ml-[-12px] flex items-center gap-3">
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

          {/* Rating Count */}
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
  );
}