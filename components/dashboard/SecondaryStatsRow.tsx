'use client';

import SummaryPillCard from '@/components/dashboard/SummaryPillCard';
import { useDashboard } from '@/features/dashboard/useDashboard';
import {
  Headphones, Ban, Hourglass, XCircle, Pause, Flag
} from 'lucide-react';
import { useOfferStatusCounts } from '@/features/offer/useOfferStatusCounts';

export default function SecondaryStatsRow() {
  const { data: dashboard } = useDashboard();
  const offerCounts = useOfferStatusCounts();

  return (
    <div className="my-8">
      <div className="grid grid-cols-2 gap-2">
        <SummaryPillCard label="Suspended Offers" value={ offerCounts.suspended} icon={Pause} iconBg="bg-primary" />
        <SummaryPillCard label="Pending reviews" value={ offerCounts.pending} icon={Hourglass} iconBg="bg-primary" />
        <SummaryPillCard label="Rejected Offers" value={offerCounts.rejected} icon={XCircle} iconBg="bg-primary" />
        <SummaryPillCard label="Banned Account" value={'—'} icon={Ban} iconBg="bg-primary" />
        <SummaryPillCard label="Open Report" value={dashboard?.reports.pendingReports ?? '—'} icon={Flag} iconBg="bg-primary" />
        <SummaryPillCard label="Support Tickets" value={'—'} icon={Headphones} iconBg="bg-primary" />
      </div>
    </div>
  );
}