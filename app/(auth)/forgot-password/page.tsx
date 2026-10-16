import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <Image
          src="/mdi_forgot-password.png"
          alt="Forgot password"
          width={56}
          height={72}
          priority
        />

        <h1 className="mt-8 text-2xl sm:text-4xl font-bold text-[#0A0A0A]">
          Forgot password?
        </h1>

        <p className="mt-3 max-w-[350px] text-base sm:text-sm text-[#0C0C0C]">
          Kindly contact support to recover access to your account.
        </p>

        <Link
          href="/login"
          className="mt-14 inline-flex items-center gap-3 text-lg sm:text-sm font-semibold text-[#FE4F04] hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
          Go back to login
        </Link>
      </div>
    </>
  );
}
