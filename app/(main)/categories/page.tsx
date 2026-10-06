'use client';

import CategoryTable from "@/components/category/CatgeoryTable";
import AddCategoryModal from "@/components/modals/category/AddCategoryModal";
import { ChevronRight, Plus } from "lucide-react";
import { useState } from 'react';

export default function CategoryPage() {
        
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

            <CategoryTable />

            <AddCategoryModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
        </div>
    );
}