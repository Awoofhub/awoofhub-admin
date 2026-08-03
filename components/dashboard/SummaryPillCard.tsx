import { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface Props {
    label: string;
    value: number | string;
    icon?: LucideIcon;
    iconSrc?: string;
    iconBg?: string;
}

export default function SummaryPillCard({
    label,
    value,
    icon: Icon,
    iconSrc,
    iconBg = 'bg-primary',
}: Props) {
    return (
        <div className="flex items-center justify-between p-2 xs:py-6 x:px-4 bg-white rounded-xl">
            <div className={`w-7 h-7 xs:w-10 xs:h-10 rounded-full ${iconBg} text-white flex items-center justify-center shrink-0`}>
                {iconSrc ? (
                    <Image src={iconSrc} alt="" width={20} height={20} />
                ) : Icon ? (
                    <Icon size={15} className="w-3 h-3 xs:w-5 xs:h-5"/>
                ) : null}
            </div>

            <span className="text-sm xs:text-lg text-gray-900 font-baloo">{label}</span>
            <span className="text-2xl xs:text-3xl font-baloo font-semibold text-gray-900">{value}</span>

        </div>
    );
}