'use client';

import { Spinner } from '@chakra-ui/react';
import { useState, useCallback, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import BusinessOfferListSkeleton from '@/components/offers/business/BusinessOfferListSkeleton';
import BusinessOfferPaginatedList from '@/components/offers/business/BusinessOfferPaginatedList';
import CategorySelect from '@/components/offers/business/CategorySelect';
import OfferStatsCards from '@/components/offers/business/OfferStatsCards';
import StatusSelect from '@/components/offers/business/StatusSelect';
import { useOfferStats } from '@/features/offers/useOfferStats';
import { useOffersAdmin } from '@/features/offers/useOffersAdmin';

type FilterValue = string;

interface Filters {
    search: FilterValue;
    category: FilterValue;
    status: FilterValue;
    page: number;
    limit: number;
}

const initialFilters: Filters = {
    search: '',
    category: '',
    status: '',
    page: 1,
    limit: 10,
};

export default function OffersPage() {
    const [filters, setFilters] = useState<Filters>(initialFilters);

    const { stats, isLoading: statsLoading } = useOfferStats();
    const { data, isLoading: offersLoading, error } = useOffersAdmin(filters);

    const resetFilters = useCallback(() => {
        setFilters(initialFilters);
    }, []);

    const updateFilters = useCallback((partial: Partial<Filters>) => {
        setFilters((prev) => ({ ...prev, ...partial }));
    }, []);

    const hasActiveFilters = useMemo(
        () => Boolean(filters.search || filters.category || filters.status),
        [filters.search, filters.category, filters.status],
    );

    if (error) {
        return (
            <section className="pt-14 px-6">
                <OfferError error={error} />
            </section>
        );
    }

    return (
        <section className="max-w-full bg-white flex flex-col w-full overflow-auto">
            <div className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 mx-auto h-[90dvh] md:h-[88dvh]">
                {/* Header */}
                <header className="mb-4 sm:mb-6 md:mb-8 flex items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Offers Management</h1>
                    {/* Stats strip */}
                    {statsLoading ? (
                        <Spinner size="sm" />
                    ) : (
                        stats && (
                            <div className="hidden xl:block min-w-[320px]">
                                <OfferStatsCards stats={stats} />
                            </div>
                        )
                    )}
                </header>

                {/* Stats strip — full-width on smaller screens */}
                {!statsLoading && stats && (
                    <div className="xl:hidden mb-6">
                        <OfferStatsCards stats={stats} />
                    </div>
                )}

                {/* Filters */}
                <div className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 bg-gray-50 p-3 sm:p-4 md:p-6 rounded-lg">
                    {/* Search */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <SearchInput
                            value={filters.search}
                            onChange={(value) => updateFilters({ search: value, page: 1 })}
                        />
                    </div>

                    {/* Category */}
                    <CategorySelect
                        value={filters.category}
                        onChange={(value) => updateFilters({ category: value, page: 1 })}
                    />

                    {/* Status */}
                    <StatusSelect
                        value={filters.status}
                        onChange={(value) => updateFilters({ status: value, page: 1 })}
                    />

                    {/* Reset */}
                    <button
                        onClick={resetFilters}
                        disabled={!hasActiveFilters}
                        className="px-3 sm:px-4 py-2 text-sm bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400 text-gray-800 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                        <Filter className="w-4 h-4" />
                        <span className="hidden sm:inline">Reset</span>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto">
                    {offersLoading && <BusinessOfferListSkeleton number={5} />}
                    {!offersLoading && data?.offers && data.offers.length > 0 ? (
                        <div className="w-full">
                            <BusinessOfferPaginatedList
                                offers={data.offers}
                                currentPage={filters.page}
                                totalPages={data.totalPages}
                                onPageChange={(page) => updateFilters({ page })}
                            />
                        </div>
                    ) : (
                        !offersLoading &&
                        !error && (
                            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">No Offers Found</h2>
                                <p className="text-sm sm:text-base text-gray-500 text-center px-4">
                                    {hasActiveFilters
                                        ? 'Try adjusting your filters or search criteria'
                                        : 'No offers have been created yet'}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
