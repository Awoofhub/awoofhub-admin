"use client";

import { useOpenSupportCount } from "@/features/help-and-support/useOpenSupportCount";
import { usePendingOffersCount } from "@/features/offers/usePendingOffersCount";
import { usePendingReportsCount } from "@/features/reports/usePendingReportsCount";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCategoryAlt } from "react-icons/bi";
import { FaListUl } from "react-icons/fa6";
import { FiBox, FiFlag, FiLogOut, FiUsers } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { GrAnnounce } from "react-icons/gr";
import { MdArrowForwardIos } from "react-icons/md";
import { TbHeadset } from "react-icons/tb";


export default function Sidebar() {
  const pathname = usePathname();

  const { data: pendingOffersCount } = usePendingOffersCount()
  const { data: pendingReportsCount } = usePendingReportsCount()
  const { data: openSupportCount } = useOpenSupportCount()


  const navLinks = [
    { href: "/", label: "Dashboard", icon: GoHome },
    { href: "/queue", label: "Offer Queue", icon: FaListUl },
    { href: "/offers", label: "Offers", icon: FiBox },
    { href: "/users", label: "Users", icon: FiUsers },
    { href: "/reports", label: "Reports", icon: FiFlag, },
    { href: "/helpdesk", label: "Helpdesk", icon: TbHeadset },
    { href: "/announcements", label: "Announcement", icon: GrAnnounce },
    { href: "/categories", label: "Categories", icon: BiCategoryAlt },
  ];

  return (
    <div className="fixed top-0 z-[100] w-50 h-screen hidden md:flex flex-col items-center justify-start border border-gray-300 bg-white">

      {/* Logo */}
      <Link className="mt-4 mb-9" href="/">
        <Image
          src="/Logo.png"
          alt="Logo"
          width={180}
          height={60}
          priority
          className="w-[120px] sm:w-[130px] h-auto"
        />
      </Link>

      <div className="w-full text-black flex flex-col px-2 gap-2">
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
              <span className="text-base font-baloo w-full">{link.label}</span>

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
  );
}