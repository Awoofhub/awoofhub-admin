import { User } from "@/types/user";
import { formatDate } from "@/utils/formatDate";
import ContributorAvatar from "../offer/ContributorAvatar";
import { Column } from "../table/BaseTable";


const STATUS_BADGE: Record<User["status"], { label: string; className: string; }> = {
    active: { label: "Active", className: "bg-[#20B5261A] text-[#006400]" },
    suspended: { label: "Suspended", className: "bg-[#FFC0001A] text-[#FE4F04]" },
    blocked: { label: "Banned", className: "bg-[#E706061A] text-[#E70606]" },
    deleted: { label: "Deleted", className: "bg-[#59585833] text-[#595858]" },
};

function StatusBadge({ status }: { status: User["status"] }) {
    const badge = STATUS_BADGE[status];
    if (!badge) {
        return (
            <span className="inline-flex items-center text-sm font-medium font-baloo px-4 py-1 rounded-full bg-gray-100 text-gray-500">
                {status ?? "Unknown"}
            </span>
        );
    }
    return (
        <span className={`inline-flex items-center text-sm font-medium font-baloo px-4 py-1 rounded-full ${badge.className}`}>
            {badge.label}
        </span>
    );
}

export const UserColumns: Column<User>[] = [
    {
        key: "user",
        header: "User",
        render: (user) => (
            <div className="flex items-center gap-2">
                <ContributorAvatar
                    name={user.name}
                    profileImageUrl={user.profileImageUrl}
                    size={40}
                    className="w-10 h-10"
                    textClassName="text-sm"
                />
                <div>
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-900">@{user.username}</p>
                </div>
            </div>
        ),
    },

    {
        key: "email",
        header: "Email Address",
        render: (user) => (<span className="font-medium">{user.email}</span>),

    },

    {
        key: "role",
        header: "Role",
        className: "text-nowrap",
        render: (user) => user.role
    },

    {
        key: "dateJoined",
        header: "Date Joined",
        className: "text-center",
        render: (user) => (
            <div className="text-center">
                {formatDate(user.createdAt)}
            </div>
        )
    },

    {
        key: "offerPosted",
        className: "text-center",
        header: "Offers Posted",
        render: (user) => (<span className="block text-center font-medium">{user.offerPosted ?? 0}</span>),
    },

    {
        key: "status",
        className: "text-center",
        header: "Status",
        render: (user) => (
            <div className="flex justify-center">
                <StatusBadge status={user.status} />
            </div>
        ),
    },

];