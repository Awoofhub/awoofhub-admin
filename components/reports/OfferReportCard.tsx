'use client';

import { OfferReport } from '@/types/report';
import { ExternalLink, Flag } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import DismissReportModal from '../modals/report/DismissReportModal';


interface Props {
    data: OfferReport;
}


export default function OfferReportsCard({ data }: Props) {
    const { offer, reports } = data

    const [openDismissModal, setOpenDismissModal] = useState(false);

    const [openRejectModal, setOpenRejectModal] = useState(false);

    const reportIds = reports.map((report) => report.id);

    return (
<>
        < div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6" >
            < div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100" >
                <div className="flex items-start gap-4">
                    <Image
                        src={offer.imageUrl}
                        alt=""
                        width={200}
                        height={200}
                        unoptimized
                        className="w-16 h-16 rounded-xl object-cover border border-gray-100"
                    />

                    <div>
                        <h2 className="font-bold text-gray-900 text-base md:text-lg">
                            {offer.title}
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Posted by @<span className="text-gray-700 font-medium">{offer.contributor.username}</span>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            <span className="font-semibold text-gray-900">{`${reports.length} user(s)`}</span>  reported this offer:
                        </p>
                    </div>
                </div>

                <Link href={`/offers/${offer.id}`} className="flex items-center gap-1.5 text-orange-600 hover:text-orange-700 text-sm font-bold self-start">
                    <span>View deal</span>
                    <ExternalLink size={16} />
                </Link>
            </div >

            < div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6" >

                < div className="lg:col-span-2 flex flex-col justify-between" >
                    <div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-4">Report Notes</h3>

                        <div className="space-y-4 pr-2">
                            {reports.map((report) => (
                                <div key={report.id} className="border-b border-gray-100 pb-4 last:border-0">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-gray-700 font-medium">
                                            @{report.reporter.username}{' '}
                                            <span className="text-orange-500 italic font-normal">
                                                '{report.type}'
                                            </span>
                                        </span>
                                        <span className="text-gray-400">{report.createdAt}</span>
                                    </div>
                                    <div className="bg-gray-50/70 border border-gray-200/60 rounded-lg p-3 text-xs text-gray-700 leading-relaxed">
                                        {report.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div >

                < div className="p-5 flex flex-col gap-5" >
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900 text-sm">Offer Details</h4>
                            <Flag size={16} className="text-red-500 fill-red-500" />
                        </div>

                        <div>
                            <span className="text-xs text-gray-400 block mb-0.5">Link Address</span>
                            <a
                                href={offer.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-orange-600 hover:underline flex items-center gap-1 font-medium truncate"
                            >
                                <span>🔗</span>
                                {offer.externalLink}
                            </a>
                        </div>

                        <div>
                            <span className="text-xs text-gray-400 block mb-0.5">Date Created</span>
                            <span className="text-xs text-gray-700 font-medium">{offer.createdAt}</span>
                        </div>

                        <div>
                            <span className="text-xs text-gray-400 block mb-0.5">Brand Name</span>
                            <span className="text-xs text-gray-700 font-medium">{offer.brandName}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2.5 pt-6 mt-6 border-t border-gray-200/60">
                        <span className="text-xs font-semibold text-gray-900 block mb-2">Take Action</span>
                        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold py-2.5 rounded-md transition-all shadow-sm">
                            Suspend this Deal
                        </button>
                        <button onClick={()=>setOpenDismissModal(true)} className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-xs font-semibold py-2.5 rounded-md transition-all">
                            Dismiss
                        </button>
                    </div>

                </div >

            </div >

        </div >

        <DismissReportModal ids={reportIds} isOpen={openDismissModal} onClose={() => setOpenDismissModal(false)} />

        </>

    );
}