// components/ui/Thumbnail.tsx
import Image from "next/image";

interface ThumbnailProps {
  imageUrl?: string;
  alt: string;
  size?: number;
  rounded?: "full" | "lg";
  fallback: React.ReactNode;
}

export default function Thumbnail({
  imageUrl,
  alt,
  size = 48,
  rounded = "lg",
  fallback,
}: ThumbnailProps) {
  const radiusClass = rounded === "full" ? "rounded-full" : "rounded-lg";

  return imageUrl ? (
    <Image
      src={imageUrl}
      alt={alt}
      width={size}
      height={size}
      className={`object-cover ${radiusClass}`}
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className={`bg-pink-200 flex items-center justify-center text-gray-400 font-bold ${radiusClass}`}
      style={{ width: size, height: size }}
    >
      {fallback}
    </div>
  );
}