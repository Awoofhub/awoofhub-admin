import { Offer } from "@/types/offer";
import { getEffectiveOfferStatus } from "@/utils/getEffectiveOfferStatus";
import OfferStatusBadge from "@/components/offer/OfferStatusBadge";
import Image from "next/image";
import { formatHistoryDate } from "@/utils/formatHistoryDateTime";

interface UserOfferListItemProps {
  offer: Offer;
}

export default function UserOfferListItem({ offer }: UserOfferListItemProps) {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors px-2 rounded-lg -mx-2">
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100 mt-0.5">
        <Image
          src={offer.imageUrl || "/placeholder.png"}
          alt={offer.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">
          {offer.title}
        </h3>
        <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 mt-1 text-xs text-gray-500">
          <span className="capitalize">
            
          </span>
          
            <>
              <span>•</span>
              <span>{offer.category.name}</span>
            </>
        
          <span>•</span>
          <span className="whitespace-nowrap">
            Posted {formatHistoryDate(offer.createdAt)}
          </span>
        </div>
      </div>

      <div className="shrink-0">
        <OfferStatusBadge status={getEffectiveOfferStatus(offer)} />
      </div>
    </div>
  );
}
