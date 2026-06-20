import PaginationButtons from "@/components/button/PaginationButtons";
import { Report } from "@/types/report";
import ReportRow from "./ReportRow";

interface Props {
    reports: Report[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onModerateClick: (id: string, status: 'resolved' | 'dismissed') => void;
}

export default function ReportPaginatedList({ reports, currentPage, totalPages, onPageChange, onModerateClick }: Props) {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left shadow-sm whitespace-nowrap relative">
                    <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-3 py-4 bg-gray-50">Report Type</th>
                            <th className="px-3 py-4 bg-gray-50">Target</th>
                            <th className="px-3 py-4 bg-gray-50">Description</th>
                            <th className="px-3 py-4 bg-gray-50">Date Reported</th>
                            <th className="px-3 py-4 bg-gray-50">Status & Actions</th>
                            <th className="px-3 py-4 text-center bg-gray-50">View</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {reports.map((report) => (
                            <ReportRow key={report.id} report={report} onModerateClick={onModerateClick} />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="shrink-0 bg-white border-t border-gray-100 p-2 sm:p-4 z-20">
                <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
            </div>
        </div>
    );
}