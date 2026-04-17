"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import CalendarGrid from "./CalendarGrid";

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DatePicker({
  label,
  value,
  onChange,
  minDate,
  placeholder = "Add date",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const today = new Date();
  const selectedDate = value || today;

  // Outside click close
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex items-center gap-3 px-2 py-4 border border-gray-300 bg-white
          cursor-pointer select-none transition-all duration-200 min-w-[172px]
          ${
            open
              ? "border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
              : "border-slate-100 hover:border-slate-200"
          }
        `}
      >
        {/* Lucide Calendar Icon */}
        <Calendar
          size={18}
          className={`transition-colors ${
            open ? "text-blue-500" : "text-slate-400"
          }`}
        />

        {/* Text */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm  font-medium   mb-1">
            {label}
          </span>

          <span className="text-[15px] font-medium text-primary truncate">
            {formatDate(selectedDate)}
          </span>

          {/* <span className="text-[11px] text-slate-400 mt-0.5">
            {WEEKDAY_NAMES[selectedDate.getDay()]}
          </span> */}
        </div>

        {/* Lucide Chevron */}
        <ChevronDown
          size={16}
          className={`ml-auto transition-transform duration-200 text-slate-400 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Calendar Popup */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
          <CalendarGrid
            selected={selectedDate}
            minDate={minDate}
            onChange={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
