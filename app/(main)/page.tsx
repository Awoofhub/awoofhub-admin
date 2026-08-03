'use client'

import { Dashboardskeleton } from "@/components/dashboard/DashboardSkeleton";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentSubmissionsTable from "@/components/dashboard/RecentSubmissionsTable";
import ExpiringOffersTable from "@/components/dashboard/ExpiringOffersTable";
import OffersPerWeekChart from "@/components/dashboard/OffersPerWeekChart";
import { useDashboard } from "@/features/dashboard/useDashboard";
import {
  ChevronRight
} from 'lucide-react';
import SecondaryStatsRow from "@/components/dashboard/SecondaryStatsRow";

export default function Home() {
  const { data, isLoading } = useDashboard()


  if (isLoading) {
    return <Dashboardskeleton />
  }

  if (!data) {
    return (
      <section className="pt-14 px-6">
        <p className="text-center text-gray-500">No data.</p>
      </section>
    );
  }

  return (
    <section className="max-w-[1440px]flex flex-col w-full overflow-auto">
      <div className="py-8 px-4 mx-auto w-full">
        <div className="mb-4 flex items-center gap-1 text-xl text-black font-baloo font-semibold">
          <ChevronRight size={18} className="hidden xs:inline" />
          <span>Dashboard</span>
        </div>

        {/* Primary KPI row */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
          <StatsCard label="Total Users" value={data.users.totalActive} iconSrc="/users.svg" iconBg="bg-[#48B7F3]/20" change={{ value: 15.1, trend: 'up' }} />
          <StatsCard label="Live Offers" value={data.offers.activeOffers} iconSrc="/live.svg" iconBg="bg-[#4AD991]/20" change={{ value: 11.01, trend: 'up' }} />
          <StatsCard label="Posted Offers" value={data.offers.totalOffers} iconSrc="/posted.svg" iconBg="bg-[#8280FF]/20" change={{ value: 15.1, trend: 'up' }} />
          <StatsCard label="Pending Reviews" value={data.offers.pendingOffers} iconSrc="/pend.svg" iconBg="bg-[#FFC000]/20" change={{ value: 11.01, trend: 'up' }} />
          <StatsCard label="Open Reports" value={data.reports.pendingReports} iconSrc="/report.svg" iconBg="bg-[#E70606]/20" change={{ value: 15.1, trend: 'up' }} />
          <StatsCard label="Total Grabs" value={0} iconSrc="/grabs.svg" iconBg="bg-[#FAAE8E]/20" change={{ value: 11.01, trend: 'up' }} />
        </div>

        {/* Secondary stats row */}
        <SecondaryStatsRow
          expiredOffers={data.offers.expiredOffers}
          bannedAccounts={data.users.banned}
          totalComments={data.comments.totalComments}
        />

        <OffersPerWeekChart />

        <div className="space-y-6">
          <RecentSubmissionsTable />
          <ExpiringOffersTable />
        </div>
      </div>
    </section>
  );
};