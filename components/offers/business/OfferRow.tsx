import { Offer } from '@/types/offer';
import { formatDateTime } from '@/utils/formatDateTime';
import Rating from '@mui/material/Rating';
import { AlertTriangle, Check, Clock, RotateCcw, XCircle, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import RowActions from './RowActions';
import { useModerateOffer } from '@/features/offers/useModerateOffer';

interface Props {
  offer: Offer;
}

export function ExpiryBadge({ isExpired }: { isExpired: boolean }) {
  const config = {
    active: "bg-blue-50 text-blue-600 border-blue-100",
    expired: "bg-gray-50 text-gray-500 border-gray-200",
  };

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] uppercase tracking-wider font-bold w-fit ${isExpired ? config.expired : config.active}`}>
      {isExpired ? (
        <><AlertTriangle className="w-3 h-3" />Expired</>
      ) : (
        <><Clock className="w-3 h-3" />Valid</>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status?: 'approved' | 'pending' | 'rejected' | "unknown" }) {
  const safeStatus = status || 'unknown';
  const config = {
    approved: "bg-green-50 text-green-600 border-green-100",
    pending: "bg-orange-50 text-orange-600 border-orange-100",
    rejected: "bg-red-50 text-red-600 border-red-100",
    unknown: "bg-gray-50 text-gray-500 border-gray-200",
  };

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold w-fit capitalize ${config[safeStatus]}`}>
      {safeStatus === 'approved' && <Check className="w-3 h-3" />}
      {safeStatus === 'pending' && <RotateCcw className="w-3 h-3" />}
      {safeStatus === 'rejected' && <XCircle className="w-3 h-3" />}
      {safeStatus}
    </div>
  );
};

export default function OfferRow({ offer }: Props) {
  const router = useRouter();
  const { mutate: moderateOffer, isPending } = useModerateOffer();

  const handleRowClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.action-cell')) return;
    router.push(`offers/${offer.id}`);
  };

  const isExpired = new Date(offer.endDate) < new Date();

  return (
    <tr onClick={handleRowClick} className="cursor-pointer hover:bg-gray-50 transition-colors border-y border-gray-200 text-xs sm:text-sm">
      <td className="px-2 sm:px-3 py-3 sm:py-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <Image width={500} height={500} src={offer.imageUrl} alt="img" className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-md" />
          <span className="font-medium text-xs sm:text-sm text-gray-700 line-clamp-1">{offer.title}</span>
        </div>
      </td>

      <td className="hidden sm:table-cell px-2 sm:px-3 py-3 sm:py-5 text-xs sm:text-center text-gray-600">{offer.category.name}</td>
      <td className="hidden md:table-cell px-2 sm:px-3 py-3 sm:py-5 text-xs text-gray-500 text-nowrap">{formatDateTime(offer.createdAt)}</td>

      <td className="hidden sm:table-cell px-2 sm:px-3 py-3 sm:py-5 text-xs text-gray-600">
        <Rating
          name="readonly"
          className="-ml-0.75"
          size="small"
          precision={0.1}
          value={offer.avgRating || 0}
          readOnly
          sx={{
            '& .MuiRating-icon': { marginRight: '-7px' },
            '& .MuiRating-iconFilled': { color: '#FFC000' },
            '& .MuiRating-iconEmpty': { color: '#ccc' },
          }}
        />
      </td>

      <td className="hidden sm:table-cell px-2 sm:px-3 py-3 sm:py-5 text-xs text-center text-gray-600">{offer.reviewCount || 0}</td>
      <td className="hidden lg:table-cell px-2 sm:px-3 py-3 sm:py-5 text-xs text-gray-500 text-nowrap">{formatDateTime(offer.endDate)}</td>

      {/* Status + Inline Moderation */}
      <td className="px-2 sm:px-3 py-3 sm:py-5 text-xs action-cell" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <StatusBadge status={offer.moderationStatus} />
          {offer.moderationStatus === 'pending' && (
            <div className="flex items-center gap-1">
              <button
                disabled={isPending}
                onClick={() => moderateOffer({ id: offer.id, status: 'approved' })}
                className="p-1 bg-green-100 hover:bg-green-200 text-green-700 rounded transition-colors disabled:opacity-50"
                title="Approve"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                disabled={isPending}
                onClick={() => moderateOffer({ id: offer.id, status: 'rejected' })}
                className="p-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors disabled:opacity-50"
                title="Reject"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </td>

      <td className="hidden sm:table-cell px-2 sm:px-3 py-3 sm:py-5 text-xs"><ExpiryBadge isExpired={isExpired} /></td>
      <td className="px-2 sm:px-3 py-3 sm:py-5 text-center action-cell" onClick={(e) => e.stopPropagation()}>
        <RowActions offerId={offer.id} />
      </td>
    </tr>
  );
}