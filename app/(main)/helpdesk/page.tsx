'use client';

import HelpAndSupportTable from "@/components/help-and-support/HelpAndSupportTable";
import SearchInput from "@/components/search/SearchInput";
import { ChevronRight } from "lucide-react";
import { use } from "react";

type FilterParams = {
    search?: string,
};

interface FilterProps {
    searchParams: Promise<FilterParams>;
}

export default function HelpdeskPage({ searchParams }: FilterProps) {

    const params = use(searchParams);
    const { search } = params;
   

    return (
        <div className="p-4">
            <div className="my-4 flex items-center gap-1 text-xl text-black font-baloo font-semibold">
                <ChevronRight size={18} className="hidden xs:inline" />
                <span>Support Tickets</span>
            </div>

            <div className="flex flex-row bg-white px-4 lg:px-6 py-4 my-6 gap-3 rounded-2xl">
                <SearchInput placeholder="Search by email" />

            </div>

            <HelpAndSupportTable search={search} />
        </div>

    )


}