import { useState } from "react";
import { Offer } from "@/types/offer";
import OfferCard from "./OfferCard";
import { useModerateOffer } from "@/features/offers/useModerateOffer";
import { useDeleteOffer } from "@/features/offers/useDeleteOffer";

interface Props {
  offers: Offer[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function AdminOfferPaginatedList({
  offers,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    offerId: string | null;
    action: "approved" | "rejected" | "pending" | "delete" | null;
  }>({ isOpen: false, offerId: null, action: null });

  const [adminNote, setAdminNote] = useState("");

  const { mutate: moderateOffer, isPending: isModerating } = useModerateOffer();
  const { mutate: deleteOffer, isPending: isDeleting } = useDeleteOffer();

  const handleModerateClick = (
    id: string,
    action: "approved" | "rejected" | "pending" | "delete",
  ) => {
    setModalState({ isOpen: true, offerId: id, action });
  };

  const confirmModeration = () => {
    if (!modalState.offerId || !modalState.action) return;

    if (modalState.action === "delete") {
      deleteOffer(
        { id: modalState.offerId, reason: adminNote },
        {
          onSuccess: () => {
            setModalState({ isOpen: false, offerId: null, action: null });
            setAdminNote("");
          },
        },
      );
    } else {
      moderateOffer(
        { id: modalState.offerId, status: modalState.action, adminNote },
        {
          onSuccess: () => {
            setModalState({ isOpen: false, offerId: null, action: null });
            setAdminNote("");
          },
        },
      );
    }
  };

  const isPending = isModerating || isDeleting;
  const actionLabel =
    modalState.action === "approved"
      ? "approve"
      : modalState.action === "rejected"
        ? "reject"
        : modalState.action === "delete"
          ? "delete"
          : "mark as pending";
  const requiresReason =
    modalState.action === "rejected" ||
    modalState.action === "delete" ||
    modalState.action === "pending";

  const pendingOffers = offers.filter((offer) => offer.status === "pending");

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-auto  bg-transparent">
        <div className="flex flex-col gap-4 sm:gap-6 max-w-7xl mx-auto">
          {pendingOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onModerateClick={handleModerateClick}
            />
          ))}
        </div>
      </div>

      {/* Multi-Action Confirmation Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[150] p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center">
            <div className="mb-6 flex items-center justify-center">
              {modalState.action === "rejected" ? (
                <img
                  src="/reject.png"
                  alt="Reject offer"
                  className="w-24 h-24 object-contain"
                />
              ) : (
                <img
                  src="/Successs.png"
                  alt="Success"
                  className="w-24 h-24 object-contain"
                />
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#232323] mb-4 text-center px-4 leading-snug">
              Confirm that you are about to {actionLabel} this offer
            </h2>

            {requiresReason && (
              <p className="text-gray-600 mb-6 text-sm text-left w-full">
                {modalState.action === "rejected"
                  ? "Specify why this offer is being rejected."
                  : modalState.action === "delete"
                    ? "Please provide a reason for permanently deleting this offer. This cannot be undone."
                    : "Add a reason for marking this offer as pending review."}
              </p>
            )}

            {requiresReason && (
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Enter your notes here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none mb-6 h-32 resize-none text-sm"
              />
            )}

            <div className="w-full flex flex-col gap-3">
              <button
                onClick={confirmModeration}
                disabled={isPending || (requiresReason && !adminNote.trim())}
                className={`w-full font-bold py-3 rounded-lg transition-colors text-base disabled:opacity-50 ${
                  modalState.action === "rejected" ||
                  modalState.action === "delete"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : modalState.action === "pending"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-[#00a651] hover:bg-[#009045] text-white"
                }`}
              >
                {isPending
                  ? modalState.action === "approved"
                    ? "Approving..."
                    : modalState.action === "rejected"
                      ? "Rejecting..."
                      : modalState.action === "delete"
                        ? "Deleting..."
                        : "Saving..."
                  : modalState.action === "approved"
                    ? "Approve Now"
                    : modalState.action === "rejected"
                      ? "Reject Now"
                      : modalState.action === "delete"
                        ? "Delete Now"
                        : "Confirm"}
              </button>

              <button
                onClick={() => {
                  setModalState({ isOpen: false, offerId: null, action: null });
                  setAdminNote("");
                }}
                disabled={isPending}
                className="w-full bg-white border-2 border-gray-900 hover:bg-gray-50 text-gray-900 font-bold py-3 rounded-lg transition-colors text-base disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
