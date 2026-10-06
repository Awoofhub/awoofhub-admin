import { Comment } from "./comment";
import { Offer } from "./offer";
import { User } from "./user";

export interface UpdateReportStatusData {
  status: "pending" | "resolved" | "dismissed";
}

export interface Report {
  id: string;
  type: "spam" | "scam" | "abuse" | "explicit" | "violence" | "illegal" | "self_harm" | "other";
  description: string;
  targetType: "user" | "offer" | "comment";
  targetId: string;
  reporter: User;
  createdAt: string;
  updatedAt: string;
  status: "pending" | "resolved" | "dismissed";
}

export interface ReportTabsCount {
  offers: number;
  users: number;
  comments: number;
}

export interface CommentReport {
  report: Report;
  comment: Comment;
}

export interface OfferReport {
  offer: Offer;
  reports: Report[];
}


export interface UserReport {
  user: User;
  reports: Report[];
}

