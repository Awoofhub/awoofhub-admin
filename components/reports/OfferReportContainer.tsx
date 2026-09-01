import { useTargetReports } from "@/features/reports/useTargetReports";
import { OfferReport } from "@/types/report";
import OfferReportList from "./OfferReporList";
import OfferReportListSkeleton from "./OfferReportListSkeleton";
import ReportEmptyState from "./ReportEmptyState";


export default function OfferReportContainer() {

    const { data, isLoading, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } = useTargetReports<OfferReport>({
        target: "offer",
        limit: 10,
    });

    const OfferReport = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <>
            {isLoading && <OfferReportListSkeleton />}
            {!isLoading && OfferReport.length === 0 && (
                <ReportEmptyState/>
            )}
            {!isLoading && OfferReport.length > 0 && (
                <OfferReportList
                    data={OfferReport}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                />
            )}
        </>
    );
}
