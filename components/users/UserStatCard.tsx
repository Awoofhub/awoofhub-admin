interface Props {
    label: string;
    value: number | string;
    color: string;
}

export default function UserStatsCard({ label, value, color }: Props) {
    return (
        <div className="border border-gray-100 rounded-xl p-2 sm:p-4 text-center">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1 leading-tight">
                {label}
            </p>
            <p className={`text-xl sm:text-2xl font-bold ${color}`}>{value}</p>
        </div>
    );
}