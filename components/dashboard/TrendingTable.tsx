import { useTrendingOffers } from "@/features/offers/useTrendingOffers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PaginatedTable from "../table/PaginatedTable";
import { TrendingColumns } from "./TrendingColumns";


export default function TrendingTable() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const limit = 3

    const { data: offers, isFetched, isFetching } = useTrendingOffers({
        page,
        limit,
    });

    return (
        <div>
            <PaginatedTable
                response={offers}
                columns={TrendingColumns}
                limit={limit}
                rowKey={(offer) => offer.id}
                currentPage={page}
                onPageChange={setPage}
                onRowClick={(offer) => router.push(`offers/${offer.id}`)}
                isFetching={isFetching}
                isFetched={isFetched}
                title="Trending Offers"
            />
        </div>
    )
}
