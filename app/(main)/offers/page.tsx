'use client';

import { offerColumns } from "@/components/offers/OfferColumns";
import PaginatedTable from "@/components/table/PaginatedTable";
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
        page,
        limit: 8,
    });


    return (
        <PaginatedTable
            data={data?.data ?? []}
            columns={offerColumns}
            rowKey={(offer) => offer.id}
            currentPage={page}
            totalPages={data?.meta?.totalPages ?? 0}
            onPageChange={setPage}
            onRowClick={(offer) => router.push(`offers/${offer.id}`)}
        />
    )

}