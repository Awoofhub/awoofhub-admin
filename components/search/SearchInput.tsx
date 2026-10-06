'use client'
import { useFilter } from '@/features/offers/useFilter';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { FiSearch } from 'react-icons/fi';

type Props = {
  placeholder?: string;
};

function SearchInputContent({ placeholder }: Props) {
  const searchParams = useSearchParams();
  const updateFilter = useFilter();

  return (
    <div className="flex items-center w-full h-[40px] px-4 rounded-xl border border-muted/30 bg-background-light">
      <FiSearch className="text-muted text-xl mr-2" size={18} />
      <input
        placeholder={placeholder}
        aria-label="Search"
        className="w-full bg-transparent text-xs xs:text-sm lg:text-base text-foreground placeholder:text-muted/60 focus:outline-none"
        type="search"
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => updateFilter('search', e.target.value)}
      />
    </div>
  );
}

export default function SearchInput({ placeholder = "Search" }: Props) {
  return (
    <Suspense
      fallback={
        <div className="hidden lg:flex items-center w-full h-[40px] px-4 rounded-xl border border-muted/30 bg-background-light">
          <FiSearch className="text-mutedtext-xl mr-2" size={18} />
          <input
            placeholder={placeholder}
            aria-label="Search"
            className="w-full bg-transparent text-xs xs:text-sm lg:text-base text-foreground placeholder:text-muted/60 focus:outline-none"
            type="search"
            disabled
          />
        </div>
      }
    >
      <SearchInputContent placeholder={placeholder} />
    </Suspense>
  );
};
