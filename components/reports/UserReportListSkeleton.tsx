interface UserReportListSkeletonProps {
    count?: number;
}

function UserReportCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                        <div className="flex items-start gap-4">
                            <div className="w-24 h-24 rounded-full bg-gray-200 shrink-0" />

                            <div className="space-y-2">
                                <div className="h-5 w-40 bg-gray-200 rounded" />
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                <div className="h-4 w-56 bg-gray-200 rounded" />
                            </div>
                        </div>

                        <div className="h-4 w-28 bg-gray-200 rounded" />
                    </div>

                    <div>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-4" />

                        <div className="space-y-4">
                            {[0, 1].map((item) => (
                                <div key={item}>
                                    <div className="flex items-center justify-between gap-3 text-xs mb-1">
                                        <div className="h-3 w-36 bg-gray-200 rounded" />
                                        <div className="h-3 w-20 bg-gray-200 rounded" />
                                    </div>

                                    <div className="bg-gray-50/70 border border-gray-200/60 rounded-lg p-3 space-y-2">
                                        <div className="h-3 w-full bg-gray-200 rounded" />
                                        <div className="h-3 w-4/5 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="h-4 w-32 bg-gray-200 rounded" />
                            <div className="w-4 h-4 rounded-full bg-gray-200" />
                        </div>

                        {[0, 1, 2].map((item) => (
                            <div key={item} className="space-y-1">
                                <div className="h-3 w-24 bg-gray-200 rounded" />
                                <div className="h-4 w-40 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2.5 pt-6 border-t border-gray-200/60">
                        <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
                        <div className="h-10 w-full bg-gray-200 rounded-md" />
                        <div className="h-10 w-full bg-gray-200 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function UserReportListSkeleton({ count = 3 }: UserReportListSkeletonProps) {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <UserReportCardSkeleton key={index} />
            ))}

            <div className="h-10 flex items-center justify-center mt-6" />
        </div>
    );
}