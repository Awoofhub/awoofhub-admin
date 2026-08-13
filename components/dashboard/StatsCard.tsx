import { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface Props {
    label: string;
    value: number | string;
    iconSrc?: string;
    iconBg: string;
    iconColor?: string;
}

export default function StatsCard({
    label,
    value,
    iconSrc,
    iconBg,
    iconColor = 'text-white',
}: Props) {
    return (
        <div className="bg-white px-4 py-4 xs:py-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-1 xs:gap-4">
            <div className="flex justify-between items-center gap-3">
                <p className="text-muted font-baloo text-base xs:text-lg font-medium">{label}</p>
                <div className={`p-2 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center`}>
                    {iconSrc ? (
                        <Image src={iconSrc} alt="" width={28} height={28} className="w-5 h-5" />
                    ) : null}
                </div>
            </div>
            <div className="flex items-center justify-between gap-3">
                <div className="font-baloo text-xl xs:text-2xl lg:text-3xl font-bold text-gray-900">{value}</div>
            </div>
        </div>
    );
}