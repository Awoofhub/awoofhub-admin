'use client';

import DashboardDate from '@/components/dashboard/DashboardDate';
import Loading from '@/components/loading/Loading';
import { useDashboard } from '@/features/dashboard/useDashboard';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { FileText, AlertCircle, CheckCircle2, XCircle, PieChartIcon } from 'lucide-react';
import LoadingSkeleton from '@/components/loading/LoadingSkeleton';

const PIE_COLORS = ['#3B82F6', '#22C55E', '#EF4444'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReportsAnalyticsContent({ reports }: { reports: any }) {
    const statCards = [
        { label: 'Total Reports', value: reports.totalReports, icon: FileText, bg: 'bg-indigo-100', text: 'All submitted reports' },
        { label: 'Pending Review', value: reports.pendingReports, icon: AlertCircle, bg: 'bg-orange-100', text: 'Awaiting admin action' },
        { label: 'Resolved', value: reports.activeReports, icon: CheckCircle2, bg: 'bg-green-100', text: 'Action taken & closed' },
        { label: 'Dismissed', value: reports.expiredReports, icon: XCircle, bg: 'bg-gray-100', text: 'Invalid or spam reports' },
    ];

    const donutData = [
        { name: 'Pending', value: reports.pendingReports },
        { name: 'Resolved', value: reports.activeReports },
        { name: 'Dismissed', value: reports.expiredReports },
    ].filter((d) => d.value > 0);

    return (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`p-2 rounded-lg ${card.bg}`}><Icon className="w-5 h-5 text-gray-700" /></div>
                                <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                            </div>
                            <p className="text-3xl font-bold text-slate-900">{card.value.toLocaleString()}</p>
                            <p className="text-xs text-gray-400 mt-1">{card.text}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-80">
                    <div className="flex items-center gap-2 mb-4">
                        <PieChartIcon className="w-5 h-5 text-gray-600" />
                        <h2 className="font-bold text-gray-800">Resolution Breakdown</h2>
                    </div>
                    {donutData.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-gray-400">No report data yet.</div>
                    ) : (
                        <ResponsiveContainer width="100%" height="80%">
                            <PieChart>
                                <Pie data={donutData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                                    {donutData.map((_, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                                </Pie>
                                <Tooltip wrapperClassName="rounded-lg shadow-lg border-none" />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </>
    );
}

export default function DashboardReportsPage() {
    const { data, isLoading } = useDashboard();

    if (isLoading) return <LoadingSkeleton />;
    if (!data) return <section className="pt-14 px-6 text-center text-gray-500">No data available.</section>;

    return (
        <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
            <div className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 mx-auto w-full max-w-360 flex flex-col h-full overflow-auto">
                <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Reports Analytics</h1>
                    <DashboardDate />
                </header>
                <ReportsAnalyticsContent reports={data.reports} />
            </div>
        </section>
    );
}