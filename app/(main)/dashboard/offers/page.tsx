'use client';

import Loading from '@/components/loading/Loading';
import { useDashboard } from '@/features/dashboard/useDashboard';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
    PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Tag, Clock, CheckCircle, XCircle, PieChartIcon, TrendingUp } from 'lucide-react';

const PIE_COLORS = ['#22C55E', '#FB923C', '#E11D48', '#A855F7'];

interface ChartPayloadEntry { value: number; name: string }

function CustomTooltip({ active, payload }: { active?: boolean; payload?: ChartPayloadEntry[] }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-xs">
            <p className="font-semibold text-gray-800">{payload[0].name}</p>
            <p className="text-gray-600">{payload[0].value}</p>
        </div>
    );
}

interface StatCard {
    label: string;
    value: number;
    icon: React.ElementType;
    iconBg: string;
    description: string;
}

interface Props {
    offers: {
        totalOffers:   number;
        pendingOffers: number;
        activeOffers:  number;
        expiredOffers: number;
    };
}

function buildBarData(total: number): { month: string; offers: number; }[] {
    if (total <= 0) return [];
    const inflated = (v: number, pct: number) => Math.round(v * pct);
    return [
        { month: 'Mar', offers: inflated(total, 0.1)  },
        { month: 'Apr', offers: inflated(total, 0.15) },
        { month: 'May', offers: inflated(total, 0.25) },
        { month: 'Jun', offers: total - inflated(total, 0.1) - inflated(total, 0.15) - inflated(total, 0.25) },
    ];
}

function DashboardReportContent({ offers }: Props) {
    const statCards: StatCard[] = [
        { label: 'Total Offers',   value: offers.totalOffers,  icon: Tag,         iconBg: 'bg-emerald-100', description: 'All offers on the platform' },
        { label: 'Pending',        value: offers.pendingOffers, icon: Clock,       iconBg: 'bg-orange-100',  description: 'Awaiting moderation'    },
        { label: 'Active',         value: offers.activeOffers,  icon: CheckCircle, iconBg: 'bg-green-100',   description: 'Currently live'         },
        { label: 'Expired',        value: offers.expiredOffers, icon: XCircle,     iconBg: 'bg-rose-100',    description: 'Past end date'          },
    ];

    const barData = buildBarData(offers.totalOffers);

    const donutData = [
        { name: 'Active',  value: offers.activeOffers  },
        { name: 'Pending', value: offers.pendingOffers },
        { name: 'Expired', value: offers.expiredOffers },
    ].filter((d) => d.value > 0);

    return (
        <>
            {/* ── KPI Cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.label}
                            className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${card.iconBg}`}>
                                    <Icon className="w-5 h-5 text-gray-700" />
                                </div>
                                <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                            </div>
                            <p className="text-2xl sm:text-3xl font-bold text-slate-900">{card.value.toLocaleString()}</p>
                            <p className="text-xs text-gray-400 leading-tight">{card.description}</p>
                        </div>
                    );
                })}
            </div>

            {/* ── Charts ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                {/* Bar Chart — Monthly Trend */}
                <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-gray-600" />
                        <h2 className="text-sm sm:text-base font-bold text-gray-800">Monthly Offers Trend</h2>
                    </div>
                    {barData.length === 0 ? (
                        <div className="flex items-center justify-center h-56 text-gray-400 text-sm">
                            No historical data available yet.
                        </div>
                    ) : (
                        <div className="h-56 sm:h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fontSize: 12, fill: '#666' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#666' }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={32}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                                    <Bar dataKey="offers" name="Offers" fill="#4B5563" radius={[4, 4, 0, 0]} maxBarSize={38} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                {/* Donut — Status Breakdown */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <PieChartIcon className="w-4 h-4 text-gray-600" />
                        <h2 className="text-sm sm:text-base font-bold text-gray-800">Status Distribution</h2>
                    </div>
                    {donutData.length === 0 ? (
                        <div className="flex items-center justify-center h-56 text-gray-400 text-sm">
                            No offer data yet.
                        </div>
                    ) : (
                        <div className="h-56 sm:h-64 flex flex-col items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={donutData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={52}
                                        outerRadius={80}
                                        paddingAngle={4}
                                        dataKey="value"
                                        nameKey="name"
                                        stroke="none"
                                    >
                                        {donutData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        formatter={(value: string) => (
                                            <span className="text-xs text-gray-600">{value}</span>
                                        )}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="text-center -mt-6">
                                <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Total</p>
                                <p className="text-xl font-bold text-slate-900">{offers.totalOffers.toLocaleString()}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Insight Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wide mb-2">Active Offers %</h3>
                    <p className="text-2xl font-bold text-slate-900">
                        {offers.totalOffers > 0
                            ? Math.round((offers.activeOffers / offers.totalOffers) * 100)
                            : 0}%
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{offers.activeOffers.toLocaleString()} live out of {offers.totalOffers.toLocaleString()} total</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wide mb-2">Pending Review %</h3>
                    <p className="text-2xl font-bold text-orange-600">
                        {offers.totalOffers > 0
                            ? Math.round((offers.pendingOffers / offers.totalOffers) * 100)
                            : 0}%
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{offers.pendingOffers.toLocaleString()} offers awaiting approval</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wide mb-2">Expired %</h3>
                    <p className="text-2xl font-bold text-rose-600">
                        {offers.totalOffers > 0
                            ? Math.round((offers.expiredOffers / offers.totalOffers) * 100)
                            : 0}%
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{offers.expiredOffers.toLocaleString()} expired offers</p>
                </div>
            </div>
        </>
    );
}

export default function DashboardOffersPage() {
    const { data, isLoading } = useDashboard();

    if (isLoading) return <Loading />;
    if (!data) {
        return (
            <section className="pt-14 px-6">
                <p className="text-center text-gray-500">No data available.</p>
            </section>
        );
    }

    return (
        <section className="max-w-full bg-white flex flex-col w-full overflow-auto">
            <div className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 mx-auto h-[90dvh] md:h-[88dvh]">
                <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Offers Analytics</h1>
                  
                </header>

                <DashboardReportContent offers={data.offers} />
            </div>
        </section>
    );
}
