import { User } from "@/types/user";
import { formatDateTime } from "@/utils/formatDateTime";
import { capitalizeFirstLetter } from "@/utils/truncate";
import { Check, RotateCcw, XCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import UserModal from "../user/UserModal";
import { Column } from "../table/BaseTable";

function UserActions({ user }: { user: User }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <button
                type="button"
                className="flex justify-center cursor-pointer p-2"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenModal(true);
                }}
            >
                <BsThreeDots size={20} />
            </button>

            <UserModal
                userId={user.id}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
};


export const UserColumns: Column<User>[] = [
    {
        key: "user",
        header: "User",
        render: (user) => (
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    {user.profileImageUrl ? (
                        <Image
                            width={500}
                            height={500}
                            src={user.profileImageUrl}
                            alt=""
                            unoptimized
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="bg-[#f0eded] text-black flex items-center justify-center w-full h-full">
                            {capitalizeFirstLetter(user.name)}
                        </div>
                    )}
                </div>

                <span className="font-medium text-xs text-gray-700 line-clamp-1">
                    {user.name}
                </span>
            </div>
        ),
    },

    {
        key: "email",
        header: "Email Address",
        render: (user) => user.email,
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
        render: (user) => formatDateTime(user.createdAt),
    },

    {
        key: "offerPosted",
        header: "Offer Posted",
        render: (user) => user.offerPosted ?? 0,
    },

    {
        key: "status",
        header: "Status",
        render: (user) => {
            const status = user.status;

            const config = {
                active: "bg-green-50 text-green-600 border-green-100",
                suspended: "bg-orange-50 text-orange-600 border-orange-100",
                blocked: "bg-red-50 text-red-600 border-red-100",
                deleted: "bg-gray-50 text-gray-600 border-red-100",
            };

            return (
                <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold w-fit ${config[status]}`}
                >
                    {status === "active" && <Check className="w-3 h-3" />}
                    {status === "suspended" && <RotateCcw className="w-3 h-3" />}
                    {status === "blocked" && <XCircle className="w-3 h-3" />}
                    {status === "deleted" && <XCircle className="w-3 h-3" />}
                </div>
            );
        },
    },

    {
        key: "actions",
        header: "Actions",
        className: "text-center",
        render: (user) => <UserActions user={user} />,

    },
];