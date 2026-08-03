"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoCheckmark, IoChevronDown } from "react-icons/io5";

type Option = {
  value: string;
  label: string;
};

type OfferSelectDropdownProps = {
  placeholder: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  width?: string;
  dropdownWidth?: string;
  primaryWhenEmpty?: boolean;
  align?: "left" | "center";
};

export function OfferSelectDropdown({
  placeholder,
  options,
  value,
  onChange,
  width = "w-[130px]",
  dropdownWidth,
  primaryWhenEmpty = false,
  align = "left",
}: OfferSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const label = selectedOption?.label ?? placeholder;
  const hasValue = Boolean(value);

  const updatePosition = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        panelRef.current && !panelRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  useEffect(() => {
    if (!isOpen) return;
    const handleReposition = () => updatePosition();
    
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [isOpen]);

  const toggle = () => {
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen((open) => !open);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue === value ? "" : optionValue);
    setIsOpen(false);
  };

  const isPrimary = primaryWhenEmpty && !hasValue;

  return (
    <div className="relative font-baloo text-[16px] font-medium">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={[
          "flex cursor-pointer py-2 items-center justify-between gap-2 rounded-2xl border px-3 text-sm xs:text-base font-medium transition",
          width,
          isPrimary || hasValue || isOpen
            ? "border-primary bg-primary text-white"
            : "border-[#595858B2] bg-white text-[#0C0C0C] hover:border-[#737373]",
        ].join(" ")}
      >
        <span className={`truncate ${align === "center" ? "flex-1 text-center" : ""}`}>{label}</span>
        <IoChevronDown
          className={[
            "shrink-0 text-sm transition-transform duration-200",
            isOpen ? "rotate-180" : "",
            isPrimary || hasValue || isOpen ? "text-white" : "text-[#595858]",
          ].join(" ")}
        />
      </button>

      {isOpen && position && createPortal(
        <div
          ref={panelRef}
          role="listbox"
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
          }}
          className="z-50 max-h-70 overflow-y-auto whitespace-nowrap overflow-hidden font-medium rounded-xl border border-gray-100 bg-white py-1 shadow-sm"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={`flex ${dropdownWidth} items-center gap-2 border-b border-gray-100 px-4 py-2 text-left text-sm text-[#0C0C0C] last:border-0 hover:bg-orange-50 transition-colors`}
              >
                <span className="w-4 shrink-0 text-[#12B76A]">
                  {isSelected && <IoCheckmark />}
                </span>
                {option.label}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}