'use client';
import Image from 'next/image';
import Link from 'next/link';
import Dropdown from './desktop/Dropdown';
import Hamburger from './mobile/Hamburger';

export default function Header() {

    return (
        <header className="sticky top-0 left-0 z-[99] shadow-lg shadow-black/5 relative">
            <div className="hidden md:flex justify-between items-center bg-primary w-full h-[72px] px-8">
                <div className="text-white text-xl font-medium tracking-wide">Admin Panel</div>
                <Dropdown />
            </div>
            <div className="md:hidden flex justify-between items-center bg-orange-500 h-[60px] px-3">
                <Hamburger />
                <Link href="/">
                    <Image
                        src="/LogoWhite.png"
                        alt="Logo"
                        width={180}
                        height={60}
                        priority
                        className="w-[120px] sm:w-[160px] h-auto"
                    />
                </Link>
            </div>
            <div className="md:hidden flex justify-end items-center bg-white h-[60px] px-3">
                <Dropdown />
            </div>
        </header>
    )

}