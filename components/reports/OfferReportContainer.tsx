import { useTargetReports } from "@/features/reports/useTargetReports";
import { OfferReport } from "@/types/report";
import OfferReportList from "./OfferReporList";
import OfferReportListSkeleton from "./OfferReportListSkeleton";


export default function OfferReportContainer() {

    const { data, isLoading, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } = useTargetReports<OfferReport>({
        target: "offer",
        limit: 10,
    });

    const OfferReport = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <>
            {isLoading && <OfferReportListSkeleton />}
            {!isLoading && !isFetching && OfferReport.length === 0 && (
                <p className="text-center text-sm md:text-base text-gray-500">No Offer found.</p>
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
