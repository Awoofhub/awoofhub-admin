'use client'

<<<<<<< HEAD
import { Dashboardskeleton } from "@/components/dashboard/DashboardSkeleton";
=======
import DashboardDate from "@/components/dashboard/DashboardDate";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b
import StatsCard from "@/components/dashboard/StatsCard";
import RecentSubmissionsTable from "@/components/dashboard/RecentSubmissionsTable";
import ExpiringOffersTable from "@/components/dashboard/ExpiringOffersTable";
import OffersPerWeekChart from "@/components/dashboard/OffersPerWeekChart";
import { useDashboard } from "@/features/dashboard/useDashboard";
<<<<<<< HEAD
import {
  ChevronRight
} from 'lucide-react';
import SecondaryStatsRow from "@/components/dashboard/SecondaryStatsRow";
import Loading from "@/components/loading/Loading";
=======
import { AlertCircle, Briefcase, CalendarX, CheckCircle, CheckCircle2, Clock, FileText, ShieldAlert, Tag, Users, UserX, XCircle } from 'lucide-react';

>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b

export default function Home() {
  const { data, isLoading } = useDashboard()


  if (isLoading) {
<<<<<<< HEAD
    return <Loading/>
=======
    return <DashboardSkeleton />
>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b
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

<<<<<<< HEAD
        <div className="space-y-6">
          <RecentSubmissionsTable />
          <ExpiringOffersTable />
=======
          <section className="bg-gray-100 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-black mb-6">Offers</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatsCard label="Total Offers" value={data.offers.totalOffers} icon={Tag} iconBg="bg-green-100" />
              <StatsCard label="Pending" value={data.offers.pendingOffers} icon={Clock} iconBg="bg-blue-200" />
              <StatsCard label="Active" value={data.offers.activeOffers} icon={CheckCircle} iconBg="bg-emerald-200" />
              <StatsCard label="Expired" value={data.offers.expiredOffers} icon={CalendarX} iconBg="bg-rose-200" />
            </div>
          </section>

          <section className="bg-gray-100 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-black mb-6">Reports</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatsCard label="Active Reports" value={data.reports.totalReports} icon={FileText} iconBg="bg-green-200" />
              <StatsCard label="Pending Review" value={data.reports.pendingReports} icon={AlertCircle} iconBg="bg-blue-200" />
              <StatsCard label="Resolved" value={data.reports.activeReports} icon={CheckCircle2} iconBg="bg-amber-200" />
              <StatsCard label="Dismissed" value={data.reports.expiredReports} icon={XCircle} iconBg="bg-rose-200" />
            </div>
          </section>
>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b
        </div>
      </div>
    </section>
  );
};