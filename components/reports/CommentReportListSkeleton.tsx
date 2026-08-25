interface CommentReportListSkeletonProps {
    count?: number;
}

export default function CommentReportListSkeleton({ count = 3 }: CommentReportListSkeletonProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-3 xs:p-4 lg:p-5 animate-pulse">
                    <div className="flex flex-col xs:flex-row gap-3">
                        <div className="w-full h-[260px] xs:w-58 md:w-65 xs:h-52 lg:w-85 lg:h-75 xl:w-110 xl:h-87.5 rounded-xl bg-gray-200 shrink-0" />

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-24 bg-gray-200 rounded" />
                                    <div className="h-5 w-20 bg-gray-200 rounded-full" />
                                </div>
                                <div className="h-4 w-16 bg-gray-200 rounded" />
                            </div>

                            <div className="h-6 w-3/4 bg-gray-200 rounded mt-3" />

                            <div className="flex gap-2 mt-3">
                                <div className="h-5 w-16 bg-gray-200 rounded" />
                                <div className="h-5 w-20 bg-gray-200 rounded-lg" />
                                <div className="h-5 w-20 bg-gray-200 rounded-lg" />
                            </div>

                            <div className="h-4 w-32 bg-gray-200 rounded mt-3" />
                            <div className="h-4 w-40 bg-gray-200 rounded mt-2" />

                            <div className="flex items-center justify-between mt-3">
                                <div className="h-4 w-28 bg-gray-200 rounded" />
                                <div className="h-4 w-20 bg-gray-200 rounded" />
                            </div>

                            <hr className="border border-muted/10 mt-4" />

                            <div className="hidden lg:block mt-2">
                                <div className="h-4 w-16 bg-gray-200 rounded" />
                                <div className="h-4 w-full bg-gray-200 rounded mt-2" />
                                <div className="flex gap-2 mt-3">
                                    <div className="h-9 flex-1 bg-gray-200 rounded-sm" />
                                    <div className="h-9 flex-1 bg-gray-200 rounded-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:hidden mt-2">
                        <div className="h-4 w-16 bg-gray-200 rounded" />
                        <div className="h-4 w-full bg-gray-200 rounded mt-2" />
                        <div className="flex flex-col xs:flex-row gap-2 mt-2">
                            <div className="h-9 flex-1 bg-gray-200 rounded-sm" />
                            <div className="h-9 flex-1 bg-gray-200 rounded-sm" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

