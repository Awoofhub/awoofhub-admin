'use client';

import { UserReport } from '@/types/report';
import { capitalizeFirstLetter } from '@/utils/truncate';
import { ExternalLink, Flag } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import DismissReportModal from '../modals/report/DismissReportModal';
import SuspendUserReportModal from '../modals/report/SuspendUserReport';


interface Props {
    data: UserReport;
}


export default function UserReportsCard({ data }: Props) {
    const { user, reports } = data

    const [openDismissModal, setOpenDismissModal] = useState(false);
    const [openSuspendReportModal, setOpenSuspendReportModal] = useState(false);

    const reportIds = reports.map((report) => report.id);


    return (
        <>
            < div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6" >
                < div className="grid grid-cols-1 lg:grid-cols-3 gap-8" >
                    < div className="lg:col-span-2 flex flex-col gap-3" >
                        < div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100" >
                            <div className="flex items-start gap-4">
                                <div className="w-24 h-24 rounded-full overflow-hidden">
                                    {user.profileImageUrl ? (
                                        <Image
                                            width={200}
                                            height={200}
                                            unoptimized
                                            src={user.profileImageUrl}
                                            alt={user.name}
                                            className="w-full h-full object-cover border border-gray-100"
                                        />
                                    ) : (
                                        <div className="bg-[#F7C8D5] text-[#B85B80] text-3xl font-semibold flex items-center justify-center w-full h-full">
                                            {capitalizeFirstLetter(user.name)}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900 text-base md:text-lg">
                                        {user.name}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        @<span className="text-gray-700 font-medium">{user.username}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        <span className="font-semibold text-gray-900">{`${reports.length} user(s)`}</span>  reported this account:
                                    </p>
                                </div>
                            </div>

                            <Link href={`/users/${user.username}`} className="flex items-center gap-1.5 text-orange-600 hover:text-orange-700 text-sm font-medium self-start">
                                <span>View account</span>
                                <ExternalLink size={16} />
                            </Link>
                        </div >

                        <div>
                            <h3 className="font-semibold text-gray-900 text-sm mb-4">Report Notes</h3>

                            <div className="space-y-4">
                                {reports.map((report) => (
                                    <div key={report.id}>
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

                    < div className="flex flex-col gap-5" >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900 text-sm">Account Details</h4>
                                <Flag size={16} className="text-red-500 fill-red-500" />
                            </div>

                            <div>
                                <span className="text-xs text-gray-400 block mb-0.5">Date Joined</span>
                                <span className="text-xs text-gray-700 font-medium">{user.createdAt}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block mb-0.5">Email Address</span>
                                <span className="text-xs text-gray-700 font-medium">{user.email}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block mb-0.5">username</span>
                                <span className="text-xs text-gray-700 font-medium">{user.username}</span>
                            </div>

                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2.5 pt-6 border-t border-gray-200/60">
                            <span className="text-xs font-semibold text-gray-900 block mb-2">Take Action</span>
                            <button onClick={() => setOpenSuspendReportModal(true)} className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold py-2.5 rounded-md transition-all shadow-sm">
                                Suspend this Account
                            </button>
                            <button onClick={() => setOpenDismissModal(true)} className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-xs font-semibold py-2.5 rounded-md transition-all">
                                Dismiss
                            </button>
                        </div>

                    </div >

                </div >

            </div >

            <DismissReportModal ids={reportIds} isOpen={openDismissModal} onClose={() => setOpenDismissModal(false)} />
            <SuspendUserReportModal reportIds={reportIds} userId={user.id} isOpen={openSuspendReportModal} onClose={() => setOpenSuspendReportModal(false)} />

        </>

    );
}