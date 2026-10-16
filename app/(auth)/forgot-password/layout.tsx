import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function ForgetPasswordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#FAFAFA] w-full overflow-hidden flex flex-col">
      <Image
        src="/Shape.png"
        alt="Background Shape"
        fill
        priority
        className="object-fill object-center z-0"
      />
      <div className="absolute inset-0 z-[1] bg-[#FAFAFA]/90" />

      <div className="relative z-10 flex flex-col flex-1 p-6 pt-10 md:pt-6">
        <div className=" mb-6 w-fit mx-auto md:mx-0  ">
          <Link className="" href="/">
            <Image
              src="/Logo.png"
              alt="AwoofHub"
              width={140}
              height={40}
              priority
              className="w-30 h-auto md:w-40"
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[640px] min-h-[420px] md:min-h-[480px] bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] px-6 sm:px-12 py-14 flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
