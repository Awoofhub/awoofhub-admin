interface CommentReportListSkeletonProps {
    count?: number;
}

function CommentReportCardSkeleton() {
    return (
        <div className="border border-gray-200 rounded-lg p-5 space-y-4 shadow-xs bg-white animate-pulse">
            <div className="flex items-center justify-between gap-4 text-sm">
                <div className="h-4 w-44 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>

            <div className="border border-gray-200 rounded-md p-4 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-4/5 bg-gray-200 rounded" />
                <div className="h-4 w-2/5 bg-gray-200 rounded" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                    <div className="h-3 w-2 bg-gray-200 rounded-full" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="h-10 w-full bg-gray-200 rounded-md" />
                <div className="h-10 w-full bg-gray-200 rounded-md" />
            </div>
        </div>
    );
}

export default function CommentReportListSkeleton({ count = 3 }: CommentReportListSkeletonProps) {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <CommentReportCardSkeleton key={index} />
            ))}

            <div className="h-10 flex items-center justify-center mt-6" />
        </div>
    );
}

