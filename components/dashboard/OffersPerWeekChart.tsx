'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDashboardOfferChart } from '@/features/dashboard/useDashboardOfferChart';
import { DashboardOfferChartData } from '@/types/dashboard';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import MonthYearPicker from './MonthYearPicker';

const SMALL_SCREEN_BREAKPOINT = 640;

function toQueryMonth(monthIndex: number, year: number) {
    const mm = (monthIndex + 1).toString().padStart(2, '0');
    return `${year}-${mm}`;
}

function toChartData(data: DashboardOfferChartData | undefined, monthIndex: number, year: number) {
    if (!data) return [];
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const weekCount = Math.ceil(daysInMonth / 7);
    const allWeeks = [
        { label: 'Week 1', offers: data.weekOne },
        { label: 'Week 2', offers: data.weekTwo },
        { label: 'Week 3', offers: data.weekThree },
        { label: 'Week 4', offers: data.weekFour },
        { label: 'Week 5', offers: data.weekFive },
    ];
    return allWeeks.slice(0, weekCount);
}

function getYAxisScale(chartData: { offers: number }[]) {
    const maxValue = Math.max(0, ...chartData.map((d) => d.offers));
    const step = 5;
    const ceiling = Math.max(30, Math.ceil(maxValue / step) * step);
    const ticks = Array.from({ length: ceiling / step + 1 }, (_, i) => i * step);
    return { ceiling, ticks };
}

function abbreviateLabel(label: string) {
    const match = label.match(/^Week (\d+)$/);
    if (match) return `W${match[1]}`;
    return label;
}

function getIsSmallScreen() {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= SMALL_SCREEN_BREAKPOINT;
}

function useIsSmallScreen() {
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
    const now = new Date();
    const maxMonthIndex = now.getMonth();
    const maxYear = now.getFullYear();

    const [monthIndex, setMonthIndex] = useState(maxMonthIndex);
    const [year, setYear] = useState(maxYear);
    const isSmallScreen = useIsSmallScreen();

    const selectedMonth = toQueryMonth(monthIndex, year);

    const { data, isLoading } = useDashboardOfferChart({ month: selectedMonth });
    const chartData = useMemo(() => toChartData(data, monthIndex, year), [data, monthIndex, year]);
    const { ceiling, ticks } = useMemo(() => getYAxisScale(chartData), [chartData]);

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
            <div className="flex items-center gap-2 justify-between mb-1">
                <div>
                    <h2 className="font-semibold text-black text-sm xs:text-base lg:text-lg">Offers Posted Per Week</h2>
                    <p className="text-[10px] xs:text-xs lg:text-sm font-medium text-muted">Awoofers weekly activities volume</p>
                </div>
                <MonthYearPicker
                    monthIndex={monthIndex}
                    year={year}
                    maxMonthIndex={maxMonthIndex}
                    maxYear={maxYear}
                    onChange={(newMonthIndex, newYear) => {
                        setMonthIndex(newMonthIndex);
                        setYear(newYear);
                    }}
                />
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
                            <YAxis domain={[0, ceiling]} ticks={ticks} tick={{ fontSize: 12, fill: '#666' }} tickLine={false} width={32} />
                            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                            <Bar dataKey="offers" name="Offers" fill="#FE4F04" maxBarSize={150} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}