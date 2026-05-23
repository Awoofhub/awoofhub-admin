'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ReportService from '@/services/report-service';
import { formatDateTime } from '@/utils/formatDateTime';
import { ShieldAlert, Check, X } from 'lucide-react';
import { useModerateReport } from '@/features/reports/useModerateReport';

interface Reporter {
    id: string;
    name: string;
}

export default function ReportDetailPage() {
    const params = useParams();
    const router = useRouter();
    const reportId = params.id as string;

    const { mutate: moderateReport, isPending } = useModerateReport();

    const { data: report, isLoading, error } = useQuery({
        queryKey: ['report', reportId],
        queryFn: async () => {
            const response = await ReportService.reportById(reportId);
            return response.data;
        },
    });

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading report details...</div>;
    if (error || !report) return <div className="p-8 text-center text-red-500">Failed to load report.</div>;

    const handleAction = (status: 'resolved' | 'dismissed') => {
        moderateReport({ id: reportId, status });
    };

    return (
        <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
            <div className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 mx-auto w-full max-w-250 flex flex-col h-full">

                <div className="mb-6 shrink-0 flex justify-between items-center">
                    <button onClick={() => router.back()} className="text-primary hover:underline font-semibold text-sm">← Back to Reports</button>
                    <div className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-700">
                        Status: {report.status || 'Pending'}
                    </div>
                </div>

                <div className="flex-1 overflow-auto pr-2 space-y-6">
                    {/* Header Info */}
                    <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex items-start gap-4">
                        <ShieldAlert className="w-10 h-10 text-red-500 shrink-0" />
                        <div>

                            <h1 className="text-2xl font-bold text-gray-900 capitalize mb-1">
                                {(report.type || 'General').replace('_', ' ')} Violation
                            </h1>
                            <p className="text-gray-600 text-sm">Reported on {formatDateTime(report.createdAt)}</p>
                        </div>
                    </div>

                    {/* Report Description */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Complainant&apos;s Description</h2>
                        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-gray-200">{report.description}</p>
                    </div>

                    {/* Target Information */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Report Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <p className="text-gray-500 font-bold uppercase tracking-wide text-xs mb-1">Target Type</p>
                                <p className="text-gray-900 font-semibold capitalize">{report.targetType}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 break-all">
                                <p className="text-gray-500 font-bold uppercase tracking-wide text-xs mb-1">Target ID</p>
                                <p className="text-gray-900 font-mono text-xs">{report.targetId}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 break-all">
                                <p className="text-gray-500 font-bold uppercase tracking-wide text-xs mb-1">Reporter ID</p>
                                <p className="text-gray-900 font-mono text-xs">
                                    {typeof report.reporter === 'string' ? report.reporter : (report.reporter as Reporter)?.id}
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 break-all">
                                <p className="text-gray-500 font-bold uppercase tracking-wide text-xs mb-1">Reporter Name</p>
                                <p className="text-gray-900 font-mono text-xs">
                                    {typeof report.reporter === 'string' ? '-' : (report.reporter as Reporter)?.name}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Moderation Actions */}
                    {(report.status === 'pending' || !report.status) && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-amber-900 mb-4">Admin Actions</h2>
                            <div className="flex gap-4">
                                <button onClick={() => handleAction('resolved')} disabled={isPending} className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
                                    <Check className="w-5 h-5" /> Mark as Resolved
                                </button>
                                <button onClick={() => handleAction('dismissed')} disabled={isPending} className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors">
                                    <X className="w-5 h-5" /> Dismiss Report
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}