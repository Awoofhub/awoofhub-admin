export interface UserStats {
  totalUsers: number;
  bannedUsers: number;
}

export interface OfferStats {
  totalOffers: number;
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


export interface UserDashboard {
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

export interface DashboardOfferChartData {
  weekOne: number;
  weekTwo: number;
  weekThree: number;
  weekFour: number;
  weekFive: number;
}
