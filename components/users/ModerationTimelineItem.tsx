import { Moderation } from '@/types/moderation';
import { CheckCircle, XCircle, PauseCircle, Trash2, AlertTriangle } from 'lucide-react';
import {formatHistoryDateTime} from '@/utils/formatHistoryDateTime';

interface ModerationTimelineItemProps {
    moderation: Moderation;
    isLast: boolean;
}

const ACTION_CONFIG: Record<
    Moderation['actionType'],
    { label: string; icon: React.ReactNode; iconBg: string; iconColor: string }
> = {
    activate: {
        label: 'Approved',
        icon: <CheckCircle size={18} />,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
    },
    suspend: {
        label: 'Suspended',
        icon: <PauseCircle size={18} />,
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
    },
    block: {
        label: 'Banned',
        icon: <XCircle size={18} />,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
    },
    delete: {
        label: 'Deleted',
        icon: <Trash2 size={18} />,
        iconBg: 'bg-gray-100',
        iconColor: 'text-gray-500',
    },
    warning: {
        label: 'Warning',
        icon: <AlertTriangle size={18} />,
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-500',
    },
};



export default function ModerationTimelineItem({ moderation, isLast }: ModerationTimelineItemProps) {
    const config = ACTION_CONFIG[moderation.actionType];

    return (
        <div className="flex gap-4">
           
            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${config.iconBg} ${config.iconColor}`}>
                    {config.icon}
                </div>
                {!isLast && (
                    <div className="w-px flex-1 bg-orange-300 mt-1 mb-0 min-h-[24px]" />
                )}
            </div>

            
            <div className={`flex-1 min-w-0 pb-6 ${isLast ? '' : ''}`}>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="font-bold text-gray-900 text-sm sm:text-base">{config.label}</span>
                    {moderation.admin && (
                        <span className="text-gray-500 text-sm">
                            by <span className="font-medium text-gray-700">{moderation.admin.name}</span>
                        </span>
                    )}
                    <span className="text-gray-400 text-xs">·</span>
                    <span className="text-gray-400 text-xs whitespace-nowrap">{formatHistoryDateTime(moderation.createdAt)}</span>
                </div>
                {moderation.reason && (
                    <p className="text-gray-600 text-sm mt-1">{moderation.reason}</p>
                )}
            </div>
        </div>
    );
}
