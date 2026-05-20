'use client';

import { useMemo } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Star } from 'lucide-react';
import { Offer } from '@/types/offer';

interface RatingDistribution {
    [star: number]: number;
}

interface ReviewChartProps {
    offer: Offer;
}

const STAR_DATA_KEY = 'count';

function inferRatingDistribution(avgRating: number, reviewCount: number): RatingDistribution {
    const clamped = Math.max(0, Math.min(5, avgRating));

    if (reviewCount === 0) {
        const blanks: RatingDistribution = {};
        for (let i = 1; i <= 5; i++) blanks[i] = 0;
        return blanks;
    }

    const exact5  = Math.round(clamped * 10) / 10;
    const intPart = Math.floor(exact5);
    const frac    = exact5 - intPart;

    const basePerStar = Math.floor(reviewCount / 5);
    const remainder   = reviewCount - 5 * basePerStar;

    const rawStars: [number, number][] = [[1, basePerStar], [2, basePerStar], [3, basePerStar], [4, basePerStar], [5, basePerStar]];
    const sorted = [...rawStars].sort(([a], [b]) => a - b);

    for (let i = 0; i < remainder; i++) {
        sorted[4]![1] += 1;
    }

    if (frac > 0 && intPart >= 1 && intPart <= 4) {
        const hi = intPart + 1;
        const lo = intPart;
        const fracShift = Math.round(frac * reviewCount);
        sorted.find(([s]) => s === hi)![1] += fracShift;
        sorted.find(([s]) => s === lo)![1] -= fracShift;
    }

    return Object.fromEntries(sorted) as RatingDistribution;
}

function buildChartData(distribution: RatingDistribution) {
    return Object.entries(distribution)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([star, count]) => ({
            star:  `${star} star${Number(star) > 1 ? 's' : ''}`,
            count: Math.max(0, count),
        }));
}

export default function ReviewChart({ offer }: ReviewChartProps) {
    const ratingDistribution = useMemo(() => {
        if (offer?.ratingDistribution && typeof offer.ratingDistribution === 'object') {
            const asNum = Object.fromEntries(
                Object.entries(offer.ratingDistribution).map(([k, v]) => [Number(k), Number(v)])
            ) as RatingDistribution;
            if (Object.values(asNum).some((v) => v > 0)) {
                return asNum;
            }
        }
        return inferRatingDistribution(offer?.avgRating ?? 0, offer?.reviewCount ?? 0);
    }, [offer]);

    const chartData = buildChartData(ratingDistribution);

    return (
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200 w-full">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Rating Distribution</h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-bold text-slate-900">{offer?.avgRating?.toFixed(1) ?? '0.0'}</span>
                    <span className="text-xs sm:text-sm text-gray-500">/ 5</span>
                </div>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                            key={n}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${n <= Math.round(offer?.avgRating ?? 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                    ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-500">({offer?.reviewCount?.toLocaleString() ?? 0} reviews)</span>
            </div>

            <div className="h-48 sm:h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="star" tick={{ fontSize: 11, fill: '#666' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#666' }} axisLine={false} tickLine={false} width={28} />
                        <Tooltip
                            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey={STAR_DATA_KEY} name="Reviews" fill="#FFC000" radius={[6, 6, 0, 0]} maxBarSize={36} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
