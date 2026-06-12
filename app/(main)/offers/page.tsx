'use client';

import AdminOfferListSkeleton from '@/components/offers/admin/AdminOfferListSkeleton';
import AdminOfferPaginatedList from '@/components/offers/admin/AdminOfferPaginatedList';
import CategorySelect from '@/components/offers/admin/CategorySelect';
import SearchInput from '@/components/offers/admin/SearchInput';
import StatusSelect from '@/components/offers/admin/StatusSelect';
import { useOffersAdmin } from '@/features/offers/useOffersAdmin';
import { RotateCcw } from 'lucide-react'; // Better Reset icon
import { useCallback, useMemo, useState } from 'react';

type FilterValue = string;

interface Filters {
    search: FilterValue;
    category: FilterValue;
    status: FilterValue;
    createdFrom: FilterValue;
    createdTo: FilterValue;
    page: number;
    limit: number;
}

const initialFilters: Filters = {
    search: '',
    category: '',
    status: '',
    createdFrom: '',
    createdTo: '',
    page: 1,
    limit: 10,
};

export default function OffersPage() {
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const { data, isLoading: offersLoading, error } = useOffersAdmin(filters);

    const resetFilters = useCallback(() => setFilters(initialFilters), []);
    const updateFilters = useCallback((partial: Partial<Filters>) => setFilters((prev) => ({ ...prev, ...partial })), []);

    const hasActiveFilters = useMemo(
        () => Boolean(filters.search || filters.category || filters.status || filters.createdTo || filters.createdFrom),
        [filters.search, filters.category, filters.status, filters.createdTo, filters.createdFrom],
    );

    if (error) {
        return (
            <section className="pt-14 px-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-lg font-bold text-red-700 mb-2">Error Loading Offers</h2>
                    <p className="text-red-600">{error.message || 'Failed to load offers'}</p>
                </div>
            </section>
        );
    }

    return (

        <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
            <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full flex flex-col h-full">

                {/* Header*/}
                <header className="mb-4 sm:mb-6 shrink-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Offers Management</h1>
                </header>

                {/* Filters Row */}
                <div className="mb-4 sm:mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 bg-gray-50 p-3 sm:p-4 rounded-lg shrink-0">
                    <div className="sm:col-span-2 lg:col-span-2">
                        <SearchInput
                            value={filters.search}
                            onChange={(val) => {
                                setFilters((prev) => {
                                    if (prev.search === val) return prev;
                                    return { ...prev, search: val, page: 1 };
                                });
                            }}
                        />
                    </div>

                    <CategorySelect value={filters.category} onChange={(value) => updateFilters({ category: value, page: 1 })} />
                    <StatusSelect value={filters.status} onChange={(value) => updateFilters({ status: value, page: 1 })} />

                    {/* End Date Filter  */}
                    <input
                        type="date"
                        value={filters.createdTo}
                        onChange={(e) => updateFilters({ createdTo: e.target.value, page: 1 })}
                        className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-700"
                        title="End Date Filter"
                    />

                    <button
                        onClick={resetFilters}
                        disabled={!hasActiveFilters}
                        className="px-3 sm:px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-800 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span className="hidden sm:inline">Reset</span>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-h-0 lg:-mb-10 flex flex-col bg-white rounded-lg border border-gray-100 overflow-hidden">
                    {offersLoading ? (
                        <div className=" flex-1 overflow-auto p-4"><AdminOfferListSkeleton number={5} /></div>
                    ) : data?.offers && data.offers.length > 0 ? (

                        <AdminOfferPaginatedList
                            offers={data.offers}
                            currentPage={filters.page}
                            totalPages={data.totalPages}
                            onPageChange={(page) => updateFilters({ page })}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full min-h-[40vh]">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">No Offers Found</h2>
                            <p className="text-sm sm:text-base text-gray-500 text-center px-4">
                                {hasActiveFilters ? 'Try adjusting your filters or search criteria' : 'No offers have been created yet'}
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}