"use client";

import { useState, useRef, useEffect } from "react";
import { Armchair, ChevronDown, Check } from "lucide-react";

const FLIGHT_CLASSES = [
  "Economy",
  "Premium Economy",
  "Business",
  "First Class",
];

export default function ClassPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Field */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`
         px-2 py-4 flex items-center gap-3 px-4 py-3.5 border border-gray-300 bg-white
          cursor-pointer select-none transition-all duration-200 min-w-[148px]
          ${
            open
              ? "border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
              : "border-slate-100 hover:border-slate-200"
          }
        `}
      >
        {/* Seat icon */}
        <Armchair
          size={18}
          className={`flex-shrink-0 transition-colors ${
            open ? "text-blue-500" : "text-slate-400"
          }`}
        />

        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold  mb-1">
            Class
          </span>
          <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">
            {value}
          </span>
        </div>

        {/* Chevron */}
        <ChevronDown
          size={16}
          className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 bg-white shadow-2xl border border-gray-300 overflow-hidden w-full">
          {FLIGHT_CLASSES.map((cls) => (
            <button
              key={cls}
              onMouseDown={() => {
                onChange(cls);
                setOpen(false);
              }}
              className={`
                w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center
                ${
                  cls === value
                    ? "bg-blue-50 text-blue-600 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }
              `}
            >
              {cls === value && (
                <Check size={16} className="mr-2 text-blue-600" />
              )}
              {cls}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
