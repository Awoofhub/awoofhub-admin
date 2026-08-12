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
<<<<<<< HEAD
=======
  usernameChangeLockedUntil: string;
>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b
}

