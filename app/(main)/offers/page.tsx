'use client';

import { SelectDropdown } from "@/components/form/SelectDropdown";
import Loading from "@/components/loading/Loading";
import OffersTable from "@/components/offers/OfferTable";
import SearchInput from "@/components/search/SearchInput";
import { useCategory } from "@/features/category/useCategory";
import { useFilter } from "@/features/offers/useFilter";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


function OffersPage() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? undefined;
    const category = searchParams.get("category") ?? undefined;
    const dealType = searchParams.get("dealType") ?? undefined;
    const status = searchParams.get("status") ?? undefined;

    const { data: categoryData } = useCategory();
    const updateFilter = useFilter();

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
                        onChange={(value) => updateFilter("dealType", value)}
                    />

                    <SelectDropdown
                        data={Categories}
                        value={category}
                        onChange={(value) => updateFilter("category", value)}
                    />

                    <SelectDropdown
                        data={Status}
                        value={status}
                        onChange={(value) => updateFilter("status", value)}
                    />
                    <div className="lg:hidden">
                        <SearchInput />
                    </div>

                </div>
                <div className="hidden lg:block">
                    <SearchInput />
                </div>

            </div>

            <OffersTable search={search} status={status} dealType={dealType} category={category} />

        </div>
    )

}


export default function Filter() {
  return (
    <Suspense fallback={<Loading />}>
        <OffersPage />
    </Suspense>
  );
}