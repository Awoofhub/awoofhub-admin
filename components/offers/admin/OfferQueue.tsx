"use client";

import AdminOfferListSkeleton from "@/components/offers/admin/AdminOfferListSkeleton";
import AdminOfferPaginatedList from "@/components/offers/admin/AdminOfferPaginatedList";
import { OfferDateRangePicker } from "@/components/offers/admin/OfferDateRangePicker";
import { OfferSelectDropdown } from "@/components/offers/admin/OfferSelectDropdown";
import { useOffersAdmin } from "@/features/offers/useOffersAdmin";
import { useOfferStats } from "@/features/offers/useOfferStats";
import { RotateCcw, ListFilter } from "lucide-react";
import { FiChevronRight } from "react-icons/fi";
import { useCallback, useMemo, useState } from "react";
import useOfferCategories from "@/features/category/useCategoriesAdmin";

type FilterValue = string;

interface Filters {
  category: FilterValue;
  dealType: FilterValue;
  createdFrom: FilterValue;
  createdTo: FilterValue;
  page: number;
  limit: number;
}

const initialFilters: Filters = {
  category: "",
  dealType: "",
  createdFrom: "",
  createdTo: "",
  page: 1,
  limit: 500,
};

export default function OfferQueue() {
  const { data: categoriesData } = useOfferCategories();
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const {
    data,
    isLoading: offersLoading,
    error,
  } = useOffersAdmin({
    category: filters.category,
    dealType: filters.dealType,
    createdFrom: filters.createdFrom,
    createdTo: filters.createdTo,
    page: filters.page,
    limit: filters.limit,
  });
  const { stats } = useOfferStats();
  const pendingCount = stats?.pendingOffers || 0;

  const resetFilters = useCallback(() => setFilters(initialFilters), []);
  const updateFilters = useCallback(
    (partial: Partial<Filters>) =>
      setFilters((prev) => ({ ...prev, ...partial })),
    [],
  );

  // Map Category[] -> { value, label }[] expected by OfferSelectDropdown
  // ⚠️ Adjust c.id / c.name below if your Category type uses different field names
  const categoryOptions = useMemo(
    () =>
      (categoriesData?.categories ?? []).map((c) => ({
        value: c.id,
        label: c.name,
      })),
    [categoriesData],
  );

  const hasActiveFilters = useMemo(
    () =>
      Boolean(
        filters.category ||
        filters.dealType ||
        filters.createdTo ||
        filters.createdFrom,
      ),
    [
      filters.category,
      filters.dealType,
      filters.createdTo,
      filters.createdFrom,
    ],
  );

  if (error) {
    return (
      <section className="pt-14 px-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-red-700 mb-2">
            Error Loading Offer Queue
          </h2>
          <p className="text-red-600">
            {error.message || "Failed to load offers"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-50 flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
      <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full flex flex-col h-full">
        <header className="mb-4 sm:mb-6 shrink-0 flex items-center justify-between">
          <h1 className="text-[16px] sm:text-[20px] font-bold text-slate-900 flex items-center gap-1.5 sm:gap-2">
            <FiChevronRight
              size={16}
              strokeWidth={2.5}
              className="text-slate-600 hidden sm:block"
            />
            Deal Review Queue
          </h1>
          <span className="border border-orange-400 text-orange-500 bg-white px-3 py-1 rounded-[4px] text-xs font-semibold">
            {pendingCount} pending review{pendingCount !== 1 ? "s" : ""}
          </span>
        </header>

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
                placeholder="Deal type"
                options={[
                  { value: "cashback", label: "cashback" },
                  { value: "promo_code", label: "Promo code" },
                  { value: "freebie", label: "freebie" },
                  { value: "discount", label: "Discount" },
                  { value: "bogo", label: "buy one get one" },
                  { value: "free_trial", label: "Free Trial" },
                  { value: "free_delivery", label: "Free Delivery" },
                  { value: "price_drop", label: "Price Drop" },
                ]}
                value={filters.dealType}
                onChange={(value) =>
                  updateFilters({ dealType: value, page: 1 })
                }
                width="w-[150px]"
                dropdownWidth="w-[170px]"
              />

              <OfferSelectDropdown
                placeholder="Category"
                options={categoryOptions}
                value={filters.category}
                onChange={(value) =>
                  updateFilters({ category: value, page: 1 })
                }
                width="w-[150px]"
                dropdownWidth="w-[200px]"
              />

              <OfferDateRangePicker
                createdFrom={filters.createdFrom}
                createdTo={filters.createdTo}
                onApply={({ createdFrom, createdTo }) =>
                  updateFilters({ createdFrom, createdTo, page: 1 })
                }
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

        <div className="flex-1 min-h-0 lg:-mb-10 flex flex-col bg-transparent overflow-hidden">
          {offersLoading ? (
            <div className="flex-1 overflow-auto p-4">
              <AdminOfferListSkeleton number={5} />
            </div>
          ) : data?.offers && data.offers.length > 0 ? (
            <AdminOfferPaginatedList offers={data.offers} />
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
      </div>
    </section>
  );
}