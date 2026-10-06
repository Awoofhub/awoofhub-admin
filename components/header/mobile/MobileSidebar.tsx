"use client";

import { useOpenSupportCount } from "@/features/help-and-support/useOpenSupportCount";
import { usePendingOffersCount } from "@/features/offers/usePendingOffersCount";
import { usePendingReportsCount } from "@/features/reports/usePendingReportsCount";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCategoryAlt } from "react-icons/bi";
import { FaListUl } from "react-icons/fa6";
import { FiBox, FiFlag, FiLogOut, FiSidebar, FiUsers } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { MdArrowForwardIos } from "react-icons/md";
import { TbHeadset } from "react-icons/tb";

interface Props {
    isOpen: boolean;
    onClose(): void;
}

export default function MobileSidebar({ isOpen, onClose }: Props) {

    const { data: pendingOffersCount } = usePendingOffersCount()
    const { data: pendingReportsCount } = usePendingReportsCount()
    const { data: openSupportCount } = useOpenSupportCount()


    const pathname = usePathname();
    const navLinks = [
        { href: "/", label: "Dashboard", icon: GoHome },
        { href: "/offers/queue", label: "Offer Queue", icon: FaListUl },
        { href: "/offers", label: "Offers", icon: FiBox },
        { href: "/users", label: "Users", icon: FiUsers },
        { href: "/reports", label: "Reports", icon: FiFlag, },
        { href: "/helpdesk", label: "Helpdesk", icon: TbHeadset },
        { href: "/categories", label: "Categories", icon: BiCategoryAlt },
    ];

    return (
        <>
            <div className={`fixed top-0 left-0 h-full w-[70%] xxs:w-[50%] md:w-[30%] bg-white z-[100] flex flex-col items-center justify-start transform transition-transform duration-300 ease-in ${isOpen ? "translate-x-0 visible" : "-translate-x-full invisible"}`}>

                <div className="w-full px-6 mt-4 mb-9 flex justify-between items-center">
                    <Link href="/">
                        <Image
                            src="/Logo.png"
                            alt="Logo"
                            width={180}
                            height={60}
                            priority
                            className="w-[120px] sm:w-[130px] h-auto"
                        />
                    </Link>
                    < div onClick={onClose}>
                        <FiSidebar size={24} className="text-primary cursor-pointer" />
                    </div>
                </div>


                <div className="w-full text-black flex flex-col px-4 gap-2">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        const count =
                            link.label === "Offer Queue"
                                ? pendingOffersCount
                                : link.label === "Reports"
                                    ? pendingReportsCount
                                    : link.label === "Helpdesk"
                                        ? openSupportCount
                                        : 0;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 flex items-center gap-2 transition-all rounded-md ${isActive ? "bg-primary text-white font-medium" : "hover:bg-orange-100 font-light"
                                    }`}
                            >
                                <Icon size={18} className={`${isActive ? "text-white stroke-1" : "text-primary"}`} />
                                <span className="text-base font-baloo">{link.label}</span>

                                <div className="ml-auto flex items-center gap-[1.5px]">
                                    {!!count && count > 0 && (
                                        <div className="min-w-6 h-6 px-[2px] bg-red-500 text-white text-[12px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                                            {count > 99 ? "99+" : count}
                                        </div>
                                    )}

                                    <MdArrowForwardIos size={12} />
                                </div>
                            </Link>
                        );
                    })}
                </div>



                <div className="w-full px-2 pb-16 mt-auto">
                    <div className="w-full border-t border-gray-300 "></div>
                    <button className="flex items-center justify-center gap-2 w-full transition-all text-primary hover:bg-primary/8 rounded-xl py-3">
                        <FiLogOut size={18} />
                        <span className="text-[16px] font-baloo font-medium">Log out</span>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[99]"
                    role="button"
                    tabIndex={-1}
                    onClick={onClose}
                    onKeyDown={onClose}
                />
            )}

        </>
    )
};
