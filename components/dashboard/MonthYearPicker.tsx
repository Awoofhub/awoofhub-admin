'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
const YEAR_RANGE = 3;

interface MonthYearPickerProps {
    monthIndex: number;
    year: number;
    onChange: (monthIndex: number, year: number) => void;
    maxMonthIndex: number;
    maxYear: number;
}

// Custom month/year picker 
export default function MonthYearPicker({
    monthIndex, year, onChange, maxMonthIndex, maxYear,
}: MonthYearPickerProps) {
    const [open, setOpen] = useState(false);
    const [viewYear, setViewYear] = useState(year);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isFutureMonth = (mIdx: number, y: number) => y > maxYear || (y === maxYear && mIdx > maxMonthIndex);

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => {
                    setOpen((o) => {
                        const next = !o;
                        if (next) setViewYear(year);
                        return next;
                    });
                }}
                className="flex items-center gap-2 border border-gray-300 rounded-lg pl-3 pr-2.5 py-2 font-baloo font-medium text-sm text-gray-800 bg-white shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors cursor-pointer"
            >
                {MONTH_NAMES[monthIndex].slice(0, 3)} {year}
                <ChevronDown size={14} className={`text-gray-700 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg p-3 z-20">
                    <div className="flex items-center justify-between mb-2">
                        <button type="button" onClick={() => setViewYear((y) => y - 1)}
                            className="cursor-pointer text-xl text-gray-500 hover:text-black px-1.5 py-0.5 rounded hover:bg-gray-50"
                            disabled={viewYear <= maxYear - YEAR_RANGE}>‹</button>
                        <span className="font-baloo font-semibold text-sm text-gray-900">{viewYear}</span>
                        <button type="button" onClick={() => setViewYear((y) => y + 1)}
                            className="cursor-pointer text-xl text-gray-500 hover:text-black px-1.5 py-0.5 rounded hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent"
                            disabled={viewYear >= maxYear}>›</button>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                        {MONTH_NAMES.map((name, i) => {
                            const disabled = isFutureMonth(i, viewYear);
                            const selected = i === monthIndex && viewYear === year;
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => { onChange(i, viewYear); setOpen(false); }}
                                    className={`text-sm font-baloo font-medium py-1.5 rounded-md transition-colors
                                        ${selected ? 'bg-primary text-white' : 'text-gray-800 hover:bg-gray-100'}
                                        ${disabled ? 'opacity-30 cursor-not-allowed hover:bg-transparent' : 'cursor-pointer'}
                                    `}
                                >
                                    {name.slice(0, 3)}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}