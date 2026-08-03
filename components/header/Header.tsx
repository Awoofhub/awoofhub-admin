"use client";
import Image from "next/image";
import Link from "next/link";

import Hamburger from "./mobile/Hamburger";
import { useUser } from "@/features/user/useUser";
import { capitalizeFirstLetter } from "@/utils/truncate";

export default function Header() {
  const { data: currentUser } = useUser();
  const displayName = currentUser?.name ?? "Admin";
  const avatarUrl = currentUser?.profileImageUrl;

  return (
    <header className="sticky top-0 left-0 z-[99] shadow-lg shadow-black/5 relative">
      {/* Desktop Header */}
      <div className="hidden lg:flex justify-between items-center bg-primary w-full h-[72px] px-8">
        <div className="text-white text-xl font-medium tracking-wide">
          Admin Panel
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white text-[13px] sm:text-base font-medium">
            {displayName}
          </span>
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm">
            {avatarUrl ? (
              <Image
                width={500}
                height={500}
                src={avatarUrl}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-green-500 text-white flex items-center justify-center w-full h-full text-sm font-semibold">
                {capitalizeFirstLetter(displayName)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Header */}
      <div className="lg:hidden flex justify-between items-center bg-primary h-[60px] px-3 md:px-6 relative">
        <div className="flex items-center gap-3 md:gap-6 z-10">
          <Hamburger />
          {/* Admin Panel text on tablet only */}
          <div className="hidden md:block text-white text-xl font-medium tracking-wide">
            Admin Panel
          </div>
        </div>

        {/* Profile (Dropdown) on all screens */}
        <div className="flex items-center z-10">
          <div className="flex items-center gap-2">
            <span className="text-white text-[13px] sm:text-base font-medium">
              {displayName}
            </span>
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm">
              {avatarUrl ? (
                <Image
                  width={500}
                  height={500}
                  src={avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-green-500 text-white flex items-center justify-center w-full h-full text-sm font-semibold">
                  {capitalizeFirstLetter(displayName)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
