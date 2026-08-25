'use client';

import { CommentReport } from '@/types/report';
import { ChevronRight, Flag } from 'lucide-react';
import Link from "next/link";
import { useState } from 'react';
import DismissReportModal from '../modals/report/DismissReportModal';


interface Props {
    data: CommentReport;
}


export default function CommentReportsCard({ data }: Props) {
    const { comment, report } = data

    const [openDismissModal, setOpenDismissModal] = useState(false);

    const [openRejectModal, setOpenRejectModal] = useState(false);

    return (
        <>
            <div className="border border-gray-200 rounded-lg p-5 space-y-4 shadow-xs bg-white"        >
                <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">
                        Comment from:{' '}
                        <Link
                            href={`/users/${comment.user.username}`}
                            className="text-orange-600 font-medium hover:underline"
                        >
                            @{comment.user.username}
                        </Link>
                    </div>
                    <Link
                        href={`/offers/${comment.offer.id}`}
                        className="text-orange-600 font-medium flex items-center hover:underline cursor-pointer"
                    >
                        View deal <ChevronRight className="w-4 h-4 ml-0.5" />
                    </Link>
                </div>

                <div className="border border-gray-200 rounded-md p-4 text-gray-800 text-sm bg-white leading-relaxed">
                    {comment.comment}
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 pt-1">
                    <div className="flex items-center space-x-2">
                        <span className="text-red-500 flex items-center italic font-medium">
                            <Flag className="w-3.5 h-3.5 mr-1 fill-red-500" />
                            {report.type}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>Reported by {`@${report.reporter.username}`}</span>
                    </div>
                    <div>{report.createdAt}</div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                        className="w-full py-2.5 px-4 border border-red-500 text-red-500 font-semibold rounded-md hover:bg-red-50 transition-colors cursor-pointer text-sm"
                    >
                        Suspend
                    </button>
                    <button
                    onClick={()=>setOpenDismissModal(true)}
                        className="w-full py-2.5 px-4 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition-colors cursor-pointer text-sm"
                    >
                        Dismiss
                    </button>
                </div>
            </div>

            <DismissReportModal ids={[report.id]} isOpen={openDismissModal} onClose={() => setOpenDismissModal(false)} />
        </>
    );
};