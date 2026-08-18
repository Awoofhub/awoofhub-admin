'use client'
import { useFilter } from '@/features/offers/useFilter';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { FiSearch } from 'react-icons/fi';


function SearchInputContent() {
  const searchParams = useSearchParams();
  const updateFilter = useFilter();

  return (
    <div className="hidden lg:flex items-center w-full h-[46px] px-6 rounded-2xl border border-muted/30 bg-background-light">
      <FiSearch className="text-muted text-xl mr-3" size={20} />
      <input
        placeholder="Search for offers"
        aria-label="Search"
        className="w-full bg-transparent text-[16px] text-foreground placeholder:text-muted/60 focus:outline-none"
        type="search"
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => updateFilter('search', e.target.value)}
      />
    </div>
  );
}

export default function SearchInput() {
  return (
    <Suspense
      fallback={
        <div className="hidden lg:flex items-center w-[434px] h-[46px] px-6 rounded-2xl border border-muted/30 bg-background-light">
          <FiSearch className="text-muted text-xl mr-3" size={20} />
          <input
            placeholder="Search for offers"
            aria-label="Search"
            className="w-full bg-transparent text-[16px] text-foreground placeholder:text-muted/60 focus:outline-none"
            type="search"
            disabled
          />
        </div>
      }
    >
      <SearchInputContent />
    </Suspense>
  );
};
