"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
}

export default function BackButton({ label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-gray-500 hover:underline font-semibold text-sm flex text-center self-center"
    >
      <ChevronLeft/> {label}
    </button>
  );
}