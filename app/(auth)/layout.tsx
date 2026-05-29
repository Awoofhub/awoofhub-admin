import Image from "next/image";
import Link from 'next/link';
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#FF5700] flex flex-col p-6">


            <div className="mb-6">
                <Link href="/">
                    <Image
                        src="/LogoWhite.png"
                        alt="AwoofHub"
                        width={140}
                        height={40}
                        priority
                    />
                </Link>
            </div>

            {/* Centered form card */}
            <div className="flex-1 flex items-start justify-center">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl px-1 sm:px-10 py-8">
                    {children}
                </div>
            </div>

        </div>
    );
}
