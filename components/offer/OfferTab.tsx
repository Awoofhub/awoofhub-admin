interface Props {
    activeTab: 'engagements' | 'history';
    onChange: (tab: 'engagements' | 'history') => void;
}

export default function OfferTab({ activeTab, onChange }: Props) {

    return (
        <div className="flex gap-2 mb-4 bg-[#F3F3F5] border border-gray-200 py-2 px-4 shadow-sm rounded-xl">
            <button
                type="button"
                onClick={() => onChange('engagements')}
                className={`px-3 py-1 rounded-lg ${activeTab === 'engagements' ? 'bg-white text-black text-sm xs:text-base lg:text-lg font-semibold' : 'text-muted text-xs xs:text-sm lg:text-base font-medium'}`}
            >
                Engagements
            </button>
            <button
                type="button"
                onClick={() => onChange('history')}
                className={`px-3 py-1 rounded-lg  ${activeTab === 'history' ? 'bg-white text-black text-sm xs:text-base lg:text-lg font-semibold' : 'text-muted text-xs xs:text-sm lg:text-base font-medium'}`}
            >
                Moderation & History
            </button>
        </div>
    );
}