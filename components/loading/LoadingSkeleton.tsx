// components/loading/LoadingSkeleton.tsx

export default function LoadingSkeleton() {
  return (
    <div className="flex h-screen w-full">
      {/* Main content area – matches md:ml-50 from MainLayout */}
      <div className="flex-1 flex flex-col md:ml-50">
        {/* Header skeleton */}
        <div className="h-16 border-b border-gray-200 bg-white px-4 flex items-center animate-pulse">
          <div className="w-32 h-6 bg-gray-300 rounded"></div>
          <div className="ml-auto w-24 h-6 bg-gray-300 rounded"></div>
        </div>

        {/* Page content skeleton */}
        <div className="p-6 flex-1 space-y-6">
          <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-3/6 animate-pulse"></div>
          </div>
          <div className="h-48 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}