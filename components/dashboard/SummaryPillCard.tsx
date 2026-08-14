import { LucideIcon } from 'lucide-react';

interface Props {
    label: string;
    value: number | string;
    icon: LucideIcon;
    iconBg?: string;
}

export default function SummaryPillCard({
    label,
    value,
    icon: Icon,
    iconBg = 'bg-primary',
}: Props) {
    return (
        <>
            <div className="xs:flex hidden items-center justify-between p-2 xs:py-6 xs:px-6 bg-white rounded-xl">
                <div className={`w-7 h-7 xs:w-10 xs:h-10 rounded-full ${iconBg} text-white flex items-center justify-center shrink-0`}>
                    <Icon size={15} className="w-3 h-3 xs:w-5 xs:h-5" />
                </div>

                <span className="text-sm xs:text-lg text-gray-900 font-baloo">{label}</span>
                <span className="text-2xl xs:text-3xl font-baloo font-semibold text-gray-900">{value}</span>
            </div>

            <div className="xs:hidden flex items-center justify-between p-2 xs:py-6 xs:px-6 bg-white rounded-xl">
                <div className={`w-8 h-8 rounded-full ${iconBg} text-white flex items-center justify-center shrink-0`}>
                    <Icon size={15} className="w-4 h-4" />
                </div>
                <div className='flex flex-col items-end gap-1'>
                    <span className="text-sm  text-gray-900 font-baloo">{label}</span>
                    <span className="text-2xl font-baloo font-semibold text-gray-900">{value}</span>
                </div>
            </div>
        </>
    );
}