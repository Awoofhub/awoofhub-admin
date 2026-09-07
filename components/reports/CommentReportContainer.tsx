import { useTargetReports } from "@/features/reports/useTargetReports";
import { CommentReport } from "@/types/report";
import CommentReportList from "./CommentReportList";
import CommentReportListSkeleton from "./CommentReportListSkeleton";
import ReportEmptyState from "./ReportEmptyState";

export default function CommentReportContainer() {

    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useTargetReports<CommentReport>({
        target: "comment",
        limit: 10,
    });

    const CommentReport = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <>
            {isLoading && <CommentReportListSkeleton />}
            {!isLoading && CommentReport.length === 0 && (
                <ReportEmptyState/>
            )}
            {!isLoading && CommentReport.length > 0 && (
                <CommentReportList
                    data={CommentReport}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                />
            )}
        </>
    );
}

