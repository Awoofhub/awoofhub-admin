"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiList,
  FiBox,
  FiUsers,
  FiFlag,
  FiHeadphones,
  FiGrid,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";
import { BsMegaphone } from "react-icons/bs";

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Dashboard", icon: FiHome },
    { href: "/offer-queue", label: "Offer Queue", icon: FiList, badge: 5 },
    { href: "/all-offers", label: "All Offers", icon: FiBox },
    { href: "/users", label: "Users", icon: FiUsers },
    { href: "/reports", label: "Reports", icon: FiFlag, badge: 5 },
    { href: "/helpdesk", label: "Helpdesk", icon: FiHeadphones, badge: 5 },
    { href: "/announcement", label: "Announcement", icon: BsMegaphone },
    { href: "/category", label: "Categories", icon: FiGrid },
  ];

  return (
    <div className="fixed top-0 z-[100] w-[280px] h-screen hidden lg:flex flex-col items-center justify-start border-r border-gray-200 bg-white">
      {/* Logo */}
      <Link className="py-10 w-full flex justify-center" href="/">
        <Image
          src="/Logo.png"
          alt="Logo"
          width={180}
          height={60}
          priority
          className="w-[160px] h-auto"
        />
      </Link>

      {/* Navigation */}
      <div className="w-full flex-1 px-4 overflow-y-auto flex flex-col gap-2 scrollbar-hide pb-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-transparent text-gray-500 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon
                  size={22}
                  className={isActive ? "text-white" : "text-primary"}
                />
                <span
                  className={`text-[15px] font-medium ${isActive ? "text-white" : "text-gray-600"}`}
                >
                  {link.label}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {link.badge && (
                  <span className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#E53935] text-white text-[11px] font-bold">
                    {link.badge}
                  </span>
                )}
                <FiChevronRight
                  size={18}
                  className={
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-600"
                  }
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer Log out */}
      <div className="w-full px-8 pb-10 mt-auto">
        <div className="w-full border-t border-gray-200 mb-6"></div>
        <button className="flex items-center justify-center gap-3 w-full transition-all text-primary hover:bg-primary/5 rounded-xl py-3">
          <FiLogOut size={22} />
          <span className="text-[16px] font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
}
