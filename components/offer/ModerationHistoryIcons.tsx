import { CircleCheckBig, Pause, XCircle, AlertTriangle, Trash2 } from 'lucide-react';
import { Moderation } from '@/types/moderation';

export function moderationActionLabel(actionType: Moderation['actionType']): string {
    switch (actionType) {
        case 'activate': return 'Approved';
        case 'suspend': return 'Suspended';
        case 'block': return 'Rejected';
        case 'delete': return 'Deleted';
        case 'warning': return 'Warned';
        default: return actionType;
    }
}

export function ModerationActionIcon({ actionType }: { actionType: Moderation['actionType'] }) {
    const iconClass = "shrink-0";
    switch (actionType) {
        case 'activate':
            return <div className=" bg-[#006400]/10 p-2 lg:p-3 rounded-full"><CircleCheckBig size={18} className={`${iconClass}  text-[#006400]`} /></div>;
        case 'suspend':
            return <div className="bg-[#FFC00033] p-2 lg:p-3  rounded-full"><Pause size={18} className={`${iconClass}  text-[#FE4F04]`} /></div>;
        case 'block':
            return <div className="bg-[#E7060626] p-2 lg:p-3  rounded-full"><XCircle size={18} className={`${iconClass} text-[#E70606]`} /></div>;
        case 'delete':
            return <div className="bg-[#E7060626] p-2 lg:p-3 rounded-full"><Trash2 size={18} className={`${iconClass} text-[#E70606]`} /></div>;
        case 'warning':
            return <div className="bg-yellow-600/10 p-2 lg:p-3 rounded-full"><AlertTriangle size={18} className={`${iconClass} text-yellow-600 `} /></div>;
        default:
            return <div className="bg-[#006400]/10 p-2 lg:p-3 rounded-full"><CircleCheckBig size={18} className={iconClass} /></div>;
    }
}