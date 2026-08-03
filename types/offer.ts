export interface Offer {
  
  brandName: string;
  dealType:
    | "cashback"
    | "freebie"
    | "discount"
    | "bogo"
    | "promo_code"
    | "free_trial"
    | "free_delivery"
    | "price_drop";
  status: string;
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  termsAndConditions: string;
  value: string;
  externalLink: string;
  couponCode?: string;
  business: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  location: string;
  moderationStatus: "pending" | "approved" | "rejected" | "unknown";
  adminNote: string | null;
  statusUpdatedAt: string | null;
  createdAt: string;
  endDate: string;
  avgRating: number;
  reviewCount: number;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  ratingDistribution: {};
}

export interface Stats {
  totalAds: number;
  activeAds: number;
  pendingAds: number;
  rejectedAds: number;
  expiredAds: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface OffersByMonthData {
  month: string; // e.g., "2026-03"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [category: string]: any;
}

export interface ExpiringOffers {
  "1-3 days": number;
  "4-7 days": number;
  "7+ days": number;
}

export interface OffersDashboard {
  stats: Stats;
  topOffers: Offer[];
  charts: {
    categoryPie: CategoryData[];
    offersByMonth: OffersByMonthData[];
    expiringOffers: ExpiringOffers;
  };
}
