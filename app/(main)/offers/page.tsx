'use client';

import { OfferSelectDropdown } from "@/components/offers/OfferSelectDropdown";
import OffersTable from "@/components/offers/OfferTable";
import SearchInput from "@/components/search/SearchInput";
import { useCategory } from "@/features/category/useCategory";
import { useFilter } from "@/features/offers/useFilter";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";



type FilterParams = {
    search?: string,
    status?: string;
    dealType?: string;
    category?: string;
};

interface FilterProps {
    searchParams: Promise<FilterParams>;
}

export default function OffersPage({ searchParams }: FilterProps) {

    const params = use(searchParams);
    const { search, status, dealType, category, } = params;

    const router = useRouter();

    const { data: categories } = useCategory();

    const updateFilter = useFilter();

    const [page, setPage] = useState(1);

    const DEAL_TYPES = [
        ["cashback", "Cash Back"],
        ["freebie", "Freebie"],
        ["discount", "Discount"],
        ["bogo", "Buy One Get One"],
        ["promo_code", "Promo Code"],
        ["free_trial", "Free Trial"],
        ["free_delivery", "Free Delivery"],
        ["price_drop", "Price Drop"],
    ] as const;

    const STATUS = [
        ["approved", "Approved"],
        ["suspended", "Suspended"],
        ["rejected", "Rejected"],

    ] as const;

    return (
        <div className="p-4">

            <div className="my-4 flex items-center gap-1 text-xl text-black font-baloo font-semibold">
                <ChevronRight size={18} className="hidden xs:inline" />
                <span>All Offers</span>
            </div>

            <div className="flex flex-col bg-white px-8 py-4 my-6 gap-3 rounded-2xl">
                <div className="flex items-center gap-3">
                    <OfferSelectDropdown
                        placeholder="Deal type"
                        options={DEAL_TYPES.map(([value, label]) => ({ value, label }))}
                        value={dealType ?? ""}
                        onChange={(value) => updateFilter("dealType", value)}
                        width="shrink-0"
                        dropdownWidth="w-50"
                    />

                    <OfferSelectDropdown
                        placeholder="Category"
                        options={categories?.map((cat) => ({ value: cat.slug, label: cat.name })) ?? []}
                        value={category ?? ""}
                        onChange={(value) => updateFilter("category", value)}
                        width="shrink-0"
                        dropdownWidth="w-60"
                    />

                    <OfferSelectDropdown
                        placeholder="Status"
                        options={STATUS.map(([value, label]) => ({ value, label }))}
                        value={status ?? ""}
                        onChange={(value) => updateFilter("status", value)}
                        width="shrink-0"
                        dropdownWidth="w-60"
                    />
                </div>
                <SearchInput />
            </div>

            <OffersTable search={search} status={status} dealType={dealType} category={category} />


        </div>
    )

}