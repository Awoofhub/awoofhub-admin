export const EXPIRING_THRESHOLD_DAYS = 3;

export function isExpiringSoon(endDate: string): boolean {
    const diffMs = new Date(endDate).getTime() - Date.now();
    const daysLeft = diffMs / (1000 * 60 * 60 * 24);
    return diffMs > 0 && daysLeft < EXPIRING_THRESHOLD_DAYS;
}

export function formatExpiresIn(endDate: string): string {
    const diffMs = new Date(endDate).getTime() - Date.now();
    if (diffMs <= 0) return 'Expired';

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    if (days >= EXPIRING_THRESHOLD_DAYS) {
        return `${days} day${days > 1 ? 's' : ''}`;
    }

    return `${days}d:${hours}h:${minutes}m`;
}