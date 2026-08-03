"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  IoChevronBack,
  IoChevronDown,
  IoChevronForward,
} from "react-icons/io5";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type CalendarProps = {
  month: Date;
  selectedDate: string;
  minDate: string;
  maxDate: string;
  rangeStart: string;
  rangeEnd: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelect: (date: string) => void;
  showPreviousButton?: boolean;
  showNextButton?: boolean;
};

function Calendar({
  month,
  selectedDate,
  minDate,
  maxDate,
  rangeStart,
  rangeEnd,
  onPreviousMonth,
  onNextMonth,
  onSelect,
  showPreviousButton = true,
  showNextButton = true,
}: CalendarProps) {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });
  const selected = selectedDate ? parseISO(selectedDate) : undefined;
  const min = minDate ? parseISO(minDate) : undefined;
  const max = maxDate ? parseISO(maxDate) : undefined;
  const rangeStartDate = rangeStart ? parseISO(rangeStart) : undefined;
  const rangeEndDate = rangeEnd ? parseISO(rangeEnd) : undefined;
  const rangeLabel =
    rangeStartDate && rangeEndDate
      ? `${format(rangeStartDate, "d/M/yyyy")} - ${format(rangeEndDate, "d/M/yyyy")}`
      : "Select date range";

  return (
    <div className="rounded-xl bg-white p-5">
      <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-4 text-xs text-gray-800">
        <p className="min-w-fit font-semibold">{format(month, "MMMM yyyy")}</p>
        <p className="flex-1 truncate text-center">{rangeLabel}</p>
        <div className="flex gap-2">
          {showPreviousButton && (
            <button
              type="button"
              onClick={onPreviousMonth}
              className="rounded bg-gray-200 p-1 text-gray-600 hover:bg-gray-300"
              aria-label="Previous month"
            >
              <IoChevronBack />
            </button>
          )}
          {showNextButton && (
            <button
              type="button"
              onClick={onNextMonth}
              className="rounded bg-gray-200 p-1 text-gray-600 hover:bg-gray-300"
              aria-label="Next month"
            >
              <IoChevronForward />
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-xs">
        {WEEKDAYS.map((day) => (
          <span key={day} className="pb-2 font-semibold text-gray-900">
            {day}
          </span>
        ))}
        {days.map((day) => {
          const outsideMonth = !isSameMonth(day, month);
          const disabled =
            outsideMonth ||
            (min && isBefore(day, min)) ||
            (max && isAfter(day, max));
          const isSelected = selected && isSameDay(day, selected);
          const isInRange =
            rangeStartDate &&
            rangeEndDate &&
            !isBefore(day, rangeStartDate) &&
            !isAfter(day, rangeEndDate);

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={Boolean(disabled)}
              onClick={() => onSelect(format(day, "yyyy-MM-dd"))}
              className={`flex h-9 w-full items-center justify-center transition ${isSelected ? "bg-primary font-semibold text-white" : isInRange ? "bg-[#fde5dc] text-gray-700" : disabled ? "cursor-not-allowed text-gray-300" : outsideMonth ? "text-gray-400 hover:bg-orange-50" : "text-gray-700 hover:bg-orange-50 hover:text-primary"}`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type OfferDateRangePickerProps = {
  createdFrom?: string;
  createdTo?: string;
  onApply: (dates: { createdFrom: string; createdTo: string }) => void;
};

export function OfferDateRangePicker({
  createdFrom,
  createdTo,
  onApply,
}: OfferDateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState(createdFrom ?? "");
  const [draftTo, setDraftTo] = useState(createdTo ?? "");
  const [calendarMonth, setCalendarMonth] = useState(() =>
    createdFrom
      ? startOfMonth(parseISO(createdFrom))
      : startOfMonth(new Date()),
  );
  const [top, setTop] = useState<number | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!isOpen) {
      setDraftFrom(createdFrom ?? "");
      setDraftTo(createdTo ?? "");
      setCalendarMonth(
        createdFrom
          ? startOfMonth(parseISO(createdFrom))
          : startOfMonth(new Date()),
      );

      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) {
        setTop(rect.bottom + window.scrollY + 8);
      }
    }
    setIsOpen((open) => !open);
  };

  const apply = () => {
    onApply({ createdFrom: draftFrom, createdTo: draftTo });
    setIsOpen(false);
  };

  const handleDateSelect = (date: string) => {
    if (!draftFrom || (draftFrom && draftTo)) {
      setDraftFrom(date);
      setDraftTo("");
      return;
    }

    const start = new Date(draftFrom);
    const next = new Date(date);

    if (next < start) {
      setDraftFrom(date);
      setDraftTo("");
      return;
    }

    setDraftTo(date);
  };

  // Close on outside click — checks both the trigger and the portaled panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        panelRef.current &&
        !panelRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasRange = Boolean(createdFrom && createdTo);
  const triggerLabel = hasRange
    ? `${format(parseISO(createdFrom!), "d/M/yyyy")} – ${format(parseISO(createdTo!), "d/M/yyyy")}`
    : createdFrom
      ? `From ${format(parseISO(createdFrom), "d/M/yyyy")}`
      : createdTo
        ? `To ${format(parseISO(createdTo), "d/M/yyyy")}`
        : "Date";

  return (
    <div className="relative z-20 font-baloo">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={[
          "flex py-2 cursor-pointer items-center justify-between gap-2 rounded-full border px-3 text-sm xs:text-base font-medium transition",
          hasRange ? "w-auto min-w-[110px]" : "w-[92px]",
          hasRange || isOpen
            ? "border-primary bg-primary text-white"
            : "border-[#595858B2] bg-white text-[#0C0C0C] hover:border-[#737373]",
        ].join(" ")}
      >
        <span className="truncate">{triggerLabel}</span>
        <IoChevronDown
          className={[
            "shrink-0 text-sm transition-transform duration-200",
            isOpen ? "rotate-180" : "",
            hasRange || isOpen ? "text-white" : "text-[#595858]",
          ].join(" ")}
        />
      </button>

      {isOpen &&
        top !== null &&
        createPortal(
          <div
            ref={panelRef}
            style={{
              position: "absolute",
              top,
              left: "50%",
              transform: "translateX(-50%)",
            }}
            className="z-50 w-[calc(100vw-2rem)] max-w-[380px] xs:max-w-[400px] md:max-w-[min(43rem,calc(100vw-2rem))] lg:max-w-[min(47rem,calc(100vw-2rem))] rounded-xl border border-gray-200 bg-white p-1 shadow-xl"
            role="dialog"
            aria-label="Choose a date range"
          >
            <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
              <Calendar
                month={calendarMonth}
                selectedDate={draftFrom}
                minDate=""
                maxDate={draftTo}
                rangeStart={draftFrom}
                rangeEnd={draftTo}
                onPreviousMonth={() =>
                  setCalendarMonth((month) => subMonths(month, 1))
                }
                onNextMonth={() =>
                  setCalendarMonth((month) => addMonths(month, 1))
                }
                onSelect={handleDateSelect}
                showPreviousButton
                showNextButton={false}
              />
              <Calendar
                month={addMonths(calendarMonth, 1)}
                selectedDate={draftTo}
                minDate={draftFrom}
                maxDate=""
                rangeStart={draftFrom}
                rangeEnd={draftTo}
                onPreviousMonth={() =>
                  setCalendarMonth((month) => subMonths(month, 1))
                }
                onNextMonth={() =>
                  setCalendarMonth((month) => addMonths(month, 1))
                }
                onSelect={handleDateSelect}
                showPreviousButton={false}
                showNextButton
              />
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-200 px-4 py-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-primary px-6 py-2 text-xs font-semibold text-primary hover:bg-orange-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={apply}
                className="rounded-md bg-primary px-8 py-2 text-xs font-semibold text-white transition hover:bg-[#e64703]"
              >
                Apply
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
