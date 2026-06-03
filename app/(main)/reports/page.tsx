'use client';

import { useState, useCallback, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import ReportPaginatedList from '@/components/reports/ReportPaginatedList';
import SearchInput from '@/components/offers/admin/SearchInput';
import { useReportsAdmin } from '@/features/reports/useReportsAdmin';
import { useModerateReport } from '@/features/reports/useModerateReport';

interface Filters {
    search: string;
    status: string;
    targetType: string;
    page: number;
    limit: number;
}

const initialFilters: Filters = { search: '', status: '', targetType: '', page: 1, limit: 10 };

export default function ReportsPage() {
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const { data, isLoading, error } = useReportsAdmin(filters);
    const { mutate: moderateReport, isPending } = useModerateReport();

    const updateFilters = useCallback((partial: Partial<Filters>) => setFilters(prev => ({ ...prev, ...partial })), []);
    const hasActiveFilters = useMemo(() => Boolean(filters.search || filters.status || filters.targetType), [filters]);

    const handleModerate = (id: string, action: 'resolved' | 'dismissed') => {
        if (confirm(`Are you sure you want to mark this report as ${action}?`)) {
            moderateReport({ id, status: action });
        }
    };

    if (error) return (
        <section className="pt-14 px-6 w-full h-[90dvh] flex flex-col"><div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg mx-auto"><h2 className="text-lg font-bold text-red-700 mb-2">Error</h2><p className="text-red-600">{error.message}</p></div></section>
    );

    return (
        <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
            <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full max-w-360 flex flex-col h-full">

                <header className="mb-4 sm:mb-6 shrink-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Reports Management</h1>
                </header>

                {/* Filters */}
                <div className="mb-4 sm:mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg shrink-0">
                    <div className="sm:col-span-2"><SearchInput value={filters.search} onChange={(val) => updateFilters({ search: val, page: 1 })} /></div>

                    <select value={filters.status} onChange={(e) => updateFilters({ status: e.target.value, page: 1 })} className="px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none bg-white">
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                        <option value="dismissed">Dismissed</option>
                    </select>

                    <select value={filters.targetType} onChange={(e) => updateFilters({ targetType: e.target.value, page: 1 })} className="px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none bg-white">
                        <option value="">All Target Types</option>
                        <option value="user">User</option>
                        <option value="offer">Offer</option>
                        <option value="comment">Comment</option>
                    </select>

                    <button onClick={() => setFilters(initialFilters)} disabled={!hasActiveFilters} className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-gray-800 font-semibold rounded-lg flex items-center justify-center gap-2">
                        <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                </div>

                {/* Main Table Content */}
                <div className="flex-1 min-h-0 flex flex-col bg-white rounded-lg border border-gray-100">
                    {isLoading ? (
                        <div className="flex-1 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
                    ) : data?.reports && data.reports.length > 0 ? (
                        <div className="flex-1 overflow-auto">
                            <ReportPaginatedList reports={data.reports} currentPage={filters.page} totalPages={data.totalPages} onPageChange={(page) => updateFilters({ page })} onModerateClick={handleModerate} />
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center"><h2 className="text-lg font-bold text-gray-700">No Reports Found</h2></div>
                    )}
                </div>
            </div>
        </section>
    );
}