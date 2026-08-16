export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  profileImageUrl: string | null;
  role: "user" | "business" | "admin";
  bio: string | null;
  address: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
  numOfDealPosted?: number;
  offerClicks?: number;
  usernameChangeLockedUntil: string;
}

export interface UserStats {
  offers: {
    totalUserOffers: number;
    activeUserOffers: number;
    expiredUserOffers: number;
    rejectedUserOffers: number;
  };
  comments: {
    totalUserComments: number;
  };
}
