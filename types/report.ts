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
