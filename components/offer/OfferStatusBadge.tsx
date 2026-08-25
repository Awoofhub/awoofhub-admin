import { EffectiveOfferStatus } from '@/utils/getEffectiveOfferStatus';

const STATUS_BADGE: Record<EffectiveOfferStatus, { label: string; className: string }> = {
    approved: { label: 'Active', className: 'bg-green-50 text-green-600' },
    pending: { label: 'Pending', className: 'bg-yellow-50 text-yellow-600' },
    rejected: { label: 'Rejected', className: 'bg-red-50 text-red-600' },
    suspended: { label: 'Suspended', className: 'bg-orange-50 text-orange-600' },
    expired: { label: 'Expired', className: 'bg-gray-100 text-gray-600' },
};

export default function OfferStatusBadge({ status }: { status: EffectiveOfferStatus }) {
    const badge = STATUS_BADGE[status];
    if (!badge) return null;
    return (
        <span className={`hidden xs:block text-xs lg:text-sm font-semibold px-4 py-1 rounded-full ${badge.className}`}>{badge.label}</span>
    );
}