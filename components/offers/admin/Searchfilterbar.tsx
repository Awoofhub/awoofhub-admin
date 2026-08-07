// SearchFilterBar.tsx
// Search box + category/type dropdowns from the top of the All Offers page.
// Fully controlled — parent owns the filter state and passes values +
// change handlers down, consistent with the rest of these components.

import { Search, ChevronDown } from "lucide-react";

export interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;

  categoryOptions: FilterOption[];
  categoryValue: string; // "" = "All categories"
  onCategoryChange: (value: string) => void;

  dealTypeOptions: FilterOption[];
  dealTypeValue: string; // "" = "All deal types"
  onDealTypeChange: (value: string) => void;
}

function FilterDropdown({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

export function SearchFilterBar({
  searchValue,
  onSearchChange,
  categoryOptions,
  categoryValue,
  onCategoryChange,
  dealTypeOptions,
  dealTypeValue,
  onDealTypeChange,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title or @handle..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <div className="flex  gap-3">
        <FilterDropdown
          value={categoryValue}
          onChange={onCategoryChange}
          options={categoryOptions}
          placeholder="All categories"
        />
        <FilterDropdown
          value={dealTypeValue}
          onChange={onDealTypeChange}
          options={dealTypeOptions}
          placeholder="All deal types"
        />
      </div>
    </div>
  );
}