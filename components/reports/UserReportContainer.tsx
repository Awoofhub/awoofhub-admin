import { useTargetReports } from "@/features/reports/useTargetReports";
import { UserReport } from "@/types/report";
import UserReportList from "./UserReportList";
import UserReportListSkeleton from "./UserReportListSkeleton";
import ReportEmptyState from "./ReportEmptyState";


export default function UserReportContainer() {

    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useTargetReports<UserReport>({
        target: "user",
        limit: 10,
    });

    const UserReport = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <>
            {isLoading && <UserReportListSkeleton />}
            {!isLoading && UserReport.length === 0 && (
                <ReportEmptyState/>
            )}
            {!isLoading && UserReport.length > 0 && (
                <UserReportList
                    data={UserReport}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                />
            )}
        </>
    );
}
