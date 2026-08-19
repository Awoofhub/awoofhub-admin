'use client';

import UserTable from "@/components/users/UserTable";
import { ChevronRight } from "lucide-react";
import { use } from "react";

type FilterParams = {
    search?: string,
    status?: string;
};

interface FilterProps {
    searchParams: Promise<FilterParams>;
}

export default function UsersPage({ searchParams }: FilterProps) {
    const params = use(searchParams);
    const { search, status } = params;

    return (
        <div className="p-4">
            <div className="my-4 flex items-center gap-1 text-xl text-black font-baloo font-semibold">
                <ChevronRight size={18} className="hidden xs:inline" />
                <span>All Users</span>
            </div>

            <UserTable search={search} status={status} />
        </div>
    )


}