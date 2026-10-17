'use client';

import { SelectDropdown } from "@/components/form/SelectDropdown";
import OffersTable from "@/components/offers/OffersTable";
import SearchInput from "@/components/search/SearchInput";
import { useCategory } from "@/features/category/useCategory";
import { useFilter } from "@/features/filters/useFilter";
import { UsersPaginationContext } from "@/providers/users-pagination-provider";
import { ChevronRight } from "lucide-react";
import { use, useContext } from "react";


type FilterParams = {
    search?: string;
    category?: string;
    dealType?: string;
    status?: string;
};

interface FilterProps {
    searchParams: Promise<FilterParams>;
}

export default function OffersPage({ searchParams }: FilterProps) {
    const params = use(searchParams);
    const { search, dealType, category, status } = params;

    const { data: categoryData } = useCategory();
    const updateFilter = useFilter();
    const { setPage } = useContext(UsersPaginationContext);

    const DealTypes = [
        { value: undefined, label: "All Deals" },
        { value: "cashback", label: "Cash Back" },
        { value: "freebie", label: "Freebie" },
        { value: "discount", label: "Discount" },
        { value: "bogo", label: "Buy One Get One" },
        { value: "promo_code", label: "Promo Code" },
        { value: "free_trial", label: "Free Trial" },
        { value: "free_delivery", label: "Free Delivery" },
        { value: "price_drop", label: "Price Drop" },
    ]

    const Categories = [
        { value: undefined, label: "All Categories" },
        ...(categoryData?.map((category) => ({
            value: category.slug,
            label: category.name,
        })) ?? []),
    ];

    const Status = [
        { value: undefined, label: "All Status" },
        { value: "approved", label: "Approved" },
        { value: "suspended", label: "Suspended" },
        { value: "rejected", label: "Rejected" },
    ]

    const handleFilterChange = (key: string, value: any) => {
        setPage(1);
        updateFilter(key, value);
    };

    return (
        <div className="p-4">

            <div className="my-4 flex items-center gap-1 text-xl text-black font-baloo font-semibold">
                <ChevronRight size={18} className="hidden xs:inline" />
                <span>All Offers</span>
            </div>

            <div className="flex flex-col bg-white px-4 lg:px-6 py-4 my-6 gap-3 rounded-2xl">
                <div className="grid grid-cols-2 lg:grid-cols-3 items-center gap-2">
                    <SelectDropdown
                        data={DealTypes}
                        value={dealType}
                        onChange={(value) => handleFilterChange("dealType", value)}
                    />

                    <SelectDropdown
                        data={Categories}
                        value={category}
                        onChange={(value) => handleFilterChange("category", value)}
                    />

                    <SelectDropdown
                        data={Status}
                        value={status}
                        onChange={(value) => handleFilterChange("status", value)}
                    />
                    <div className="lg:hidden">
                        <SearchInput onSearchChange={() => setPage(1)} />
                    </div>

                </div>
                <div className="hidden lg:block">
                    <SearchInput onSearchChange={() => setPage(1)} />
                </div>

            </div>

            <OffersTable search={search} status={status} dealType={dealType} category={category} />

        </div>
    )

}
