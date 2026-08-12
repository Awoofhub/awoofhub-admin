<<<<<<< HEAD
"use client";

import AdminOfferListSkeleton from "@/components/offers/admin/AdminOfferListSkeleton";
import AdminOfferPaginatedList from "@/components/offers/admin/AdminOfferPaginatedList";
import { OfferDateRangePicker } from "@/components/offers/admin/OfferDateRangePicker";
import { OfferSelectDropdown } from "@/components/offers/admin/OfferSelectDropdown";
import { useOffersAdmin } from "@/features/offers/useOffersAdmin";
import { RotateCcw, ListFilter } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
type FilterValue = string;

interface Filters {
  dealType: FilterValue;
  search: FilterValue;
  category: FilterValue;
  status: FilterValue;
  createdFrom: FilterValue;
  createdTo: FilterValue;
  page: number;
  limit: number;
}

const DEAL_TYPES = [
  ["deal", "Deal"],
  ["promo", "Promo"],
  ["sale", "Sale"],
  ["featured", "Featured"],
];

const CATEGORY_OPTIONS = [
  { value: "food", label: "Food" },
  { value: "fashion", label: "Fashion" },
  { value: "travel", label: "Travel" },
  { value: "beauty", label: "Beauty" },
];

const STATUS_OPTIONS = [
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

const initialFilters: Filters = {
  dealType: "",
  search: "",
  category: "",
  status: "",
  createdFrom: "",
  createdTo: "",
  page: 1,
  limit: 10,
};

export default function OffersPage() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [debouncedSearch] = useDebounce(filters.search, 500);

  const {
    data,
    isLoading: offersLoading,
    error,
  } = useOffersAdmin({
    externalLink: "",
    brandName: "",
    dealType: filters.dealType,
    search: debouncedSearch,
    category: filters.category,
    status: filters.status,
    createdFrom: filters.createdFrom,
    createdTo: filters.createdTo,
    page: filters.page,
    limit: filters.limit,
  });

  const resetFilters = useCallback(() => setFilters(initialFilters), []);
  const updateFilters = useCallback(
    (partial: Partial<Filters>) =>
      setFilters((prev) => ({ ...prev, ...partial })),
    [],
  );

  const hasActiveFilters = useMemo(
    () =>
      Boolean(
        filters.search ||
        filters.category ||
        filters.status ||
        filters.dealType ||
        filters.createdTo ||
        filters.createdFrom,
      ),
    [filters],
  );

  if (error) {
    return (
      <section className="pt-14 px-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-red-700 mb-2">
            Error Loading Offers
          </h2>
          <p className="text-red-600">
            {error.message || "Failed to load offers"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
      <div className="relative z-40 flex flex-col md:flex-row gap-3 py-3 items-start md:items-center mb-4 border-b border-muted/20">
        <div className="hidden md:flex shrink-0 items-center gap-2 font-baloo text-[16px] font-semibold text-primary border-r border-muted/20 pr-2 lg:pr-4">
          <ListFilter size={18} strokeWidth={2.5} />
          <span>Filters</span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full">
          <div
            className="flex overflow-x-auto flex-nowrap items-start w-full no-scrollbar flex-1 gap-3"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <OfferSelectDropdown
              placeholder="Deals type"
              options={DEAL_TYPES.map(([value, label]) => ({ value, label }))}
              value={filters.dealType}
              onChange={(value) => updateFilters({ dealType: value, page: 1 })}
              width="w-[150px]"
              dropdownWidth="w-[170px]"
              primaryWhenEmpty
            />

            <OfferSelectDropdown
              placeholder="Category"
              options={CATEGORY_OPTIONS}
              value={filters.category}
              onChange={(value) => updateFilters({ category: value, page: 1 })}
              width="w-[170px]"
              dropdownWidth="w-[200px]"
            />

            <OfferSelectDropdown
              placeholder="Status"
              options={STATUS_OPTIONS}
              value={filters.status}
              onChange={(value) => updateFilters({ status: value, page: 1 })}
              width="w-[150px]"
              dropdownWidth="w-[180px]"
            />

            <OfferDateRangePicker
              createdFrom={filters.createdFrom}
              createdTo={filters.createdTo}
              onApply={({ createdFrom, createdTo }) =>
                updateFilters({ createdFrom, createdTo, page: 1 })
              }
            />

            <input
              type="text"
              value={filters.search}
              onChange={(e) =>
                updateFilters({ search: e.target.value, page: 1 })
              }
              placeholder="Search offers"
              className="px-3 py-2 text-sm border border-gray-200 rounded-full focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-700 w-[180px]"
            />
          </div>

          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="flex items-center gap-1 px-2 text-sm transition disabled:text-gray-400 disabled:cursor-not-allowed text-gray-500 font-medium hover:text-gray-800 cursor-pointer"
          >
            Reset <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 lg:-mb-10 flex flex-col bg-white rounded-lg border border-gray-100 overflow-hidden">
        {offersLoading ? (
          <div className="flex-1 overflow-auto p-4">
            <AdminOfferListSkeleton number={5} />
          </div>
        ) : data?.offers && data.offers.length > 0 ? (
          <AdminOfferPaginatedList
            offers={data.offers}
            currentPage={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) => updateFilters({ page })}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[40vh]">
            <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">
              No Offers Found
            </h2>
            <p className="text-sm sm:text-base text-gray-500 text-center px-4">
              {hasActiveFilters
                ? "Try adjusting your filters or search criteria"
                : "No offers have been created yet"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
=======
'use client';


export default function OffersPage() {
  
   
}
>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b
