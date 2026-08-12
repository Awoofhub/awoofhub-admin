export interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  value: string;
<<<<<<< HEAD
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
  externalLink: string;
  couponCode?: string;
   contributor: {
=======
  dealType: "cashback" | "freebie" | "discount" | "bogo" | "promo_code" | "free_trial" | "free_delivery" | "price_drop";
  externalLink: string;
  couponCode?: string;
  contributor: {
>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b
    id: string;
    name: string;
    username: string;
    profileImageUrl?: string;
    createdAt: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  location: string;
  brandName: string;
  status: "pending" | "approved" | "rejected" | "suspended";
  createdAt: string;
  endDate: string;
  avgRating: number;
  reviewCount: number;
  clickCount: number;
  isTrending: boolean;
  ratingDistribution: any;
<<<<<<< HEAD
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
=======
>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b
}
