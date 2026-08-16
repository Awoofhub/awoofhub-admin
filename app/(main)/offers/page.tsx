'use client';

import { useCategory } from "@/features/category/useCategory";
import { useFilter } from "@/features/offers/useFilter";
import { useOffers } from "@/features/offers/useOffers";
import { useRouter } from "next/navigation";
import { use, useState } from "react";



type FilterParams = {
    search?: string;
    dealType: string;
    category?: string;
};

interface FilterProps {
    searchParams: Promise<FilterParams>;
}

export default function OffersPage({ searchParams }: FilterProps) {
    const { data: categories } = useCategory();

    const router = useRouter();

    const params = use(searchParams);
    const { search, dealType, category, } = params;

    const updateFilter = useFilter("/offers");

    const [page, setPage] = useState(1);

    const { data, isFetching, isError, error } = useOffers({
        search: search ?? "",
        dealType: dealType ?? "",
        category: category ?? "",
        minRating: 0,
        createdFrom: "",
        createdTo: "",
        status: "",
        page,
        limit: 8,
    });


    return (
      <></>
    )

}