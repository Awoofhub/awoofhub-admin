import { Offer } from "@/types/offer";
import { formatDate } from "@/utils/formatDate";
import { formatDateTime } from "@/utils/formatDateTime";
import { formatExpiresIn, isExpiringSoon } from "@/utils/formatExpiresIn";
import Image from "next/image";
import { Column } from "../table/BaseTable";



export const TrendingColumns: Column<Offer>[] = [
    {
        key: "title",
        header: "Offer Title",
        render: (offer) => (
            <div className="flex items-center gap-3">
                <Image
                    width={500}
                    height={500}
                    unoptimized
                    src={offer.imageUrl}
                    alt=""
                    className="w-10 h-10 object-cover rounded-lg"
                />

                <span className="font-medium text-xs max-w-[160px] text-gray-900 line-clamp-2">
                    {offer.title}
                </span>
            </div>
        ),
    },

    {
        key: "category",
        header: "Category",
        className: "text-left",
        render: (offer) => offer.category.name,
    },

    {
        key: "dealType",
        header: "Deal Type",
        className: "text-left",
        render: (offer) => (<span className="capitalize">{offer.dealType?.replace('_', ' ')}</span>),
    },

    {
        key: "contributor",
        header: "Awoofer",
        className: "text-left",
        render: (offer) => (<span className="font-medium">@{offer.contributor.username}</span>),
    },


    {
        key: "createdAt",
        header: "Submitted",
        className: "text-nowrap text-left",
        render: (offer) => formatDateTime(offer.createdAt),
    },

    {
        key: "clickCounts",
        header: "Grabs",
        className: "text-left",
        render: (offer) => offer.clickCount,
    },

    {
        key: "endDate",
        header: "Expiry",
        className: "text-nowrap text-left",
        render: (offer) => (
            <span className={isExpiringSoon(offer.endDate) ? "text-[#E70606] font-semibold" : ""}>
                {isExpiringSoon(offer.endDate) ? formatExpiresIn(offer.endDate) : formatDate(offer.endDate)}
            </span>
        ),
    },

];