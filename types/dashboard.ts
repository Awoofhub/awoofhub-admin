export interface UserStats {
  totalUsers: number;
}

export interface OfferStats {
  activeOffers: number;
  totalOffers: number;
}

export interface ReportStats {
  pendingReports: number;
}

export interface ClickStats {
  totalClicks: number;
}

export interface Dashboard {
  users: UserStats;
  offers: OfferStats;
  reports: ReportStats;
  clicks: ClickStats;
}