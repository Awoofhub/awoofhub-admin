import PaginatedTable from "../table/PaginatedTable";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExpiringColumns } from "./ExpiringColumns";
import { useExpiringOffers } from "@/features/offers/useExpiringOffers";


export default function ExpiringTable() {
    const router = useRouter();
    const [page, setPage] = useState(1);

    const { data: offers, totalPages, isLoading } = useExpiringOffers({
        page,
        limit: 3,
    });

    if (isLoading) {
        return (
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-center text-gray-400 py-8 text-sm">Loading...</div>
            </div>
        );
    }

    if (offers.length === 0 && page === 1) {
        return null;
    }

    return (
        <PaginatedTable
            data={offers}
            columns={ExpiringColumns}
            rowKey={(offer) => offer.id}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            onRowClick={(offer) => router.push(`offers/${offer.id}`)}
            title="Offers Expiring in 3 Days"
        />
    )
}
