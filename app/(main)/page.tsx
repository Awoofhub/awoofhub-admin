'use client'

import DashboardDate from "@/components/dashboard/DashboardDate";
import { Dashboardskeleton } from "@/components/dashboard/DashboardSkeleton";
import StatsCard from "@/components/dashboard/StatsCard";
// import Loading from "@/components/loading/Loading";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import { useDashboard } from "@/features/dashboard/useDashboard";
import { AlertCircle, Briefcase, CalendarX, CheckCircle, CheckCircle2, Clock, FileText, MessageSquare, ShieldAlert, Tag, Users, UserX, XCircle } from 'lucide-react';


export default function Home() {
  const { data, isLoading } = useDashboard()

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (!data) {
    return (
      <section className="pt-14 px-6">
        <p className="text-center text-gray-500">No data.</p>
      </section>
    );
  }

  return (
    <section className="max-w-360 bg-white flex flex-col w-full overflow-auto">

      <div className="py-8 px-4 mx-auto h-[90dvh] md:h-[88dvh]">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Welcome Admin</h1>
          <div className="flex gap-4">
            <DashboardDate />
          </div>
        </header>

        <nav className="mb-8">
          <button className="bg-[#4E260C] text-white px-6 py-2 rounded-lg font-semibold">
            Overview
          </button>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-w-[450px] md:min-w-[900px]">
          <section className="bg-gray-100 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-black mb-6">Users</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatsCard label="Active Users" value={data.users.totalActive} icon={Users} iconBg="bg-green-200" />
              <StatsCard label="Business Account" value={data.users.businessActive} icon={Briefcase} iconBg="bg-blue-200" />
              <StatsCard label="Suspended" value={data.users.suspended} icon={ShieldAlert} iconBg="bg-amber-200" />
              <StatsCard label="Banned" value={data.users.banned} icon={UserX} iconBg="bg-rose-200" />
            </div>
          </section>

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

          <section className="bg-gray-100 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-black mb-6">Comments</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatsCard label="Total Comments" value={data.comments.totalComments} icon={MessageSquare} iconBg="bg-indigo-200" />
            </div>
          </section>
        </div>
      </div>
    </section >
  );
};

