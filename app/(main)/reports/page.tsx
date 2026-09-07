'use client';

import Loading from '@/components/loading/Loading';
import CommentReportContainer from '@/components/reports/CommentReportContainer';
import OfferReportContainer from '@/components/reports/OfferReportContainer';
import ReportTabs from '@/components/reports/ReportTab';
import UserReportContainer from '@/components/reports/UserReportContainer';
import { useFilter } from '@/features/offers/useFilter';
import { usePendingReportsCount } from '@/features/reports/usePendingReportsCount';
import { ReportTabsCount } from '@/types/report';
import { ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';


function ReportsPage() {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") ?? undefined;


    const updateTab = useFilter();

    const Tabs: { value: keyof ReportTabsCount | undefined; label: string }[] = [
        { value: undefined, label: "Offer" },
        { value: "users", label: "User" },
        { value: "comments", label: "Comment" },
    ];

    const { data: pendingReportsCount } = usePendingReportsCount()

    return (
        <div className="p-4 bg-[#FAFAFA] h-screen">

            <div className="flex justify-between items-center">

                <div className="my-4 flex items-center gap-2 text-xl text-black font-baloo font-semibold">
                    <ChevronRight size={18} className="hidden xs:inline" />
                    <span>Reports</span>
                </div>

                <h3 className="xs:text-lg font-medium text-primary">{`${pendingReportsCount ?? 0} new reports`}</h3>
            </div>


            <div className="mb-6">
                <ReportTabs
                    activeTab={tab}
                    onChange={(value) => updateTab("tab", value)}
                    tabs={Tabs}
                />
            </div>


            <div className="max-w-[1440px] mx-auto">

                {tab === "users" ? <UserReportContainer /> : tab === "comments" ? <CommentReportContainer /> : <OfferReportContainer />}

            </div>
        </div>
    );
}



export default function Filter() {
  return (
    <Suspense fallback={<Loading />}>
        <ReportsPage />
    </Suspense>
  );
}