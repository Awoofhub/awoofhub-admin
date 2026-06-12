export default function TableHeader() {
  return (
    <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider sticky top-0 z-10 shadow-sm mt-0">
      <tr className="text-[10px] sm:text-xs uppercase tracking-wider whitespace-nowrap bg-gray-100 text-gray-600 border-y border-gray-200">
        <th className="px-2 sm:px-3 py-3 sm:py-4 font-bold text-left">Title</th>
        <th className="hidden sm:table-cell px-2 sm:px-3 py-3 sm:py-4 text-center font-bold">Category</th>
        <th className="hidden md:table-cell px-2 sm:px-3 py-3 sm:py-4 font-bold text-left">Date Created</th>
        <th className="hidden sm:table-cell px-2 sm:px-3 py-3 sm:py-4 text-center font-bold">Rating</th>
        <th className="hidden sm:table-cell px-2 sm:px-3 py-3 sm:py-4 text-center font-bold">Reviews</th>
        <th className="hidden lg:table-cell px-2 sm:px-3 py-3 sm:py-4 text-center font-bold">Ends On</th>
        <th className="px-2 sm:px-3 py-3 sm:py-4 text-center font-bold">Status</th>
        <th className="hidden sm:table-cell px-2 sm:px-3 py-3 sm:py-4 text-center font-bold">Expiry</th>
        <th className="px-2 sm:px-3 py-3 sm:py-4 text-center font-bold">Actions</th>
      </tr>
    </thead>
  );
}