"use client";
import { useLogout } from "@/features/auth/useLogout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: Props) {
    const router = useRouter();

    const { submit: logout } = useLogout({
        onSuccess: () => {
            onClose();
            router.push("/login");
        },
    });

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative bg-white rounded-2xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer -top-10 -right-0 z-10 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-50"
                >
                    <FiX size={16} />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-black mb-2">Hold on!</h2>
                    <p className="text-[#7E8492] text-lg max-w-[300px] mx-auto">
                        You’re about to log out. Continue?
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => logout()}
                        className="w-full py-2 bg-primary cursor-pointer text-white font-semibold text-lg rounded-md hover:bg-orange-700 transition-colors"
                    >
                        Logout
                    </button>
                    <Link
                        href="/"
                        onClick={onClose}
                        className="w-full py-2 border border-primary text-primary font-semibold text-lg rounded-md hover:bg-orange-50 transition-colors text-center"
                    >
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </div>

    );
}