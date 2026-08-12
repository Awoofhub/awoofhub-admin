import { LucideIcon } from "lucide-react";

type IconColor = "black" | "orange" | "pink" | "green" | "purple";

const iconColorMap: Record<IconColor, string> = {
  black: "text-gray-900",
  orange: "text-orange-500",
  pink: "text-pink-500",
  green: "text-green-500",
  purple: "text-purple-500",
};

interface HeaderIconTitleCountProps {
  label: string;
  count?: number;
  icon?: LucideIcon;
  iconColor?: IconColor;
}

export default function HeaderIconTitleCount({
  label,
  count,
  icon: Icon,
  iconColor = "orange",
}: HeaderIconTitleCountProps) {
  return (
    <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
      {Icon && <Icon size={18} strokeWidth={2.5} className={iconColorMap[iconColor]} />}

      <span>
        {label} {typeof count === "number" && `(${count})`}
      </span>
    </h3>
  );
}