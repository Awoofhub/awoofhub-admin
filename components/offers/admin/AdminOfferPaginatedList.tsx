import { useState } from 'react';
import PaginationButtons from "@/components/button/PaginationButtons";
import { Offer } from "@/types/offer";
import OfferRow from "./OfferRow";
import TableHeader from "./TableHeader";
import { useModerateOffer } from '@/features/offers/useModerateOffer';
import { useDeleteOffer } from '@/features/offers/useDeleteOffer';

interface Props {
  offers: Offer[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AdminOfferPaginatedList({ offers, currentPage, totalPages, onPageChange }: Props) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    offerId: string | null;
    action: 'approved' | 'rejected' | 'pending' | 'delete' | null;
  }>({ isOpen: false, offerId: null, action: null });

  const [adminNote, setAdminNote] = useState('');

  const { mutate: moderateOffer, isPending: isModerating } = useModerateOffer();
  const { mutate: deleteOffer, isPending: isDeleting } = useDeleteOffer();

  const handleModerateClick = (id: string, action: 'approved' | 'rejected' | 'pending' | 'delete') => {
    setModalState({ isOpen: true, offerId: id, action });
  };

  const confirmModeration = () => {
    if (!modalState.offerId || !modalState.action) return;

    if (modalState.action === 'delete') {
      deleteOffer(
        { id: modalState.offerId, reason: adminNote },
        {
          onSuccess: () => {
            setModalState({ isOpen: false, offerId: null, action: null });
            setAdminNote('');
          }
        }
      );
    } else {
      moderateOffer(
        { id: modalState.offerId, status: modalState.action, adminNote },
        {
          onSuccess: () => {
            setModalState({ isOpen: false, offerId: null, action: null });
            setAdminNote('');
          }
        }
      );
    }
  };

  const isPending = isModerating || isDeleting;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left whitespace-nowrap relative">
          <TableHeader />
          <tbody className="divide-y divide-gray-100">
            {offers.map((offer) => (
              <OfferRow
                key={offer.id}
                offer={offer}
                onModerateClick={handleModerateClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="shrink-0 bg-white border-t border-gray-100 p-2 sm:p-4 z-20">
        <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
      </div>

      {/* Multi-Action Confirmation Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-150 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">
              {modalState.action === 'approved' ? 'Approve' : modalState.action === 'rejected' ? 'Reject' : modalState.action === 'delete' ? 'Delete' : 'Mark as Pending'} Offer
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              {modalState.action === 'approved'
                ? 'Add any notes and approve this offer.'
                : modalState.action === 'rejected'
                  ? 'Please explain why you are rejecting this offer.'
                  : modalState.action === 'delete'
                    ? 'Please provide a reason for permanently deleting this offer. This cannot be undone.'
                    : 'Add a reason for marking this offer as pending review.'}
            </p>
            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Enter your notes here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none mb-6 h-32 resize-none text-sm"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setModalState({ isOpen: false, offerId: null, action: null }); setAdminNote(''); }}
                className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmModeration}
                disabled={isPending || (!adminNote.trim() && modalState.action !== 'approved')}
                className={`flex-1 px-4 py-2 text-white font-semibold rounded-lg disabled:opacity-50 ${modalState.action === 'approved' ? 'bg-green-600 hover:bg-green-700'
                    : modalState.action === 'rejected' || modalState.action === 'delete' ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-orange-500 hover:bg-orange-600'
                  }`}
              >
                {isPending ? 'Saving...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}