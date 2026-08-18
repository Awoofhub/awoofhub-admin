'use client'

import ExpiringTable from "@/components/dashboard/ExpiringTable";
import OffersPerWeekChart from "@/components/dashboard/OffersPerWeekChart";
import SecondaryStatsRow from "@/components/dashboard/SecondaryStatsRow";
import StatsCard from "@/components/dashboard/StatsCard";
import TrendingTable from "@/components/dashboard/TrendingTable";
import Loading from "@/components/loading/Loading";
import { useDashboard } from "@/features/dashboard/useDashboard";
import { ChevronRight } from 'lucide-react';


export default function Home() {
  const { data, isLoading } = useDashboard()

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return (
      <section className="pt-14 px-6">
        <p className="text-center text-gray-500">No data.</p>
      </section>
    );
  }

  return (
    <section className=" flex flex-col w-full overflow-auto">

      <div className="pt-6 pb-10 px-4 max-w-[1440px] mx-auto w-full">

        <div className="mb-4 flex items-center gap-2 text-xl text-black font-baloo font-semibold">
          <ChevronRight size={18} className="hidden xs:inline" />
          <span>Dashboard</span>
        </div>

        {/* Primary KPI row */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
          <StatsCard label="Total Users" value={data.users.totalUsers} iconSrc="/users.svg" iconBg="bg-[#48B7F3]/20" />
          <StatsCard label="Live Offers" value={data.offers.activeOffers} iconSrc="/live.svg" iconBg="bg-[#4AD991]/20" />
          <StatsCard label="Posted Offers" value={data.offers.totalOffers} iconSrc="/posted.svg" iconBg="bg-[#8280FF]/20" />
          <StatsCard label="Total Grabs" value={data.clicks.totalClicks} iconSrc="/grabs.svg" iconBg="bg-[#FAAE8E]/20" />
        </div>

        <SecondaryStatsRow />

        <OffersPerWeekChart />
        
        <div className="space-y-4">
          <TrendingTable />
          <ExpiringTable />
        </div>

      </div>
    </section >
  );
};

