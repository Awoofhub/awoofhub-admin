export interface UserStats {
  totalUsers: number;
  bannedUsers: number;
}

export interface OfferStats {
  totalOffers: number;
  pendingOffers: number;
  activeOffers: number;
  rejectedOffers: number;
  expiredOffers: number;
  suspendedOffers: number;
}

export interface ReportStats {
  pendingReports: number;
}

export interface ClickStats {
  totalClicks: number;
}

export interface SupportStats {
  supportTickets: number;
}

export interface DashboardData {
  users: UserStats;
  offers: OfferStats;
  reports: ReportStats;
  clicks: ClickStats;
  support: SupportStats;
}

export interface DashboardOfferChartData {
  weekOne: number;
  weekTwo: number;
  weekThree: number;
  weekFour: number;
  weekFive: number;
}
