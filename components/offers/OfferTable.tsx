import { useOffers } from "@/features/offers/useOffers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PaginatedTable from "../table/PaginatedTable";
import { OfferColumns } from "./OfferColumns";

interface Props {
    search?: string,
    dealType?: string,
    category?: string,
    status?: string,
}


export default function OffersTable({ search, dealType, category, status, }: Props) {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const limit = 4

    const { data: offers, isFetched, isFetching } = useOffers({
        search: search ?? "",
        dealType: dealType ?? "",
        category: category ?? "",
        minRating: 0,
        createdFrom: "",
        createdTo: "",
        status: status ?? "",
        page,
        limit,
    });

    return (
        <div>
            <PaginatedTable
                response={offers}
                columns={OfferColumns}
                limit={limit}
                rowKey={(offer) => offer.id}
                currentPage={page}
                onPageChange={setPage}
                onRowClick={(offer) => router.push(`offers/${offer.id}`)}
                isFetching={isFetching}
                isFetched={isFetched}
            />
        </div>
    )
}
