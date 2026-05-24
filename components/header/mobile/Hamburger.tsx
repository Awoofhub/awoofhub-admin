'use client'
import { useUser } from '@/features/user/useUser';
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import MobileSidebar from './MobileSidebar';

export default function Hamburger() {
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const { data: currentUser } = useUser();

    if (!currentUser) return null;

    return (
        <div className="flex lg:hidden items-center">
            <button
                className="relative flex flex-col justify-between cursor-pointer group"
                onClick={() => setIsOpenSideBar(!isOpenSideBar)}
                aria-label="Toggle Menu"
            >
                <GiHamburgerMenu size={30} color="white" />
            </button>

            {isOpenSideBar && (
                <div 
                    className="fixed inset-0 bg-black/20 z-[90]" 
                    onClick={() => setIsOpenSideBar(false)}
                />
            )}

            <MobileSidebar 
                isOpen={isOpenSideBar} 
                onClose={() => setIsOpenSideBar(false)} 
            />
        </div>
    );
};