'use client';

import { SelectDropdown } from "@/components/form/SelectDropdown";
import SearchInput from "@/components/search/SearchInput";
import UserTable from "@/components/users/UserTable";
import { useFilter } from "@/features/offers/useFilter";
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

    const updateFilter = useFilter();

    const Status = [
        { value: undefined, label: "All Status" },
        { value: "active", label: "Active" },
        { value: "suspended", label: "Suspended" },
        { value: "blocked", label: "Blocked" },
        { value: "deleted", label: "Deleted" },

    ]

    return (
        <div className="p-4">
            <div className="my-4 flex items-center gap-1 text-xl text-black font-baloo font-semibold">
                <ChevronRight size={18} className="hidden xs:inline " />
                <span>All Users</span>
            </div>

            <div className="flex flex-col xs:flex-row bg-white px-4 lg:px-6 py-4 my-6 gap-3 rounded-2xl">
                <SearchInput placeholder="Search by @handle or email or by city.." />

                <SelectDropdown
                    data={Status}
                    value={status}
                    onChange={(value) => updateFilter("status", value)}
                />
            </div>

            <UserTable search={search} status={status} />
        </div>
    )


}