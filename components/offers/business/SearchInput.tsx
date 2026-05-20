'use client';

import { Search } from 'lucide-react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = 'Search offers...' }: Props) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
            />
        </div>
    );
}
