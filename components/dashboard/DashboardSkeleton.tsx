export default function DashboardSkeleton() {
  const secondaryStats = Array.from({ length: 6 });
  const trendingColumns = Array.from({ length: 7 });
  const expiringColumns = Array.from({ length: 5 });

  return (
    <section className="flex flex-col w-full overflow-auto">
      <div className="pt-6 pb-10 px-4 max-w-360 mx-auto w-full animate-pulse">
        <div className="mb-4 flex items-center gap-2 text-xl">
          <div className="hidden xs:block h-5 w-5 rounded bg-gray-200" />
          <div className="h-7 w-28 rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white px-4 py-4 xs:py-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-1 xs:gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="h-5 xs:h-6 w-24 xs:w-28 rounded bg-gray-200" />
                <div className="h-9 w-9 rounded-xl bg-gray-200" />
              </div>
              <div className="h-7 xs:h-9 w-20 xs:w-24 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        <div className="my-4">
          <div className="grid grid-cols-2 gap-2">
            {secondaryStats.map((_, index) => (
              <div key={index} className="contents">
                <div className="hidden xs:flex items-center justify-between p-2 xs:py-6 xs:px-6 bg-white rounded-xl">
                  <div className="w-7 h-7 xs:w-10 xs:h-10 rounded-full bg-gray-200 shrink-0" />
                  <div className="h-5 w-24 rounded bg-gray-200" />
                  <div className="h-8 w-12 rounded bg-gray-200" />
                </div>
                <div className="xs:hidden flex items-center justify-between p-2 bg-white rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                  <div className="flex flex-col items-end gap-1">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                    <div className="h-7 w-12 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-52 rounded bg-gray-200" />
            </div>
            <div className="h-10 w-28 rounded-lg bg-gray-200" />
          </div>
          <div className="relative h-100 mt-4 overflow-hidden rounded-lg">
            <div className="absolute inset-x-0 top-4 border-t border-dashed border-gray-200" />
            <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-gray-200" />
            <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-gray-200" />
            <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-gray-200" />
            <div className="absolute inset-x-8 bottom-0 flex h-3/4 items-end justify-around gap-4">
              {["h-1/2", "h-2/3", "h-1/3", "h-5/6", "h-3/5"].map((height) => (
                <div
                  key={height}
                  className={`w-full max-w-24 rounded-t bg-gray-200 ${height}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <DashboardTableSkeleton columns={trendingColumns} titleWidth="w-36" />
          <DashboardTableSkeleton columns={expiringColumns} titleWidth="w-36" />
        </div>
      </div>
    </section>
  );
}

function DashboardTableSkeleton({
  columns,
  titleWidth,
}: {
  columns: unknown[];
  titleWidth: string;
}) {
  return (
    <div className="bg-white px-4 py-6 rounded-2xl overflow-hidden">
      <div className={`mb-4 h-6 rounded bg-gray-200 ${titleWidth}`} />
      <div className="overflow-x-auto">
        <table className="w-full min-w-250 text-left shadow-sm">
          <thead>
            <tr className="bg-[#F9F9F9] border-b border-gray-200">
              {columns.map((_, index) => (
                <th key={index} className="py-4 px-3">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200">
                {columns.map((_, columnIndex) => (
                  <td key={columnIndex} className="px-3 py-5">
                    <div className="h-6 w-full max-w-37.5 rounded bg-gray-200" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
