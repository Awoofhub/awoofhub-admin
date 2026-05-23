'use client';

import DashboardDate from '@/components/dashboard/DashboardDate';
import Loading from '@/components/loading/Loading';
import { useDashboard } from '@/features/dashboard/useDashboard';
import { Users, Briefcase, ShieldAlert, Ban, PieChartIcon } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const PIE_COLORS = ['#3B82F6', '#6366F1', '#F97316', '#EF4444'];

export default function DashboardUsersPage() {
    const { data, isLoading } = useDashboard();

    if (isLoading) return <Loading />;
    if (!data) return <section className="pt-14 px-6 text-center text-gray-500">No data available.</section>;

    const stats = data.users;

    // KPI Cards
    const cards = [
        { label: 'Total Active Users', value: stats.totalActive, icon: Users, bg: 'bg-blue-100', text: 'Normal user accounts' },
        { label: 'Business Accounts', value: stats.businessActive, icon: Briefcase, bg: 'bg-indigo-100', text: 'Active businesses' },
        { label: 'Suspended', value: stats.suspended, icon: ShieldAlert, bg: 'bg-orange-100', text: 'Temporarily restricted' },
        { label: 'Banned', value: stats.banned, icon: Ban, bg: 'bg-red-100', text: 'Permanently removed' },
    ];

    // Chart Data
    const donutData = [
        { name: 'Active Users', value: stats.totalActive },
        { name: 'Businesses', value: stats.businessActive },
        { name: 'Suspended', value: stats.suspended },
        { name: 'Banned', value: stats.banned },
    ].filter((d) => d.value > 0);

    return (
        <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
            <div className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 mx-auto w-full max-w-360 flex flex-col h-full overflow-auto">

                <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Users Analytics</h1>
                    <DashboardDate />
                </header>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {cards.map((card) => {
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

                {/* CHART SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-80">
                        <div className="flex items-center gap-2 mb-4">
                            <PieChartIcon className="w-5 h-5 text-gray-600" />
                            <h2 className="font-bold text-gray-800">User Distribution</h2>
                        </div>
                        {donutData.length === 0 ? (
                            <div className="flex h-full items-center justify-center text-gray-400">No data yet.</div>
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

            </div>
        </section>
    );
}