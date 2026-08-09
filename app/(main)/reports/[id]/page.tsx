/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ReportService from '@/services/report-service';
import { formatDateTime } from '@/utils/formatDateTime';
import OfferDetailSkeleton from '@/components/offers/OfferDetailsSkeleton';
import { ShieldAlert, Check, X, History, ExternalLink, AlertTriangle } from 'lucide-react';
import { useModerateReport } from '@/features/reports/useModerateReport';
import { useReportContext } from '@/features/reports/useReportContext';
import Image from 'next/image';

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

    const { targetUser, targetOffer, isLoadingTarget, moderationHistory, isLoadingHistory } = useReportContext(report);

    if (isLoading) return  <section className="w-full bg-white px-4 py-8 max-w-360 mx-auto h-[90dvh] md:h-[88dvh]">
            <OfferDetailSkeleton />
        </section>;
    if (error || !report) return <div className="p-8 text-center text-red-500">Failed to load report.</div>;

    const handleAction = (status: 'resolved' | 'dismissed') => {
        moderateReport({ id: reportId, status });
    };


    const reporterData = typeof report.reporter === 'object' ? report.reporter : null;
    const reporterName = reporterData?.name || 'Unknown User';
    const reporterEmail = reporterData?.email || '';
    const reporterId = reporterData?.id || (typeof report.reporter === 'string' ? report.reporter : 'N/A');
    const reporterImg = reporterData?.profileImageUrl || null;

    return (
        <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
            <div className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 mx-auto w-full max-w-300 flex flex-col h-full">

                <div className="mb-6 shrink-0 flex justify-between items-center">
                    <button onClick={() => router.back()} className="text-primary hover:underline font-semibold text-sm">← Back to Reports</button>
                    <div className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-700">
                        Status: {report.status || 'Pending'}
                    </div>
                </div>

                <div className="flex-1 overflow-auto pr-2">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">

                        {/* LEFT COLUMN: Report & Complainant Info */}
                        <div className="lg:col-span-2 space-y-6">

                            <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex items-start gap-4">
                                <ShieldAlert className="w-10 h-10 text-red-500 shrink-0" />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 capitalize mb-1">
                                        {(report.type || 'General').replace('_', ' ')} Violation
                                    </h1>
                                    <p className="text-gray-600 text-sm">Reported on {formatDateTime(report.createdAt)}</p>
                                </div>
                            </div>

                            {/* Complainant's View */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Complainant</h2>
                                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                                        {reporterImg ? (
                                            <Image unoptimized src={reporterImg} alt="Reporter" width={40} height={40} className="rounded-full w-10 h-10 object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{reporterName.charAt(0) || '?'}</div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-gray-900">{reporterName}</p>
                                            <p className="text-xs text-gray-500">{reporterEmail || `ID: ${reporterId}`}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed italic">&quot;{report.description}&quot;</p>
                                </div>
                            </div>

                            {/* TARGET HIGHLIGHT CARD */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Reported Target Preview</h2>

                                {isLoadingTarget ? (
                                    <div className="bg-white p-6 rounded-lg border border-gray-200 text-center flex items-center justify-center gap-3 text-gray-500 text-sm shadow-sm">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                        Loading target details...
                                    </div>
                                ) : report.targetType === 'offer' && targetOffer ? (
                                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-4">
                                        <Image unoptimized src={targetOffer.imageUrl} alt={targetOffer.title} width={100} height={100} className="rounded-md object-cover w-24 h-24 bg-gray-100" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{targetOffer.title}</h3>
                                            {/* <p className="text-sm text-gray-500 mb-2">Business: {targetOffer.business?.name}</p> */}
                                            <div className="flex gap-2">
                                                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">{targetOffer.category.name}</span>
                                                <span className="text-xs px-2 py-1 bg-orange-50 text-orange-600 border border-orange-100 rounded capitalize">{targetOffer.Status || 'Pending'}</span>
                                            </div>
                                            <button onClick={() => router.push(`/offers/${targetOffer.id}`)} className="mt-3 text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
                                                View Full Offer <ExternalLink className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ) : report.targetType === 'user' && targetUser ? (
                                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-4">
                                        {targetUser.profileImageUrl ? (
                                            <Image unoptimized src={targetUser.profileImageUrl} alt={targetUser.name} width={80} height={80} className="rounded-full object-cover w-16 h-16" />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xl">{targetUser.name.charAt(0)}</div>
                                        )}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{targetUser.name}</h3>
                                            <p className="text-sm text-gray-500 mb-1">{targetUser.email}</p>
                                            <span className={`text-xs px-2 py-1 border rounded capitalize ${targetUser.status === 'banned' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                Status: {targetUser.status || 'Active'}
                                            </span>
                                            <button onClick={() => router.push(`/users/${targetUser.id}`)} className="block mt-3 text-xs text-primary font-semibold hover:underline items-center gap-1">
                                                View Full Profile <ExternalLink className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-gray-500 text-sm shadow-sm">
                                        Target Details Unavailable (ID: {report.targetId})
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* RIGHT COLUMN: History & Actions */}
                        <div className="space-y-6">

                            {/* Moderation Actions */}
                            {(report.status === 'pending' || !report.status) && (
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                                    <h2 className="text-lg font-bold text-amber-900 mb-4">Admin Actions</h2>
                                    <div className="flex flex-col gap-3">
                                        <button onClick={() => handleAction('resolved')} disabled={isPending} className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
                                            <Check className="w-5 h-5" /> Mark as Resolved
                                        </button>
                                        <button onClick={() => handleAction('dismissed')} disabled={isPending} className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors">
                                            <X className="w-5 h-5" /> Dismiss Report
                                        </button>
                                    </div>
                                    <p className="text-xs text-amber-700 mt-3 text-center">Note: Taking action here closes the report. To ban/suspend, view the target&apos;s profile directly.</p>
                                </div>
                            )}

                            {/* Moderation History Timeline */}
                            <div className="bg-gray-50 rounded-xl p-6 h-full">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <History className="w-5 h-5" /> Target History
                                </h2>

                                {isLoadingHistory ? (
                                    <div className="flex items-center gap-2 text-sm text-gray-500"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div> Fetching history...</div>
                                ) : moderationHistory && moderationHistory.length > 0 ? (
                                    <div className="space-y-4">

                                        {moderationHistory.map((mod: any, i: number) => (
                                            <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 relative overflow-hidden shadow-sm">
                                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${mod.actionType === 'block' || mod.actionType === 'ban' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                                                <div className="flex justify-between items-start mb-1 pl-2">
                                                    <span className="font-bold text-gray-900 capitalize text-sm">{mod.actionType || 'Warning'}</span>
                                                    <span className="text-xs text-gray-400">{formatDateTime(mod.createdAt)}</span>
                                                </div>
                                                <p className="text-xs text-gray-600 pl-2 line-clamp-2">Reason: {mod.reason || 'N/A'}</p>
                                                {mod.endsAt && (
                                                    <p className="text-xs text-red-500 font-semibold pl-2 mt-1 flex items-center gap-1">
                                                        <AlertTriangle className="w-3 h-3" /> Ends: {formatDateTime(mod.endsAt)}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-gray-400 bg-white border border-gray-100 rounded-lg shadow-sm">
                                        <Check className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm font-semibold">Clean record.</p>
                                        <p className="text-xs">No prior moderations found.</p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}