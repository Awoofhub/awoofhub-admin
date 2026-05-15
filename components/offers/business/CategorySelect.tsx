interface Props {
    value: string;
    onChange: (value: string) => void;
}

const categories = [
    'Coupons',
    'Cashback',
    'Freebies',
    'Student Deals',
    'Free Trials',
    'Discount',
];

export default function CategorySelect({ value, onChange }: Props) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
        >
            <option value="">All Categories</option>
            {categories.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
            ))}
        </select>
    );
}
