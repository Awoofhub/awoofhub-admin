import { Offer } from "@/types/offer";
import { formatDateTime } from "@/utils/formatDateTime";
import { AlertTriangle, Clock } from "lucide-react";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { Column } from "../table/Table";

function ExpiryBadge({ isExpired }: { isExpired: boolean }) {
    return (
        <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] uppercase tracking-wider font-bold w-fit ${isExpired
                ? "bg-gray-50 text-gray-500 border-gray-200"
                : "bg-blue-50 text-blue-600 border-blue-100"
                }`}
        >
            {isExpired ? (
                <>
                    <AlertTriangle className="w-3 h-3" />
                    Expired
                </>
            ) : (
                <>
                    <Clock className="w-3 h-3" />
                    Valid
                </>
            )}
        </div>
    );
}

export const OfferColumns: Column<Offer>[] = [
    {
        key: "title",
        header: "Title",
        render: (offer) => (
            <div className="flex items-center gap-3">
                <Image
                    width={500}
                    height={500}
                    src={offer.imageUrl}
                    alt=""
                    className="w-10 h-10 object-cover"
                />

                <span className="font-medium text-xs text-gray-700 line-clamp-1">
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
        key: "awoofer",
        header: "Awoofer",
        className: "text-nowrap",
        render: (offer) => `@${offer.contributor.username}`
    },

    {
        key: "createdAt",
        header: "Date Created",
        className: "text-nowrap",
        render: (offer) => formatDateTime(offer.createdAt),
    },

    {
        key: "reviewCount",
        header: "Reviews",
        render: (offer) => offer.reviewCount,
    },

    {
        key: "endDate",
        header: "Ends On",
        className: "text-nowrap text-center",
        render: (offer) => formatDateTime(offer.endDate),
    },

    {
        key: "expiryStatus",
        header: "Expiry Status",
        render: (offer) => {
            const isExpired = new Date(offer.endDate) < new Date();

            return <ExpiryBadge isExpired={isExpired} />;
        },
    },

    {
        key: "actions",
        header: "Actions",
        className: "text-center",
        render: () =>
        (
            <div className="flex justify-center">
                <BsThreeDots size={20} />
            </div>
        )
    },
];