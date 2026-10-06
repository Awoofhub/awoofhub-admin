export default function UserCommentListItemSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-xl p-4 mb-4 animate-pulse"
        >
          <div className="space-y-2 mb-1">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>
          <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-200 shrink-0" />
            <div className="h-3 w-40 max-w-[calc(100%-2rem)] bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </>
  );
}
