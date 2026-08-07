export interface UserStats {
    totalActive: number,
    businessActive: number,
    suspended: number,
    banned: number
}

export interface OfferStats {
    totalOffers: number,
    pendingOffers: number,
    activeOffers: number,
    expiredOffers: number
    suspendedOffers: number
}

export interface ReportStats {
    totalReports: number,
    pendingReports: number,
    activeReports: number,
    expiredReports: number
}

export interface CommentStats {
    totalComments: number
}

export interface Dashboard {
    users: UserStats,
    offers: OfferStats,
    reports: ReportStats,
    comments: CommentStats,
};
