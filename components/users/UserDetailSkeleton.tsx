export default function UserDetailSkeleton() {
  return (
    <div className="pt-6 pb-10 px-3 xs:px-4 max-w-[1440px] mx-auto w-full animate-pulse">
      <div className="h-4 w-16 bg-gray-200 rounded mb-4" />

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 lg:p-6 mb-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-200 shrink-0" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-6 sm:h-7 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-5 w-14 bg-gray-200 rounded-full" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-2">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>

            <div className="mt-3 space-y-2">
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-3/4 bg-gray-200 rounded" />
            </div>

            <div className="mt-3 h-3 w-28 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 mt-5 mb-5 sm:mb-6 sm:mt-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-xl p-2 sm:p-4 text-center"
            >
              <div className="h-3 w-12 mx-auto bg-gray-200 rounded" />
              <div className="h-6 w-10 mx-auto mt-2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        <div className="flex flex-col xs:flex-row gap-3">
          <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
          <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
        </div>
      </div>

      <div className="flex gap-2 bg-gray-100/50 p-2 rounded-xl mb-6">
        <div className="h-10 w-28 bg-gray-200 rounded-lg" />
        <div className="h-10 w-36 bg-gray-200 rounded-lg" />
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 rounded bg-gray-200" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-200 rounded mt-2" />
                  <div className="h-3 w-2/3 bg-gray-200 rounded mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 rounded bg-gray-200" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1">
                  <div className="h-4 w-36 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-200 rounded mt-2" />
                  <div className="h-3 w-4/5 bg-gray-200 rounded mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
