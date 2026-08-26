import { useTargetReports } from "@/features/reports/useTargetReports";
import { UserReport } from "@/types/report";
import UserReportList from "./UserReportList";
import UserReportListSkeleton from "./UserReportListSkeleton";


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
                <p className="text-center text-sm md:text-base text-gray-500">No User found.</p>
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
