import { Report } from '@/types/report';
import { formatDateTime } from '@/utils/formatDateTime';
import { Check, ShieldAlert, X, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
    report: Report;
    onModerateClick: (id: string, status: 'resolved' | 'dismissed') => void;
}

function ReportStatusBadge({ status }: { status: string }) {
    const safeStatus = status?.toLowerCase() || 'pending';
    const config: Record<string, string> = {
        resolved: "bg-green-50 text-green-700 border-green-200",
        pending: "bg-orange-50 text-orange-700 border-orange-200",
        dismissed: "bg-gray-100 text-gray-700 border-gray-300",
    };
    const currentClass = config[safeStatus] || "bg-gray-50 text-gray-600 border-gray-200";

    return (
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold w-fit capitalize ${currentClass}`}>
            {safeStatus}
        </div>
    );
}

export default function ReportRow({ report, onModerateClick }: Props) {
    const router = useRouter();

    const handleRowClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('.action-cell')) return;
        router.push(`/reports/${report.id}`);
    };

    return (
        <tr onClick={handleRowClick} className="cursor-pointer hover:bg-gray-50 transition-colors border-y border-gray-200 text-xs sm:text-sm">
            <td className="px-3 py-4 font-medium text-gray-800 capitalize">
                <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    {report.type || 'General'}
                </div>
            </td>
            <td className="px-3 py-4 text-gray-600 capitalize">{report.targetType}</td>
            <td className="px-3 py-4 text-gray-600 max-w-50 truncate">{report.description}</td>
            <td className="px-3 py-4 text-gray-500">{formatDateTime(report.createdAt)}</td>
            <td className="px-3 py-4 action-cell" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                    <ReportStatusBadge status={report.status} />
                    {report.status?.toLowerCase() === 'pending' && (
                        <div className="flex gap-1">
                            <button onClick={() => onModerateClick(report.id, 'resolved')} className="p-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded transition-colors" title="Resolve"><Check className="w-4 h-4" /></button>
                            <button onClick={() => onModerateClick(report.id, 'dismissed')} className="p-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors" title="Dismiss"><X className="w-4 h-4" /></button>
                        </div>
                    )}
                </div>
            </td>
            <td className="px-3 py-4 text-center action-cell">
                <button onClick={() => router.push(`/reports/${report.id}`)} className="p-2 text-gray-500 hover:text-primary transition-colors"><Eye className="w-4 h-4" /></button>
            </td>
        </tr>
    );
}