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
        <>
            <div className="overflow-x-auto rounded-lg">
                <table className="w-full text-left shadow-sm whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                        <tr>
                            <th className="px-3 py-4">Report Type</th>
                            <th className="px-3 py-4">Target</th>
                            <th className="px-3 py-4">Description</th>
                            <th className="px-3 py-4">Date Reported</th>
                            <th className="px-3 py-4">Status & Actions</th>
                            <th className="px-3 py-4 text-center">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <ReportRow key={report.id} report={report} onModerateClick={onModerateClick} />
                        ))}
                    </tbody>
                </table>
            </div>
            <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
        </>
    );
}