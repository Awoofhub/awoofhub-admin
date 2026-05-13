"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { TbReportAnalytics } from "react-icons/tb";

export default function Sidebar() {
  const pathname = usePathname();

  const navSections = [
    {
      title: "General",
      links: [
        { href: "/", label: "Dashboard", icon: AiOutlineDashboard },
      ],
    },
    {
      title: "Offers",
      links: [
        { href: "/offers", label: "Offers", icon: SiSimpleanalytics },
        { href: "/category", label: "Categories", icon: MdOutlineCategory },
      ],
    },
    {
      title: "Users",
      links: [
        { href: "/users", label: "Users", icon: FiUsers },
      ],
    },
    {
      title: "Reports",
      links: [
        { href: "/reports", label: "Reports", icon: TbReportAnalytics },
      ],
    },
    {
      title: "Analytics",
      links: [
        { href: "/dashboard/offers", label: "Offers", icon: SiSimpleanalytics },
        { href: "/dashboard/users", label: "Users", icon: FiUsers },
        { href: "/dashboard/reports", label: "Reports", icon: TbReportAnalytics },
      ],
    },
  ];

  return (
    <div className="fixed top-0 z-[100] w-50 h-screen hidden md:flex flex-col items-center justify-start border border-gray-300 bg-primary">

      {/* Logo */}
      <Link className="py-8" href="/">
        <Image
          src="/LogoWhite.png"
          alt="Logo"
          width={180}
          height={60}
          priority
          className="w-[120px] sm:w-[160px] h-auto"
        />
      </Link>

      <hr className="h-[1px] w-full bg-white border-none my-2" />

      {/* Navigation */}
      {navSections.map((section, index) => (
        <div key={section.title} className="w-full text-white">

          <span className="px-3 text-sm font-bold">
            {section.title}
          </span>

          <div>
            {section.links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 flex items-center gap-2 transition-all ${isActive ? "bg-white/40" : "hover:bg-white/20"
                    }`}
                >
                  <Icon size={18} />
                  <span className="text-base font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Divider between sections */}
          {index !== navSections.length - 1 && (
            <hr className="h-[1px] w-full bg-white border-none my-2" />
          )}

        </div>
      ))}
    </div>
  );
}