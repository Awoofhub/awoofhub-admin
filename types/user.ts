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
  status: 'active' | 'suspended' | 'blocked' | 'deleted'
  createdAt: string;
  updatedAt: string;
  offerPosted?: number;
  usernameChangeLockedUntil: string;
}
