// StatusBadge.tsx
// Renders the colored status pill used in the All Offers table.
// Drives off `Offer["status"]` (currently typed as `string` in your Offer
// interface) — not `moderationStatus`, which is a separate, narrower field.

import { Clock, Pencil, CheckCircle2, XCircle, PauseCircle } from "lucide-react";
import type { ComponentType } from "react";

type KnownStatus =
  | "pending"
  | "revision"
  | "active"
  | "rejected"
  | "suspended"
  | "expired";

interface StatusConfig {
  label: string;
  icon: ComponentType<{ className?: string }>;
  className: string;
}

const STATUS_CONFIG: Record<KnownStatus, StatusConfig> = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-amber-50 text-amber-600",
  },
  revision: {
    label: "Revision",
    icon: Pencil,
    className: "bg-yellow-50 text-yellow-700",
  },
  active: {
    label: "Active",
    icon: CheckCircle2,
    className: "bg-green-50 text-green-600",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-50 text-red-500",
  },
  suspended: {
    label: "Suspended",
    icon: PauseCircle,
    className: "bg-orange-50 text-orange-600",
  },
  expired: {
    label: "Expired",
    icon: Clock,
    className: "bg-gray-100 text-gray-500",
  },
};

const FALLBACK_CONFIG: StatusConfig = {
  label: "Unknown",
  icon: Clock,
  className: "bg-gray-100 text-gray-500",
};

interface StatusBadgeProps {
  /** Pass Offer["status"] directly — unrecognized values fall back gracefully. */
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status as KnownStatus] ?? {
    ...FALLBACK_CONFIG,
    label: status || FALLBACK_CONFIG.label,
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}