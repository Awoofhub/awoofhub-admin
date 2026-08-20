"use client";

import { useEffect, useRef, useState } from "react";
import { IoCheckmark, IoChevronDown } from "react-icons/io5";

type Option = {
  value: string | undefined;
  label: string;
};

type Props = {
  data: Option[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
};

export function SelectDropdown({ data, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("click", handleClickOutSide);
    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const handleClickOutSide = (e: Event) => {
    const target = e.target;
    if (target instanceof Node && dropdownRef.current?.contains(target)) {
      return;
    }
    setOpen(false);
  };

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const selectedOption = data.find((option) => option.value === value);

  const isSelected = value !== undefined;

  return (
    <div ref={dropdownRef} className="relative w-full font-baloo text-[16px] font-medium">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`
          flex w-full cursor-pointer items-center justify-between gap-2
          rounded-xl border border-muted/30 px-3 py-2
          text-sm transition
          xs:text-base
          h-[40px]
          ${isSelected
            ? "border-primary bg-primary text-white"
            : "border-[#595858B2] bg-white text-[#0C0C0C] hover:border-[#737373]"
          }
        `}
      >
        <span className="truncate">
          {selectedOption?.label}
        </span>

        <IoChevronDown
          className={`shrink-0 text-sm transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute left-0 top-full z-50 mt-1 max-h-70 w-full
            overflow-y-auto overflow-hidden whitespace-nowrap
            rounded-xl border border-gray-100 bg-white py-1
            font-medium shadow-sm
          "
        >
          {data.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.label}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="
                  flex w-full items-center gap-2 border-b border-gray-100
                  px-4 py-2 text-left text-sm text-[#0C0C0C]
                  transition-colors hover:bg-orange-50 last:border-0
                "
              >
                <span className="w-4 shrink-0 text-[#12B76A]">
                  {isSelected && <IoCheckmark />}
                </span>

                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}