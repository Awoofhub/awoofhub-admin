// components/common/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  label?: string;
}

export default function BackButton({ label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-primary hover:underline font-semibold text-sm"
    >
      ← {label}
    </button>
  );
}