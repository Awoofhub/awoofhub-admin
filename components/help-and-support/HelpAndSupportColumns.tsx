import { HelpAndSupport } from "@/types/help-and-support";
import { Column } from "../table/BaseTable";
import { formatDate } from "@/utils/formatDate";


const STATUS_BADGE: Record<HelpAndSupport["status"], { label: string; className: string; }> = {
    inProgress: { label: "In progress", className: "bg-white text-primary border border-primary" },
    resolved: { label: "Resolved", className: "bg-white text-[#00A95D] border border-[#00A95D]" },
    closed: { label: "Closed", className: "bg-white text-muted border border-muted" },
    open: { label: "Open", className: "bg-primary text-white" },
};

function StatusBadge({ status }: { status: HelpAndSupport["status"] }) {
    const badge = STATUS_BADGE[status];
    if (!badge) return null;
    return (
        <span className={`inline-flex items-center gap-1 text-sm font-medium font-baloo px-4 py-1 rounded-sm ${badge.className}`}>
            {badge.label}
        </span>
    );
}

export const HelpAndSupportColumns: Column<HelpAndSupport>[] = [
    {
        key: "name",
        header: "Name",
        render: (data) => (
            <span className="font-semibold text-sm text-gray-900">
                {data.name}
            </span>
        ),
    },

    {
        key: "email",
        header: "Email Address",
        render: (data) => (<span className="font-medium">{data.email}</span>),
    },

    {
        key: "category",
        header: "Category",
        render: (data) => data.category
    },

    {
        key: "date",
        header: "Date",
        render: (data) => formatDate(data.createdAt)
    },

    {
        key: "status",
        header: "Status",
        render: (data) => <StatusBadge status={data.status} />,
    },

];