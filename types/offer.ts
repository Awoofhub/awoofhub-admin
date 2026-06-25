export interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;

  contributor: {
    id: string;
    name: string;
    username: string;
    createdAt: string;
  };

  category: {
    id: string;
    name: string;
    slug: string;
  };

  location: string;
  value: string;

  externalLink: string;

  // NEW fields added by backend
  brandName: string;
  dealType: string;
  clickCount: number;

  couponCode?: string;

  status: string;

  createdAt: string;
  endDate: string;
  avgRating: number;
  reviewCount: number;

  termsAndConditions?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ratingDistribution?: any;
  adminNote?: string | null;
  statusUpdatedAt?: string | null;
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
