"use client"

import { Calendar, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';


export default function DashboardDate() {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-slate-200 border border-slate-200 rounded-lg">
      <div className="flex items-center gap-2 text-slate-600">
        <Calendar size={16} />
        <span className="text-sm font-medium whitespace-nowrap">
          {formatDate(now)}
        </span>
      </div>
      <div className="w-px h-4 bg-slate-300" />
      <div className="flex items-center gap-2 text-slate-900">
        <Clock size={16} className="text-indigo-500" />
        <span className="text-sm font-mono font-bold tabular-nums">
          {formatTime(now)}
        </span>
      </div>
    </div>
  );
};
