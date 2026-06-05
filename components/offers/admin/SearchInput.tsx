'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    debounceMs?: number;
}

export default function SearchInput({ value, onChange, placeholder = 'Search...', debounceMs = 300 }: Props) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(localValue);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [localValue, onChange, debounceMs]);

    const handleClear = () => {
        setLocalValue('');
        onChange('');
    };
    return (
        <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
                type="text"
                placeholder={placeholder}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
            />
            {localValue && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Clear search"
                >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            )}
        </div>
    );
}
