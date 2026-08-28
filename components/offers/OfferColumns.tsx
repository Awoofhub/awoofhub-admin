import { Offer } from "@/types/offer";
import { formatDate } from "@/utils/formatDate";
import { CircleCheckBig, EllipsisVertical, Hourglass, Pause, XCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import OfferModal from "../modals/offer/OfferModal";
import { Column } from "../table/BaseTable";

function OfferActions({ offer }: { offer: Offer }) {
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
                <EllipsisVertical size={20} />
            </button>

            <OfferModal
                offer={offer}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
}

const STATUS_BADGE: Record<Offer["status"], { label: string; className: string; icon: any }> = {
    approved: { label: "Active", className: "bg-[#20B5261A] text-[#006400]", icon: <CircleCheckBig size={12} /> },
    pending: { label: "Pending", className: "bg-yellow-50 text-yellow-700", icon: <Hourglass size={12} /> },
    rejected: { label: "Rejected", className: "bg-[#E706061A] text-[#E70606]", icon: <XCircle size={12} /> },
    suspended: { label: "Suspended", className: "bg-[#FFC0001A] text-[#FE4F04]", icon: <Pause size={12} /> },
};

function StatusBadge({ status }: { status: Offer["status"] }) {
    const badge = STATUS_BADGE[status];
    if (!badge) return null;
    return (
        <span className={`inline-flex items-center gap-1 text-sm font-medium font-baloo px-4 py-1 rounded-full ${badge.className}`}>
            {badge.icon} {badge.label}
        </span>
    );
}

export const OfferColumns: Column<Offer>[] = [
    {
        key: "title",
        header: "Title",
        render: (offer) => (
            <div className="flex items-center gap-3">
                <Image
                    width={40}
                    height={40}
                    src={offer.imageUrl}
                    unoptimized
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                />
                <span className="font-medium max-w-[120px] text-xs text-gray-900 line-clamp-2">
                    {offer.title}
                </span>
            </div>
        ),
    },

    {
        key: "category",
        header: "Category",
        render: (offer) => offer.category.name,
    },

    {
        key: "dealType",
        header: "Type",
        className: "capitalize",
        render: (offer) => offer.dealType?.replace('_', ' '),
    },

    {
        key: "contributor",
        header: "Awoofer",
        render: (offer) => (<span className="font-medium">@{offer.contributor.username}</span>),
    },

    {
        key: "status",
        header: "Status",
        render: (offer) => <StatusBadge status={offer.status} />,
    },

    {
        key: "clickCount",
        header: "Grabs",
        render: (offer) => offer.clickCount,
    },

    {
        key: "endDate",
        header: "Expiry",
        className: "text-nowrap",
        render: (offer) => {
            const isExpired = new Date(offer.endDate) < new Date();
            return (
                <span className={isExpired ? "text-red-600 font-medium" : ""}>
                    {formatDate(offer.endDate)}
                </span>
            );
        },
    },

    {
        key: "actions",
        header: "Actions",
        className: "flex justify-center text-center",
        render: (offer) => <OfferActions offer={offer} />,
    },
];