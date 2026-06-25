'use client';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const dealTypes = [
    { label: 'Discount', value: 'discount' },
    { label: 'Cashback', value: 'cashback' },
    { label: 'BOGO (Buy 1 Get 1)', value: 'bogo' },
    { label: 'Promo Code', value: 'promo_code' },
    { label: 'Free Trial', value: 'free_trial' },
    { label: 'Free Delivery', value: 'free_delivery' },
];

export default function DealTypeSelect({ value, onChange }: Props) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
        >
            <option value="">All Deal Types</option>
            {dealTypes.map((type) => (
                <option key={type.value} value={type.value}>
                    {type.label}
                </option>
            ))}
        </select>
    );
}