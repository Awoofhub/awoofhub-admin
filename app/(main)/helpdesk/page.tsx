import HelpdeskPage from "@/components/help-and-support/HelpdeskPage";
import Loading from "@/components/loading/Loading";
import { Suspense } from "react";


type FilterParams = {
    search?: string,
};

interface FilterProps {
    searchParams: Promise<FilterParams>;
}

export default function Page({ searchParams }: FilterProps) {
    return (
        <Suspense fallback={<Loading />}>
            <HelpdeskPage searchParams={searchParams} />
        </Suspense>
    )
}