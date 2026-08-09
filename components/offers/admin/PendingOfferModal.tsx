// PendingOfferModal.tsx
// Full-screen overlay modal shown when the admin clicks the eye icon on a
// pending offer in the All Offers table. Displays the offer preview and
// provides Approve / Reject / View-more actions.

"use client";

import Image from "next/image";
import { useState } from "react";
import { X, Clock, MapPin, Globe, Link as LinkIcon } from "lucide-react";
import { format } from "date-fns";
import type { Offer } from "../../../types/offer";

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

interface PendingOfferModalProps {
  offer: Offer;
  onClose: () => void;
  onApprove: (offerId: string) => void;
  onReject: (offerId: string) => void;
  onViewMore: (offerId: string) => void;
}

/** Relative time string, e.g. "13 mins ago", "2 hours ago", "3 days ago". */
function timeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

/** Two-letter initials from a full name. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function PendingOfferModal({
  offer,
  onClose,
  onApprove,
  onReject,
  onViewMore,
}: PendingOfferModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isOnline = offer.location?.toLowerCase().includes("online");

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 pt-16 sm:p-6 sm:pt-20 "
      onClick={onClose}
    >
      {/* Wrapper to allow close button to pop out without clipping */}
      <div className="relative w-full max-w-[95vw] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[782px] animate-in fade-in zoom-in-95">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 z-10 rounded-full bg-white p-1.5 md:p-2 text-gray-500 hover:text-gray-900 transition-colors shadow-md border border-gray-100"
          aria-label="Close"
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Modal panel */}
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-h-[85vh] overflow-y-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >

        {/* ── Hero image ── */}
        <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[320px] shrink-0 overflow-hidden rounded-t-2xl bg-gray-100">
          <Image
            src={offer.imageUrl}
            alt={offer.title}
            fill
            priority
            className="object-cover w-full h-full"
          />
        </div>

        {/* ── Body ── */}
        <div className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
          {/* Title + pending badge */}
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[17px] font-bold text-slate-900 leading-snug flex-1">
              {offer.title}
            </h2>
            <span className="inline-flex items-center gap-1.5 shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
              <Clock className="h-3.5 w-3.5" />
              Pending
            </span>
          </div>

          {/* Brand + tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-orange-500 text-sm font-semibold">
              {offer.brandName}
            </span>
            <span className="border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
              {DEAL_TYPE_LABELS[offer.dealType] ?? offer.dealType}
            </span>
            <span className="border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
              {offer.category.name}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            {isOnline ? (
              <Globe className="w-4 h-4 text-gray-400" />
            ) : (
              <MapPin className="w-4 h-4 text-gray-400" />
            )}
            <span>{offer.location || "Nationwide"}</span>
          </div>

          {/* External link */}
          {offer.externalLink && (
            <div className="flex items-center gap-1.5 text-orange-500 text-sm">
              <LinkIcon className="w-4 h-4 shrink-0" />
              <a
                href={offer.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline truncate"
              >
                {offer.externalLink}
              </a>
            </div>
          )}

          {/* Expiry + value */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-[13px] font-medium">
              Expires:{" "}
              <span className="text-slate-800 font-bold">
                {format(new Date(offer.endDate), "d/M/yyyy")}
              </span>
            </span>
            {offer.value && (
              <span className="inline-flex items-center gap-1 text-red-500 text-xs font-bold">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <path d="M12 18V6" />
                </svg>
                {offer.value}
              </span>
            )}
          </div>

          {/* Divider */}
          <hr className="border-gray-100" />

          {/* Description */}
          <div>
            <span className="font-bold text-[11px] text-slate-800 uppercase tracking-wide mb-1 block">
              Details
            </span>
            <p
              className={
                isExpanded
                  ? "text-gray-500 text-[13px] leading-relaxed"
                  : "text-gray-500 text-[13px] line-clamp-2 leading-relaxed"
              }
            >
              {offer.description}
            </p>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-orange-500 hover:underline text-[13px] mt-1 font-medium"
            >
              {isExpanded ? "less" : "more"}
            </button>
          </div>

          {/* Divider */}
          <hr className="border-gray-100" />

          {/* Contributor */}
          <div className="flex items-center gap-3">
            {offer.contributor.profileImageUrl ? (
              <Image
                src={offer.contributor.profileImageUrl}
                alt={offer.contributor.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {initials(offer.contributor.name)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {offer.contributor.name}
              </p>
              <p className="text-xs text-gray-400">
                posted by this Awoofer {timeAgo(offer.createdAt)}
              </p>
            </div>
          </div>

          {/* ── Action buttons ── */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onReject(offer.id)}
              className="flex-1 bg-[#e30613] hover:bg-[#c20510] text-white font-bold py-1 rounded-lg transition-colors text-sm"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => onViewMore(offer.id)}
              className="flex-1 border-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-bold py-1 rounded-lg transition-colors text-sm"
            >
              View more
            </button>
            <button
              type="button"
              onClick={() => onApprove(offer.id)}
              className="flex-1 bg-[#00a651] hover:bg-[#009045] text-white font-bold py-1 rounded-lg transition-colors text-sm"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
