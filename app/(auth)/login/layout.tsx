import Image from "next/image";
import Link from 'next/link';
import { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen bg-primary w-full overflow-hidden flex flex-col">
            <Image
                src="/Shape.png"
                alt="Background Shape"
                fill
                priority
                className="object-fill object-center z-0"
            />

            <div className="relative z-10 flex flex-col flex-1 p-6 pt-10 md:pt-6">
                <div className="mx-auto mb-6">
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

                <div className="flex-1 flex items-start justify-center">
                    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl px-1 sm:px-10 py-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}