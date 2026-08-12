// components/ui/StatusBadge.tsx
interface StatusBadgeProps {
  label: string;
  variant: "green" | "gray" | "red" | "orange" | "rose" | "emerald";
  size?: "sm" | "md";
}

const variantStyles: Record<StatusBadgeProps["variant"], { bg: string; text: string }> = {
  green: { bg: "bg-green-100", text: "text-green-700" },
  gray: { bg: "bg-gray-100", text: "text-gray-600" },
  red: { bg: "bg-red-100", text: "text-red-700" },
  orange: { bg: "bg-orange-100", text: "text-orange-700" },
  rose: { bg: "bg-rose-100", text: "text-rose-700" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-700" },
};

export default function StatusBadge({ label, variant, size = "sm" }: StatusBadgeProps) {
  const styles = variantStyles[variant];
  const sizeClass = size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-block rounded-full font-bold capitalize whitespace-nowrap shrink-0 ${styles.bg} ${styles.text} ${sizeClass}`}
    >
      {label}
    </span>
  );
}