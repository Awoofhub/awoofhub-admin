export interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  value: string;
  dealType: "cashback" | "freebie" | "discount" | "bogo" | "promo_code" | "free_trial" | "free_delivery" | "price_drop";
  externalLink: string;
  couponCode?: string;
  contributor: {
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
}
