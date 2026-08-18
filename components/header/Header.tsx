'use client';
import UserMenu from './desktop/UserMenu';
import Hamburger from './mobile/Hamburger';

export default function Header() {

    return (
        <header className="sticky top-0 left-0 z-[99] shadow-lg shadow-black/5 relative">
            <div className="hidden lg:flex justify-between items-center bg-primary w-full h-[60px] px-3 xl:px-8">
                <span className="text-white text-2xl">Admin Panel</span>
                <UserMenu />
            </div>
            <div className="lg:hidden flex justify-between items-center bg-primary h-[60px] px-3">
                <Hamburger />
                <UserMenu />
            </div>
        </header>
    )

}