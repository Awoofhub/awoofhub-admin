// AllOffersPage.tsx
// Wires the 5 pieces together. Owns UI state (search/filter/tab/page) since
// that's presentational, but leaves data-fetching and the actual
// view/delete side effects to the parent — pass real handlers in via props.

"use client";

import { useMemo, useState } from "react";
import { SearchFilterBar, type FilterOption } from "./Searchfilterbar";
import { StatusTabs, type OfferTabKey } from "./Statustabs";
import { OfferTable } from "./Offertable";
import { Pagination } from "./Pagination";
import PendingOfferModal from "./PendingOfferModal";
import ActiveOfferModal from "./ActiveOfferModal";
import RejectedOfferModal from "./RejectedOfferModal";
import ConfirmationModal from "./ConfirmationModal";
import SuccessModal from "./SuccessModal";
import { FiChevronRight } from "react-icons/fi";

import type { Offer, Stats } from "../../../types/offer"; // adjust to your real path

const PAGE_SIZE = 10;

const DEAL_TYPE_OPTIONS: FilterOption[] = [
  { value: "cashback", label: "Cashback" },
  { value: "freebie", label: "Freebie" },
  { value: "discount", label: "Discount" },
  { value: "bogo", label: "BOGO" },
  { value: "promo_code", label: "Promo Code" },
  { value: "free_trial", label: "Free Trial" },
  { value: "free_delivery", label: "Free Delivery" },
  { value: "price_drop", label: "Price Drop" },
];

interface AllOffersPageProps {
  offers: Offer[];
  stats: Stats;
  onView: (offerId: string) => void;
  onDelete: (offerId: string) => void;
  onApprove: (offerId: string) => void;
  onReject: (offerId: string) => void;
  onSuspend?: (offerId: string) => void;
}

// Maps each status tab to the real fields on Offer.
// - status backs pending/approved(active)/rejected. Note: the Offer type
//   currently declares this field as `moderationStatus`, but the live API
//   actually returns it as `status` (confirmed via raw response logging) —
//   flag this to whoever owns types/offer.ts so the type matches reality.
// - "expired" has no backing status value — derived from endDate vs now.
// - "suspended" has no backing field on Offer at all yet; always empty
//   until the backend adds one to represent it.
function offerMatchesTab(offer: Offer, tab: OfferTabKey): boolean {
  const isExpired = new Date(offer.endDate) < new Date();

  switch (tab) {
    case "all":
      return true;
    case "active":
      return offer.status === "approved" && !isExpired;
    case "pending":
      return offer.status === "pending";
    case "rejected":
      return offer.status === "rejected";
    case "expired":
      return isExpired;
    case "suspended":
      return false;
    default:
      return false;
  }
}

export function AllOffersPage({
  offers,
  stats,
  onView,
  onDelete,
  onApprove,
  onReject,
  onSuspend,
}: AllOffersPageProps) {
  const [search, setSearch] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [dealTypeValue, setDealTypeValue] = useState("");
  const [activeTab, setActiveTab] = useState<OfferTabKey>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // ── Modal state ──
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [pendingAction, setPendingAction] = useState<"approved" | "rejected" | "suspended" | null>(null);
  const [completedAction, setCompletedAction] = useState<"approved" | "rejected" | "suspended" | null>(null);

  // Category options are dynamic (user-created), so derive them from the
  // offers you already have rather than hardcoding like deal type.
  const categoryOptions = useMemo<FilterOption[]>(() => {
    const seen = new Map<string, string>();
    offers.forEach((offer) =>
      seen.set(offer.category.slug, offer.category.name),
    );
    return Array.from(seen, ([value, label]) => ({ value, label }));
  }, [offers]);

  const filteredOffers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return offers.filter((offer) => {
      const matchesSearch =
        query === "" ||
        offer.title.toLowerCase().includes(query) ||
        offer.contributor.username.toLowerCase().includes(query);
      const matchesCategory =
        categoryValue === "" || offer.category.slug === categoryValue;
      const matchesDealType =
        dealTypeValue === "" || offer.dealType === dealTypeValue;
      const matchesTab = offerMatchesTab(offer, activeTab);
      return matchesSearch && matchesCategory && matchesDealType && matchesTab;
    });
  }, [offers, search, categoryValue, dealTypeValue, activeTab]);

  const pagedOffers = filteredOffers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Any filter/search/tab change resets to page 1 so you don't end up
  // stranded on an empty page after narrowing the results.
  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }
  function handleCategoryChange(value: string) {
    setCategoryValue(value);
    setCurrentPage(1);
  }
  function handleDealTypeChange(value: string) {
    setDealTypeValue(value);
    setCurrentPage(1);
  }
  function handleTabChange(tab: OfferTabKey) {
    setActiveTab(tab);
    setCurrentPage(1);
  }

  // If the viewed offer is pending, approved, or rejected, show the corresponding preview modal.
  // Otherwise fall through to the parent's default onView (e.g. navigate).
  function handleView(offerId: string) {
    const offer = offers.find((o) => o.id === offerId);
    if (offer && (offer.status === "pending" || offer.status === "approved" || offer.status === "rejected")) {
      setSelectedOffer(offer);
    } else {
      onView(offerId);
    }
  }

  function handleModalApprove(offerId: string) {
    setPendingAction("approved");
  }

  function handleModalReject(offerId: string) {
    setPendingAction("rejected");
  }

  function handleModalSuspend(offerId: string) {
    setPendingAction("suspended");
  }

  function handleConfirm() {
    if (!pendingAction || !selectedOffer) return;
    if (pendingAction === "approved") {
      onApprove(selectedOffer.id);
    } else if (pendingAction === "rejected") {
      onReject(selectedOffer.id);
    } else if (pendingAction === "suspended") {
      onSuspend?.(selectedOffer.id);
    }
    setCompletedAction(pendingAction);
    setPendingAction(null);
  }

  function handleCancelConfirmation() {
    setPendingAction(null);
  }

  function handleSuccessBack() {
    setCompletedAction(null);
    setSelectedOffer(null);
  }

  // Backend dashboard stats don't include a rejected count, so derive it
  // from the same offers data driving the table — keeps the tab count and
  // the actual filtered rows guaranteed to agree.
  const computedStats: Stats = useMemo(
    () => ({
      ...stats,
      rejectedAds: offers.filter((offer) => offerMatchesTab(offer, "rejected"))
        .length,
    }),
    [stats, offers],
  );

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="space-y-4 p-3 sm:p-4 md:p-6">
         <h1 className="text-[16px] sm:text-[20px] font-bold text-slate-900 flex items-center gap-1.5 sm:gap-2">
                    <FiChevronRight
                      size={16}
                      strokeWidth={2.5}
                      className="text-slate-600 hidden sm:block"
                    />
                    All Offers
                  </h1>
        <SearchFilterBar
          searchValue={search}
          onSearchChange={handleSearchChange}
          categoryOptions={categoryOptions}
          categoryValue={categoryValue}
          onCategoryChange={handleCategoryChange}
          dealTypeOptions={DEAL_TYPE_OPTIONS}
          dealTypeValue={dealTypeValue}
          onDealTypeChange={handleDealTypeChange}
        />
        <StatusTabs
          stats={computedStats}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />{" "}
      </div>

      <div className="overflow-x-auto border-t border-gray-100">
        <OfferTable offers={pagedOffers} onView={handleView} onDelete={onDelete} />
      </div>

      <div className="border-t border-gray-100">
        <Pagination
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          totalItems={filteredOffers.length}
          onPrevious={() => setCurrentPage((p) => Math.max(1, p - 1))}
          onNext={() => setCurrentPage((p) => p + 1)}
        />
      </div>

      {/* ── Pending offer preview modal ── */}
      {selectedOffer && selectedOffer.status === "pending" && !pendingAction && !completedAction && (
        <PendingOfferModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
          onApprove={handleModalApprove}
          onReject={handleModalReject}
          onViewMore={(id) => {
            setSelectedOffer(null);
            onView(id);
          }}
        />
      )}

      {/* ── Active offer preview modal ── */}
      {selectedOffer && selectedOffer.status === "approved" && !pendingAction && !completedAction && (
        <ActiveOfferModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
          onSuspend={handleModalSuspend}
          onViewMore={(id) => {
            setSelectedOffer(null);
            onView(id);
          }}
        />
      )}

      {/* ── Rejected offer preview modal ── */}
      {selectedOffer && selectedOffer.status === "rejected" && !pendingAction && !completedAction && (
        <RejectedOfferModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
          onViewMore={(id) => {
            setSelectedOffer(null);
            onView(id);
          }}
        />
      )}

      {/* Confirmation step */}
      <ConfirmationModal
        isOpen={pendingAction !== null}
        action={pendingAction}
        onConfirm={handleConfirm}
        onCancel={handleCancelConfirmation}
      />

      {/* Success step */}
      <SuccessModal
        isOpen={completedAction !== null}
        action={completedAction}
        onBack={handleSuccessBack}
      />
    </div>
  );
}
