'use client';

import { useEffect, useState } from 'react';

const FRESH_THRESHOLD_DAYS = 3;

function formatTimeLeft(endDate: string) {
    const diffMs = new Date(endDate).getTime() - Date.now();
    if (diffMs <= 0) return 'Expired';

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));

    if (days >= FRESH_THRESHOLD_DAYS) {
        return `${days} day${days > 1 ? 's' : ''}`;
    }

    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    const hh = hours.toString().padStart(2, '0');
    const mm = minutes.toString().padStart(2, '0');
    const ss = seconds.toString().padStart(2, '0');

    if (days >= 1) {
        return `${days}d:${hh}h:${mm}m:${ss}s`;
    }
    return `${hh}:${mm}:${ss}`;
}

export default function ExpiresInCell({ endDate }: { endDate: string }) {
    const [label, setLabel] = useState(() => formatTimeLeft(endDate));

    useEffect(() => {
        const diffMs = new Date(endDate).getTime() - Date.now();
        const daysLeft = diffMs / (1000 * 60 * 60 * 24);
        const shouldTick = diffMs > 0 && daysLeft < FRESH_THRESHOLD_DAYS;

        if (!shouldTick) return;

        const interval = setInterval(() => {
            setLabel(formatTimeLeft(endDate));
        }, 1000);

        return () => clearInterval(interval);
    }, [endDate]);

    return <span className="text-[#E70606] font-semibold">{label}</span>;
}