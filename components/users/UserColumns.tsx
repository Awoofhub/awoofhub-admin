import { User } from "@/types/user";
import { formatDate } from "@/utils/formatDate";
import { EllipsisVertical } from "lucide-react";
import { useRef, useState } from "react";
import UserModal from "../modals/user/UserModal";
import { Column } from "../table/BaseTable";
import ContributorAvatar from "../offer/ContributorAvatar";

function UserActions({ user }: { user: User }) {
    const [openModal, setOpenModal] = useState(false);
    const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (openModal) {
            setOpenModal(false);
            return;
        }
        setAnchorRect(buttonRef.current?.getBoundingClientRect() ?? null);
        setOpenModal(true);
    };

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                className="flex justify-center cursor-pointer p-2"
                onClick={handleToggle}
            >
                <EllipsisVertical size={20} />
            </button>

            <UserModal
                userId={user.id}
                status={user.status}
                isOpen={openModal}
                anchorRect={anchorRect}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
}
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
        className: "text-nowrap",
        render: (user) => formatDate(user.createdAt),
    },

    {
        key: "offerPosted",
        header: "Offer Posted",
        render: (user) => (<span className="font-medium">{user.offerPosted ?? 0}</span>),
    },

    {
        key: "status",
        header: "Status",
        render: (user) => <StatusBadge status={user.status} />,
    },

    {
        key: "actions",
        header: "Actions",
        className: "flex justify-center text-center",
        render: (user) => <UserActions user={user} />,

    },
];