'use client';
import SummaryPillCard from '@/components/dashboard/SummaryPillCard';
import { useDashboard } from '@/features/dashboard/useDashboard';
import {
  Ban,
  Flag,
  Headphones,
  Hourglass,
  Pause,
  XCircle
} from 'lucide-react';

export default function SecondaryStatsRow() {
  const { data: dashboard } = useDashboard();
  
  return (
    <div className="my-8">
      <div className="grid grid-cols-2 gap-2">
        <SummaryPillCard label="Suspended Offers" value={dashboard?.offers?.suspendedOffers ?? '0'} icon={Pause} iconBg="bg-primary" />
        <SummaryPillCard label="Expired Offers" value={ dashboard?.offers?.expiredOffers ?? "0"} icon={Hourglass} iconBg="bg-primary" />
        <SummaryPillCard label="Rejected Offers" value={dashboard?.offers?.rejectedOffers ?? "0"} icon={XCircle} iconBg="bg-primary" />
        <SummaryPillCard label="Banned Account" value={dashboard?.users?.bannedUsers ?? '0'} icon={Ban} iconBg="bg-primary" />
        <SummaryPillCard label="Open Report" value={dashboard?.reports.pendingReports ?? '0'} icon={Flag} iconBg="bg-primary" />
        <SummaryPillCard label="Support Tickets" value={dashboard?.support?.supportTickets ?? '0'} icon={Headphones} iconBg="bg-primary" />
      </div>
    </div>
  );
}