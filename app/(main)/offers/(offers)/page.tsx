import Loading from "@/components/loading/Loading";
import OffersPage from "@/components/offers/OffersPage";
import { Suspense } from "react";


type FilterParams = {
    search?: string;
    category?: string;
    dealType?: string;
    status?: string;
};

interface FilterProps {
    searchParams: Promise<FilterParams>;
}

export default function Page({ searchParams }: FilterProps) {
    return (
        <Suspense fallback={<Loading />}>
            <OffersPage searchParams={searchParams} />
        </Suspense>
    )
}

