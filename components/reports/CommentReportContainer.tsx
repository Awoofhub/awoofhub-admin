import { useTargetReports } from "@/features/reports/useTargetReports";
import { CommentReport } from "@/types/report";
import CommentReportList from "./CommentReportList";
import CommentReportListSkeleton from "./CommentReportListSkeleton";

export default function CommentReportContainer() {

    const { data, isLoading, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } = useTargetReports<CommentReport>({
        target: "comment",
        limit: 10,
    });

    const CommentReport = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <div className="w-full p-4 space-y-6 bg-white font-sans">
            <h2 className="text-xl font-bold text-gray-900">Reports</h2>
            {isLoading && <CommentReportListSkeleton />}
            {!isLoading && !isFetching && CommentReport.length === 0 && (
                <p className="text-center text-sm md:text-base text-gray-500">No Comment found.</p>
            )}
            {!isLoading && CommentReport.length > 0 && (
                <CommentReportList
                    data={CommentReport}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                />
            )}
        </div>
    );
}

