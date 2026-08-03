export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  profileImageUrl: string | null;
  role: string;
  bio: string | null;
  address: string | null;
  website: string | null;
  status: "active" | "suspended" | "banned";
  createdAt: string;
  updatedAt: string;
  numOfDealPosted?: number;
  offerClicks?: number;
}
