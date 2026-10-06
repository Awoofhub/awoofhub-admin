import { Category } from "@/types/category";
import { formatDateTime } from "@/utils/formatDateTime";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import CategoryModal from "../modals/category/CategoryModal";
import { Column } from "../table/BaseTable";
import { formatHistoryDateTime } from "@/utils/formatHistoryDateTime";


function CategoryActions({ category }: { category: Category }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <button
                type="button"
                className="flex justify-center cursor-pointer p-2"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenModal(true);
                }}
            >
                <FiEdit3 size={20} />
            </button>

            <CategoryModal
                categoryId={category.id}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
};


export const CategoryColumns: Column<Category>[] = [
    {
        key: "name",
        header: "Name",
        render: (category) => (
            <span className="font-semibold text-sm">
                {category.name}
            </span>
        ),
    },

    {
        key: "slug",
        header: "Slug",
        render: (category) => (
            <span className="font-medium">
                {category.slug}
            </span>
        ),
    },

    {
        key: "createdAt",
        header: "Date Created",
        className: "text-nowrap",
        render: (category) => formatHistoryDateTime(category.createdAt),
    },

    {
        key: "actions",
        header: "Actions",
        render: (category) => <CategoryActions category={category} />,
    },
];