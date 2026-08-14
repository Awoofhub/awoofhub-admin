import { useExpiringOffers } from "@/features/offers/useExpiringOffers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PaginatedTable from "../table/PaginatedTable";
import { ExpiringColumns } from "./ExpiringColumns";


export default function ExpiringTable() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const limit = 3

    const { data: offers, isFetched, isFetching } = useExpiringOffers({
        page,
        limit: 3,
    });

    return (
        <PaginatedTable
            response={offers}
            columns={ExpiringColumns}
            rowKey={(offer) => offer.id}
            limit={limit}
            currentPage={page}
            onPageChange={setPage}
            onRowClick={(offer) => router.push(`offers/${offer.id}`)}
            isFetching={isFetching}
            isFetched={isFetched}
            title="Expiring Offers"
        />
    )
}
