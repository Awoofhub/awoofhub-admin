'use client';

import { useState } from 'react';
import CategoryTable from "@/components/category/CatgeoryTable";
import SearchInput from "@/components/search/SearchInput";
import AddCategoryModal from "@/components/modals/category/AddCategoryModal";
import { ChevronRight, Plus } from "lucide-react";
import { use } from "react";

type FilterParams = { search?: string };
interface FilterProps { searchParams: Promise<FilterParams>; }

export default function CategoryPage({ searchParams }: FilterProps) {
    const params = use(searchParams);
    const { search } = params;
    const [addModalOpen, setAddModalOpen] = useState(false);

    return (
        <div className="p-4">
            <div className="my-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xl text-black font-baloo font-semibold">
                    <ChevronRight size={18} className="hidden xs:inline" />
                    <span>Categories</span>
                </div>
                <button
                    type="button"
                    onClick={() => setAddModalOpen(true)}
                    className="flex items-center gap-1.5 cursor-pointer bg-primary text-white text-sm xs:text-base font-baloo font-medium px-4 py-2 rounded-sm hover:bg-orange-700"
                >
                    <Plus size={18} /> Add Category
                </button>
            </div>

            <div className="flex flex-row bg-white px-4 lg:px-6 py-4 my-6 gap-3 rounded-2xl">
                <SearchInput placeholder="Search categories" />
            </div>

            <CategoryTable />

            <AddCategoryModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
        </div>
    );
}