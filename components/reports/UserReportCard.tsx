'use client';

import { UserReport } from '@/types/report';
import { capitalizeFirstLetter } from '@/utils/truncate';
import { ChevronRight, Flag } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import DismissReportModal from '../modals/report/DismissReportModal';
import SuspendUserReportModal from '../modals/report/SuspendUserReport';
import { formatDate } from '@/utils/formatDate';


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
            < div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 xs:p-6" >
                < div className="grid grid-cols-1 lg:grid-cols-3 gap-8" >
                    < div className="lg:col-span-2 flex flex-col gap-3" >
                        < div className="flex flex-col-reverse xs:flex-row xs:items-center justify-between gap-1 xs:gap-4 pb-6 border-b border-muted/20" >
                            <div className="flex items-center gap-4">
                                <div className="w-15 h-15 xs:w-17.5 xs:h-17.5 rounded-full overflow-hidden">
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
                                    <h2 className="font-bold text-black text-base xs:text-lg">
                                        {user.name}
                                    </h2>
                                    <p className="text-xs xs:text-base font-medium text-muted">
                                        @<span>{user.username}</span>
                                    </p>
                                    <p className="text-xs xs:text-base text-muted">
                                        <span className="font-medium text-sm xs:text-lg text-gray-900">{`${reports.length} `}</span> user(s) reported this account:
                                    </p>
                                </div>
                            </div>

                            <Link href={`/users/${user.username}`} className="flex justify-end font-baloo items-center gap-1 text-primary hover:text-orange-700 text-xs xs:text-sm font-semibold xs:self-start">
                                <span>View account</span>
                                <ChevronRight size={14} />
                            </Link>
                        </div >

                        <div>
                            <h3 className="font-semibold text-black text-sm xs:text-lg mb-4">Report Notes</h3>

                            <div className="space-y-3">
                                {reports.map((report) => (
                                    <div key={report.id}>
                                        <div className="flex items-center justify-between text-xs xs:text-sm mb-1">
                                            <span className="text-muted font-medium">
                                                @{report.reporter.username}{' '}
                                                <span className="inline text-[#E70606] italic font-normal">
                                                    '{report.type}'
                                                </span>
                                            </span>
                                            <span className="text-muted font-medium">{formatDate(report.createdAt)}</span>
                                        </div>
                                       <div className="border border-muted/20 rounded-xl p-2 text-xs xs:text-sm text-gray-900 leading-relaxed">
                                            {report.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div >

                    < div className="flex flex-col gap-5" >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between pt-4 xs:pt-0 border-t xs:border-0 border-muted/20">
                                <h4 className="font-semibold text-black text-sm xs:text-lg">Account Details</h4>
                               <Flag size={24} className="text-red-600 w-4 xs:w-5" />
                            </div>

                            <div>
                                <p className="text-xs xs:text-sm font-baloo text-gray-400 mb-0.5">Date Joined</p>
                                <p className="text-xs xs:text-sm text-gray-900 font-medium">{formatDate(user.createdAt)}</p>
                            </div>
                            <div>
                                <p className="text-xs xs:text-sm font-baloo text-gray-400 mb-0.5">Email Address</p>
                                <p className="text-xs xs:text-sm text-gray-900 font-medium">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-xs xs:text-sm font-baloo text-gray-400  mb-0.5">username</p>
                                <p className="text-xs xs:text-sm text-gray-900 font-medium">{user.username}</p>
                            </div>

                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2.5 pt-4 border-t border-muted/20">
                            <h4 className="font-semibold text-black text-sm xs:text-lg mb-2">Take Action</h4>
                            <button onClick={() => setOpenSuspendReportModal(true)} className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-baloo font-semibold py-2.5 rounded-md transition-all shadow-sm">
                                Suspend this Account
                            </button>
                            <button onClick={() => setOpenDismissModal(true)} className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-sm font-baloo font-semibold py-2.5 rounded-md transition-all">
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