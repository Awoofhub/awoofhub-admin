import { Offer } from "@/types/offer";
import { formatExpiresIn } from "@/utils/formatExpiresIn";
import Image from "next/image";
import { Column } from "../table/BaseTable";



export const ExpiringColumns: Column<Offer>[] = [
    {
        key: "title",
        header: "Offer Title",
        render: (offer) => (
            <div className="flex items-center gap-3">
                <Image
                    width={500}
                    height={500}
                    src={offer.imageUrl}
                    unoptimized
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
        key: "brandName",
        header: "Brand Name",
        className: "text-left",
        render: (offer) => offer.brandName,
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
        key: "endDate",
        header: "Expires In",
        className: "text-nowrap text-left",
        render: (offer) => (
            <span className="text-[#E70606] font-semibold" >
                {formatExpiresIn(offer.endDate)}
            </span>
        ),
    },

];