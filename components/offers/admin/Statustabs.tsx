// StatusTabs.tsx
// Filter bar with counts, e.g. "All (310)" / "Active (93)" / ...
// Controlled component: parent owns the active tab and passes it back down,
// consistent with the onApprove/onReject callback pattern in DealCard.tsx.

import type { Stats } from "../../../types/offer"; // adjust to wherever OfferStats actually lives

export type OfferTabKey =
  | "all"
  | "active"
  | "pending"
  | "rejected"
  | "suspended"
  | "expired";

// OfferStats currently only has totalOffers / pendingOffers / activeOffers /
// expiredOffers — no rejected or suspended counts. Typed optional here so
// this compiles against OfferStats as-is; both tabs show 0 until the API
// returns real numbers. Add rejectedOffers and suspendedOffers to OfferStats
// when you can.
type OfferStatsWithGaps = Stats & {
  rejectedOffers?: number;
  suspendedOffers?: number;
};

interface StatusTabsProps {
  stats: OfferStatsWithGaps;
  activeTab: OfferTabKey;
  onTabChange: (tab: OfferTabKey) => void;
}

export function StatusTabs({ stats, activeTab, onTabChange }: StatusTabsProps) {
  const tabs: { key: OfferTabKey; label: string; count: number }[] = [
    { key: "all", label: "All", count: stats.totalAds },
    { key: "active", label: "Active", count: stats.activeAds },
    { key: "pending", label: "Pending", count: stats.pendingAds },
    { key: "rejected", label: "Rejected", count: stats.rejectedAds ?? 0 },
    { key: "suspended", label: "Suspended", count: stats.suspendedOffers ?? 0 },
    { key: "expired", label: "Expired", count: stats.expiredAds },
  ];

  return (
    <div className="flex w-full px-3 gap-2 items-center md:gap-8 rounded-2xl bg-gray-100 md:px-6 py-3 overflow-x-auto scrollbar-hide">
      {tabs.map(({ key, label, count }) => {
        const isActive = key === activeTab;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onTabChange(key)}
            aria-pressed={isActive}
            className={`whitespace-nowrap shrink-0 text-xs rounded-full md:text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary px-3 md:px-5 py-2.5 text-white"
                : "px-2 md:px-1 py-2.5 text-gray-600 hover:text-gray-900"
            }`}
          >
            {label} ({count})
          </button>
        );
      })}
    </div>
  );
}