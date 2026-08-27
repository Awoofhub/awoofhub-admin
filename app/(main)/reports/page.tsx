'use client';

import CommentReportContainer from '@/components/reports/CommentReportContainer';
import OfferReportContainer from '@/components/reports/OfferReportContainer';
import ReportTabs from '@/components/reports/ReportTab';
import UserReportContainer from '@/components/reports/UserReportContainer';
import { useFilter } from '@/features/offers/useFilter';
import { usePendingReportsCount } from '@/features/reports/usePendingReportsCount';
import { ReportTabsCount } from '@/types/report';
import { ChevronRight } from 'lucide-react';
import { use } from 'react';


type FilterParams = {
    tab?: string,
};

interface FilterProps {
    searchParams: Promise<FilterParams>;
}


export default function ReportsPage({ searchParams }: FilterProps) {

    const params = use(searchParams);
    const { tab } = params;

    const updateTab = useFilter();

    const Tabs: { value: keyof ReportTabsCount | undefined; label: string }[] = [
        { value: undefined, label: "Offer" },
        { value: "users", label: "User" },
        { value: "comments", label: "Comment" },
    ];

    const { data: pendingReportsCount } = usePendingReportsCount()

    return (
        <div className="p-4 bg-[#FAFAFA]">

            <div className="flex justify-between items-center">

                <div className="my-4 flex items-center gap-1 text-xl text-black font-baloo font-semibold">
                    <ChevronRight size={18} className="hidden xs:inline" />
                    <span>Reports</span>
                </div>

                <span className="text-primary">{`${pendingReportsCount ?? 0} new reports`}</span>
            </div>


            <div className="mb-6">
                <ReportTabs
                    activeTab={tab}
                    onChange={(value) => updateTab("tab", value)}
                    tabs={Tabs}
                />
            </div>


            <div className="max-w-[1440px] mx-auto">

               {tab === "users" ? <UserReportContainer /> : tab === "comments" ? <CommentReportContainer /> : <OfferReportContainer/>}

            </div>
        </div>
    );
}