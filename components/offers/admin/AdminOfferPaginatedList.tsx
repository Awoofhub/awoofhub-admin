import { useState } from 'react';
import PaginationButtons from "@/components/button/PaginationButtons";
import { Offer } from "@/types/offer";
import OfferRow from "./OfferRow";
import TableHeader from "./TableHeader";
import { useModerateOffer } from '@/features/offers/useModerateOffer';

interface Props {
  offers: Offer[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AdminOfferPaginatedList({ offers, currentPage, totalPages, onPageChange }: Props) {
  // Modal State for the table
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    offerId: string | null;
    action: 'approved' | 'rejected' | null;
  }>({ isOpen: false, offerId: null, action: null });

  const [adminNote, setAdminNote] = useState('');

  const { mutate: moderateOffer, isPending } = useModerateOffer();

  // Passed down to OfferRow
  const handleModerateClick = (id: string, action: 'approved' | 'rejected') => {
    setModalState({ isOpen: true, offerId: id, action });
  };

  const confirmModeration = () => {
    if (!modalState.offerId || !modalState.action) return;

    moderateOffer(
      { id: modalState.offerId, status: modalState.action, adminNote },
      {
        onSuccess: () => {
          setModalState({ isOpen: false, offerId: null, action: null });
          setAdminNote('');
        }
      }
    );
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left shadow-sm">
          <TableHeader />
          <tbody>
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
      <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />

      {/* Confirmation Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[150] p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {modalState.action === 'approved' ? 'Approve' : 'Reject'} Offer
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              {modalState.action === 'approved'
                ? 'Add any notes and approve this offer.'
                : 'Please explain why you are rejecting this offer.'}
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
                disabled={isPending}
                className={`flex-1 px-4 py-2 text-white font-semibold rounded-lg disabled:opacity-50 ${modalState.action === 'approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
              >
                {isPending ? 'Saving...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}