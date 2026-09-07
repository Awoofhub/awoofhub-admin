'use client';

import { CommentReport } from '@/types/report';
import { ChevronRight, Flag, Dot } from 'lucide-react';
import Link from "next/link";
import { useState } from 'react';
import DeleteCommentReportModal from '../modals/report/DeleteCommentReport';
import DismissReportModal from '../modals/report/DismissReportModal';
import { formatDate } from '@/utils/formatDate';


interface Props {
    data: CommentReport;
}


export default function CommentReportsCard({ data }: Props) {
    const { comment, report } = data

    const [openDismissModal, setOpenDismissModal] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    return (
        <>
            <div className="border border-gray-200 rounded-2xl p-4 xs:p-6 shadow-xs bg-white">
                <div className="flex items-center justify-between mb-1">
                    <div className="font-baloo font-medium text-sm xs:text-base text-gray-900">
                        Comment from:{' '}
                        <Link
                            href={`/users/${comment.user.username}`}
                            className="text-primary text-sm hover:underline"
                        >
                            @{comment.user.username}
                        </Link>
                    </div>
                    <Link
                        href={`/offers/${comment.offer.id}`}
                        className="flex font-baloo items-center text-primary hover:text-orange-700 text-xs xs:text-sm font-semibold"
                    >
                        View deal <ChevronRight className="w-3 h-3 xs:w-4 xs:h-4 ml-px" />
                    </Link>
                </div>

                <div className="border border-muted/20 rounded-xl p-3 text-gray-900 text-sm font-medium xs:text-base bg-white leading-relaxed">
                    {comment.comment}
                </div>

                <div className="flex flex-wrap items-center justify-between text-muted pt-1">
                    <div className="flex items-center gap-0.5 xs:gap-2">
                        <span className="text-red-600 text-[10px] xs:text-sm flex items-center italic font-medium">
                            <Flag className="w-3 h-3 xs:w-4 xs:h-4 mr-1" />
                            {report.type}
                        </span>
                        <Dot className="w-4 h-4 xs:w-6 xs:h-6"/>
                        <span className="text-[10px] xs:text-xs">Reported by {`@${report.reporter.username}`}</span>
                    </div>
                    <span className="text-[10px] xs:text-xs flex items-center"> <Dot size={16}/>{formatDate(report.createdAt)}</span>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3 xs:gap-4 pt-4">
                    <button
                         onClick={() => setOpenDismissModal(true)}
                        className="w-full py-2 px-4 border-2 border-black text-black font-semibold font-baloo rounded-sm hover:bg-red-50 transition-colors cursor-pointer text-sm xs:text-base"
                    >
                        Dismiss
                    </button>
                    <button
                        onClick={() => setOpenDeleteModal(true)}
                        className="w-full py-2 px-4 bg-orange-600 text-white font-semibold rounded-sm font-baloo hover:bg-orange-700 transition-colors cursor-pointer text-sm xs:text-base"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <DismissReportModal ids={[report.id]} isOpen={openDismissModal} onClose={() => setOpenDismissModal(false)} />
            <DeleteCommentReportModal commentId={comment.id} reportId={report.id} isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)} />

        </>
    );
};