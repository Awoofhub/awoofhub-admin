import Image from "next/image";
import Link from 'next/link';
import { ReactNode } from "react";


export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-[#ff5700] px-5 py-10 sm:px-8 sm:py-14">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/Shape.png')" }}
            />

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col items-center">
                <Link href="/">
                    <Image
                        src="/LogoWhite.png"
                        alt="AwoofHub"
                        width={190}
                        height={54}
                        priority
                    />
                </Link>

                <div className="flex w-full flex-1 items-center justify-center py-10 sm:py-14">
                    <section className="w-full md:max-w-[746px] max-w-[360px] rounded-[24px] bg-white px-6 py-12 shadow-2xl sm:px-12 sm:py-16 lg:px-[4.5rem]">
                        {children}
                    </section>
                </div>
            </div>
        </main>
    );
}
