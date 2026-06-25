'use client';

import { useQuery } from '@tanstack/react-query';
import { getCategoriesService } from '@/services/category-service';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function CategorySelect({ value, onChange }: Props) {
    const { data: categoriesResponse, isLoading } = useQuery({
        queryKey: ['categories-dropdown'],
        queryFn: () => getCategoriesService('', 1, 100),
    });

    const categories = categoriesResponse?.data;

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={isLoading}
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white disabled:opacity-50"
        >
            <option value="">{isLoading ? 'Loading Categories...' : 'All Categories'}</option>
            {categories?.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                    {cat.name}
                </option>
            ))}
        </select>
    );
}