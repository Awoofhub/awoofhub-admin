import { Offer } from "@/types/offer";
import { capitalizeFirstLetter } from "@/utils/truncate";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
    offer: Offer;
}


export default function BusinessLink({ offer }: Props) {
    return (
        <Link href="" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-lg">
                {capitalizeFirstLetter(`${offer.business.name}`)}
            </div>
            <span className="text-orange-500 text-base sm:text-xl font-bold hover:underline cursor-pointer flex items-center">
                {offer.business.name} <ChevronRight size={23} />
            </span>
        </Link>

    )
}
