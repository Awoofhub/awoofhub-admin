// OfferTable.tsx
// Main "All Offers" table. Pure display + callbacks — no internal state
// beyond what's needed for rendering, consistent with the onApprove/onReject
// pattern in DealCard.tsx. Sorting/filtering/pagination stay owned by the parent.

import Image from "next/image";
import { Eye, Trash2 } from "lucide-react";
import { StatusBadge } from "./Statusbadge";
import type { Offer } from "../../../types/offer"; // adjust to wherever Offer actually lives

// No saveCount on Offer yet — optional here so this compiles as-is.
// Swap in the real field once the API returns it; renders "—" until then.
type OfferRow = Offer & { saveCount?: number };

const DEAL_TYPE_LABELS: Record<Offer["dealType"], string> = {
  cashback: "Cashback",
  freebie: "Freebie",
  discount: "Discount",
  bogo: "BOGO",
  promo_code: "Promo Code",
  free_trial: "Free Trial",
  free_delivery: "Free Delivery",
  price_drop: "Price Drop",
};

function formatExpiry(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

interface OfferTableProps {
  offers: OfferRow[];
  onView: (offerId: string) => void;
  onDelete: (offerId: string) => void;
}

export function OfferTable({ offers, onView, onDelete }: OfferTableProps) {
  return (
    <>
      {/* ── Desktop table (md+) ── */}
      <table className="hidden md:table w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Awoofer</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Saves</th>
            <th className="px-4 py-3">Grabs</th>
            <th className="px-4 py-3">Expiry</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id} className="border-b border-gray-100">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={offer.imageUrl}
                    alt={offer.title}
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                  />
                  <span className="font-medium text-gray-900 line-clamp-2">
                    {offer.title}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-600">
                {offer.category.name}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {DEAL_TYPE_LABELS[offer.dealType] ?? offer.dealType}
              </td>
              <td className="px-4 py-3 text-gray-600">
                @{offer.contributor.username}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={offer.status} />
              </td>
              <td className="px-4 py-3 text-gray-600">
                {offer.saveCount ?? "—"}
              </td>
              <td className="px-4 py-3 text-gray-600">{offer.clickCount}</td>
              <td className="px-4 py-3 text-gray-600">
                {formatExpiry(offer.endDate)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onView(offer.id)}
                    aria-label={`View ${offer.title}`}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(offer.id)}
                    aria-label={`Delete ${offer.title}`}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Mobile card list (below md) ── */}
      <div className="md:hidden divide-y divide-gray-100">
        {offers.map((offer) => (
          <div key={offer.id} className="p-4 space-y-3">
            {/* Top row: image + title + status */}
            <div className="flex items-start gap-3">
              <Image
                src={offer.imageUrl}
                alt={offer.title}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm line-clamp-2 leading-snug">
                  {offer.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  @{offer.contributor.username}
                </p>
              </div>
              <StatusBadge status={offer.status} />
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
              <span>
                <span className="font-medium text-gray-600">Category:</span>{" "}
                {offer.category.name}
              </span>
              <span>
                <span className="font-medium text-gray-600">Type:</span>{" "}
                {DEAL_TYPE_LABELS[offer.dealType] ?? offer.dealType}
              </span>
              <span>
                <span className="font-medium text-gray-600">Expires:</span>{" "}
                {formatExpiry(offer.endDate)}
              </span>
            </div>

            {/* Stats + actions row */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-xs text-gray-500">
                <span>
                  <span className="font-medium text-gray-600">Saves:</span>{" "}
                  {offer.saveCount ?? "—"}
                </span>
                <span>
                  <span className="font-medium text-gray-600">Grabs:</span>{" "}
                  {offer.clickCount}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onView(offer.id)}
                  aria-label={`View ${offer.title}`}
                  className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(offer.id)}
                  aria-label={`Delete ${offer.title}`}
                  className="rounded-full p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}