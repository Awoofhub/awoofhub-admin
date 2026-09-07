import { useTabsReportCount } from "@/features/reports/useTabsReportCount";
import { ReportTabsCount } from "@/types/report";

interface Props {
    activeTab: string | undefined;
    onChange: (tab: string | undefined) => void;
    tabs: { value: keyof ReportTabsCount  | undefined; label: string }[];
}

export default function ReportTabs({ tabs, activeTab, onChange }: Props) {
    const { data: counts } = useTabsReportCount();

    return (
        <div className="bg-[#F3F3F5] overflow-x-auto p-1.5 rounded-xl flex items-center gap-2 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.label}
                    onClick={() => onChange(tab.value)}
                    className={`px-3 md:px-4 py-2.5 md:py-2 cursor-pointer rounded-2xl text-sm lg:text-base font-medium whitespace-nowrap transition-colors
                    ${activeTab === tab.value ? "bg-primary text-white" : "text-muted hover:bg-gray-100"}`}
                >
                    {tab.label} Reports ({tab.value ? counts?.[tab.value] ?? 0 : counts?.offers ?? 0})
                </button>
            ))}
        </div>
    );
}
