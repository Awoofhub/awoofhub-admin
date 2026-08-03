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

interface Props {
  isOpen: boolean;
  onClose(): void;
}

export default function MobileSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Dashboard", icon: FiHome },
    { href: "/offer-queue", label: "Offer Queue", icon: FiList },
    { href: "/offers", label: "All Offers", icon: FiBox },
    { href: "/users", label: "Users", icon: FiUsers },
    { href: "/reports", label: "Reports", icon: FiFlag, badge: 5 },
    { href: "/helpdesk", label: "Helpdesk", icon: FiHeadphones, badge: 5 },
    { href: "/announcement", label: "Announcement", icon: BsMegaphone },
    { href: "/category", label: "Categories", icon: FiGrid },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-[100] h-full w-[80%] max-w-[320px] bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ease-in ${
          isOpen ? "translate-x-0 visible" : "-translate-x-full invisible"
        }`}
      >
        <div className="px-6 py-8 w-full flex items-center justify-between">
          <Link href="/" onClick={onClose}>
            <Image
              src="/Logo.png"
              alt="Logo"
              width={180}
              height={60}
              priority
              className="w-[140px] h-auto"
            />
          </Link>
          <button onClick={onClose} className="p-1 text-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2.5" ry="2.5"/>
              <path d="M16 3v18"/>
            </svg>
          </button>
        </div>

        <div className="w-full flex-1 px-4 py-2 overflow-y-auto flex flex-col gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`group flex items-center justify-between px-5 py-3.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-transparent text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon
                    size={22}
                    className={isActive ? "text-white" : "text-primary"}
                  />
                  <span
                    className={`text-[15px] font-medium ${
                      isActive ? "text-white" : "text-gray-600"
                    }`}
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

        <div className="w-full mt-auto flex flex-col pb-10 pt-4">
          <div className="mx-8 border-t border-gray-100 mb-6"></div>
          <button className="flex items-center gap-4 px-8 text-primary hover:opacity-80 transition-opacity">
            <FiLogOut size={22} />
            <span className="text-[16px] font-medium">Log out</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99]"
          role="button"
          tabIndex={-1}
          onClick={onClose}
          onKeyDown={(event) => {
            if (event.key === "Escape") onClose();
          }}
        />
      )}
    </>
  );
}
