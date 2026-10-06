"use client";

import { SelectDropdown } from "./SelectDropdown";

interface Props {
  data: { label: string; value: string | undefined }[];
  value: string | undefined;
  onChange: (value: any) => void;
  compulsory?: boolean;
  label?: string;
  error?: string;
}

export function FormSelectDropdown({ data, value, onChange, compulsory, label, error }: Props) {
  return (
    <div>
      {label && (
        <label className="block text-gray-500 text-sm mb-1">
          {label}
          {compulsory && <span className="text-red-500"> *</span>}
        </label>
      )}

      <SelectDropdown
        data={data}
        value={value}
        onChange={onChange}
      />
      {error && (
        <p className="text-red-500 text-left text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}