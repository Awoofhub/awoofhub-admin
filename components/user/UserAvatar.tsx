// components/ui/UserAvatar.tsx — rewritten to use Thumbnail
import Thumbnail from "../common/Thumbnail";

type AvatarSize = "sm" | "md" | "lg";
const sizeMap: Record<AvatarSize, number> = { sm: 36, md: 48, lg: 96 };

interface UserAvatarProps {
  name: string;
  imageUrl?: string;
  size?: AvatarSize;
}

export default function UserAvatar({ name, imageUrl, size = "md" }: UserAvatarProps) {
  const dimension = sizeMap[size];
  return (
    <Thumbnail
      imageUrl={imageUrl}
      alt={name}
      size={dimension}
      rounded="full"
      fallback={
        <span className="text-primary uppercase" style={{ fontSize: dimension * 0.4 }}>
          {name.charAt(0)}
        </span>
      }
    />
  );
}