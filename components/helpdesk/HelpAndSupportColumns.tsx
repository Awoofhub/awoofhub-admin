import { HelpAndSupport } from "@/types/help-and-support";
import { Check, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import HelpAndSupportModal from "../modals/HelpAndSupportModal";
import { Column } from "../table/Table";

function HelpAndSupportActions({ data }: { data: HelpAndSupport }) {
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
                <BsThreeDots size={20} />
            </button>

            <HelpAndSupportModal
                id={data.id}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
};


export const HelpAndSupportColumns: Column<HelpAndSupport>[] = [
    {
        key: "name",
        header: "Name",
        render: (data) => (
            <div className="flex items-center gap-3">
                <span className="font-medium text-xs text-gray-700 line-clamp-1">
                    {data.name}
                </span>
            </div>
        ),
    },

    {
        key: "email",
        header: "Email Address",
        render: (data) => data.email,
    },

    {
        key: "category",
        header: "Category",
        render: (data) => data.category
    },

    {
        key: "date",
        header: "Date",
        render: (data) => data.createdAt
    },

    {
        key: "status",
        header: "Status",
        render: (data) => {
            const status = data.status;

            const config = {
                open: "bg-green-50 text-green-600 border-green-100",
                inProgress: "bg-orange-50 text-orange-600 border-orange-100",
                resolved: "bg-red-50 text-red-600 border-red-100",
                closed: "bg-gray-50 text-gray-600 border-red-100",
            };

            return (
                <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold w-fit ${config[status]}`}
                >
                    {status === "open" && <Check className="w-3 h-3" />}
                    {status === "inProgress" && <RotateCcw className="w-3 h-3" />}
                    {status === "resolved" && <XCircle className="w-3 h-3" />}
                    {status === "closed" && <XCircle className="w-3 h-3" />}
                </div>
            );
        },
    },

    {
        key: "actions",
        header: "Actions",
        className: "text-center",
        render: (data) => <HelpAndSupportActions data={data} />,

    },
];