'use client';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const statuses = [
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'suspended', label: 'Suspended' },
];

export default function StatusSelect({ value, onChange }: Props) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
        >
            <option value="">All Status</option>
            {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                    {s.label}
                </option>
            ))}
        </select>
    );
}
