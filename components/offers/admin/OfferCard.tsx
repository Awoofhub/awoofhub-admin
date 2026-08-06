import { Offer } from "@/types/offer";
import { format } from "date-fns";
import { Globe, Link as LinkIcon, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import SuccessModal from "./SuccessModal";

interface Props {
  offer: Offer;
  onModerateClick: (
    id: string,
    action: "approved" | "rejected" | "pending" | "delete",
  ) => void;
}

export default function OfferCard({ offer, onModerateClick }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    "approved" | "rejected" | null
  >(null);
  const [completedAction, setCompletedAction] = useState<
    "approved" | "rejected" | null
  >(null);
  const isOnline = offer.location?.toLowerCase().includes("online");
  const timeAgo = "13 hrs ago"; // TODO: calculate from createdAt if we want to be exact. The design shows 13 hrs ago.

  // Determine deal type (mocked based on category or value for now, as it's not in the type)
  const dealType = offer.dealType;
  const categoryName = offer.category?.name;
  const brandName = offer.brandName;

  const handleCancel = () => {
    setPendingAction(null);
    setCompletedAction(null);
  };

  const handleConfirm = () => {
    if (!pendingAction) return;

    onModerateClick(offer.id, pendingAction);
    setCompletedAction(pendingAction);
    setPendingAction(null);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden p-3 sm:p-5 gap-4 sm:gap-6 border border-gray-100/50">
      {/* Left side: Image */}
      <div className="w-full md:w-[280px] lg:w-[350px] shrink-0 h-[220px] md:h-auto min-h-[220px] relative rounded-lg overflow-hidden">
        <Image
          src={offer.imageUrl}
          alt={offer.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Right side: Content */}
      <div className="flex flex-col flex-1">
        {/* Header: Handle & Time */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700 text-sm">
              @
              {offer.contributor?.username?.replace(/\s+/g, "").toLowerCase() ||
                "awoofqueen"}
            </span>
            <span className="bg-orange-50 text-orange-500 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Awoofer
            </span>
          </div>
          <span className="text-red-500 text-xs font-semibold">{timeAgo}</span>
        </div>

        {/* Title */}
        <h3 className="text-[17px] leading-tight sm:text-[19px] font-bold text-slate-900 mb-3">
          {offer.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
            {dealType}
          </span>
          <span className="border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
            {categoryName}
          </span>
          <span className="border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
            {brandName}
          </span>
        </div>

        {/* Location & Link */}
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            {isOnline ? (
              <Globe className="w-4 h-4 text-gray-400" />
            ) : (
              <MapPin className="w-4 h-4 text-gray-400" />
            )}
            <span className="italic">{offer.location || "Nationwide"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-500 text-sm">
            <LinkIcon className="w-4 h-4 text-orange-500" />
            <a
              href={offer.externalLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline line-clamp-1"
            >
              {offer.externalLink}
            </a>
          </div>
        </div>

        {/* Expiry */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-500 text-[13px] font-medium">
            Expires:{" "}
            <span className="text-slate-800 font-bold">
              {format(new Date(offer.endDate), "d/M/yyyy")}
            </span>
          </span>
          <span className=" text-red-500 text-xs px-4 py-1  font-bold capitalize max-w-[80px]">
            {offer.value}
          </span>
        </div>

        {/* Details */}
        <div className="mb-5 flex-1">
          <span className="font-bold text-[11px] text-slate-800 mb-1 block">
            Details
          </span>
          <p
            className={
              isExpanded
                ? "text-gray-500 text-[13px] leading-relaxed"
                : "text-gray-500 text-[13px] line-clamp-2 md:line-clamp-1 leading-relaxed"
            }
          >
            {offer.description}
          </p>
          {isExpanded ? (
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-orange-500 hover:underline text-[13px] mt-1"
            >
              less
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="text-orange-500 hover:underline text-[13px] mt-1"
            >
              more
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto">
          <button
            onClick={() => {
              setCompletedAction(null);
              setPendingAction("approved");
            }}
            className="flex-1 bg-[#00a651] hover:bg-[#009045] text-white font-bold py-2 rounded-md transition-colors text-sm"
          >
            Approve
          </button>
          <button
            onClick={() => {
              setCompletedAction(null);
              setPendingAction("rejected");
            }}
            className="flex-1 bg-[#e30613] hover:bg-[#c20510] text-white font-bold py-2 rounded-md transition-colors text-sm"
          >
            Reject
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={pendingAction !== null}
        action={pendingAction}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <SuccessModal
        isOpen={completedAction !== null}
        action={completedAction}
        onBack={() => {
          setCompletedAction(null);
          setPendingAction(null);
        }}
      />
    </div>
  );
}
