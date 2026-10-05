export default function OfferCommentSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {[0, 1, 2].map((item) => (
        <div key={item} className="flex items-center gap-3">
          <div className="w-7.5 h-7.5 xs:w-10 xs:h-10 lg:w-12.5 lg:h-12.5 rounded-full bg-gray-200 shrink-0" />

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center gap-2">
              <div className="flex gap-1 items-center">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
              <div className="h-3 w-12 bg-gray-200 rounded shrink-0" />
            </div>

            <div className="mt-2 h-4 w-11/12 bg-gray-200 rounded" />
            <div className="mt-1 h-4 w-2/3 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
