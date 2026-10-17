import Loading from "@/components/loading/Loading";
import UsersPage from "@/components/users/UsersPage";
import { Suspense } from "react";

type FilterParams = {
    search?: string;
    status?: string;
};

interface FilterProps {
    searchParams: Promise<FilterParams>;
}

export default function Page({ searchParams }: FilterProps) {
    return (
        <Suspense fallback={<Loading />}>
            <UsersPage searchParams={searchParams} />
        </Suspense>)
}

