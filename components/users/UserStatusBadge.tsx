import { UserDisplayStatus } from "@/types/user";

const STATUS_BADGE: Record<UserDisplayStatus, { label: string; className: string }> = {
    active: { label: 'Active', className: 'bg-green-50 text-green-600' },
    banned: { label: 'Banned', className: 'bg-red-50 text-red-600' },
    suspended: { label: 'Suspended', className: 'bg-orange-50 text-orange-600' },
    deleted: { label: 'Deleted', className: 'bg-gray-100 text-gray-600' },
};

interface Props {
    status: UserDisplayStatus;
}

export default function UserStatusBadge({ status }: Props) {
  
    const badge = STATUS_BADGE[status];

    return (
        <span
            className={`hidden xs:block text-xs lg:text-sm font-semibold px-4 py-1 rounded-full ${badge.className}`}
        >
            {badge.label}
        </span>
    );
}