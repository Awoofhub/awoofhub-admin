'use client';

import { useEffect, useMemo, useState } from 'react';
import { useOfferInsights } from '@/features/offers/useOfferInsights';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChevronDown } from 'lucide-react';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const SMALL_SCREEN_BREAKPOINT = 640;

function getMonthOptions() {
    const now = new Date();
    const currentMonthIndex = now.getMonth();
    const options = [{ value: 'this-month', label: 'This month' }];
    for (let i = 0; i <= currentMonthIndex; i++) {
        options.push({ value: String(i), label: MONTH_NAMES[i] });
    }
    return options;
}

function buildWeeksInMonth(offers: { createdAt: string }[], monthIndex: number, year: number) {
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const weekCount = Math.ceil(daysInMonth / 7);

    const weeks = Array.from({ length: weekCount }, (_, i) => {
        const startDay = i * 7 + 1;
        const endDay = Math.min(startDay + 6, daysInMonth);
        return { label: `Week ${i + 1}`, startDay, endDay, offers: 0 };
    });

    offers.forEach((o) => {
        const d = new Date(o.createdAt);
        if (d.getFullYear() === year && d.getMonth() === monthIndex) {
            const day = d.getDate();
            const week = weeks.find((w) => day >= w.startDay && day <= w.endDay);
            if (week) week.offers += 1;
        }
    });

    const weekData = weeks.map(({ label, offers }) => ({ label, offers }));
    const monthTotal = weekData.reduce((sum, w) => sum + w.offers, 0);

    return [...weekData, { label: 'This month', offers: monthTotal }];
}

// Step in 5s, but extend past 30 whenever the data needs it.
function getYAxisScale(chartData: { offers: number }[]) {
    const maxValue = Math.max(0, ...chartData.map((d) => d.offers));
    const step = 5;
    const ceiling = Math.max(30, Math.ceil(maxValue / step) * step);
    const ticks = Array.from({ length: ceiling / step + 1 }, (_, i) => i * step);
    return { ceiling, ticks };
}

// "Week 3" -> "W3" on small screens; "This month" -> "Total"
function abbreviateLabel(label: string) {
    const match = label.match(/^Week (\d+)$/);
    if (match) return `W${match[1]}`;
    if (label === 'This month') return 'Total';
    return label;
}

function getIsSmallScreen() {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= SMALL_SCREEN_BREAKPOINT;
}

function useIsSmallScreen() {
    // Lazy init so the very first client render already has the right value,
    // instead of flashing full labels before the effect runs.
    const [isSmall, setIsSmall] = useState(getIsSmallScreen);

    useEffect(() => {
        const handleResize = () => setIsSmall(getIsSmallScreen());
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isSmall;
}

export default function OffersPerWeekChart() {
    const { offers, isLoading } = useOfferInsights();
    const now = new Date();
    const [selectedMonth, setSelectedMonth] = useState('this-month');
    const monthOptions = useMemo(() => getMonthOptions(), []);
    const isSmallScreen = useIsSmallScreen();

    const monthIndex = selectedMonth === 'this-month' ? now.getMonth() : Number(selectedMonth);
    const chartData = buildWeeksInMonth(offers, monthIndex, now.getFullYear());
    const { ceiling, ticks } = useMemo(() => getYAxisScale(chartData), [chartData]);

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-1">
                <div>
                    <h2 className="font-semibold text-black text-base xs:text-lg">Offers Posted Per Week</h2>
                    <p className="text-xs xs:text-sm font-medium text-muted">Awoofers weekly activities volume</p>
                </div>
                <div className="relative">
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm text-gray-700 cursor-pointer"
                    >
                        {monthOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {isLoading ? (
                <div className="h-56 flex items-center justify-center text-gray-400 text-sm">Loading...</div>
            ) : (
                <div className="h-100 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#eee" />
                            <XAxis
                                dataKey="label"
                                tick={{ fontSize: isSmallScreen ? 10 : 12, fill: '#666' }}
                                tickLine={false}
                                interval={0}
                                tickFormatter={(value: string) => (isSmallScreen ? abbreviateLabel(value) : value)}
                            />
                            <YAxis
                                domain={[0, ceiling]}
                                ticks={ticks}
                                tick={{ fontSize: 12, fill: '#666' }}
                                tickLine={false}
                                width={32}
                            />
                            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                            <Bar dataKey="offers" name="Offers" fill="#FE4F04" maxBarSize={150} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}