"use client";

import { useState, useRef, useEffect } from "react";

export default function SelectField({
  label,
  icon,
  options,
  value,
  onChange,
  showDesc = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value);

  // ── Outside click → close ──────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* ── Field trigger ── */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex items-center gap-3 px-4 py-2  border border-gray-300  bg-white
          cursor-pointer select-none transition-all duration-200 min-w-[200px]
          ${
            open
              ? "border-violet-500 shadow-[0_0_0_4px_rgba(139,92,246,0.1)]"
              : "border-slate-100 hover:border-slate-200"
          }
        `}
      >
        {/* Icon */}
        <span
          className={`text-sm flex-shrink-0 transition-colors ${open ? "text-violet-500" : "text-slate-400"}`}
        >
          {icon}
        </span>

        {/* Selected value */}
        <div className="flex flex-col px-2 py-2">
          <span className="text-gray-300 text-sm font-medium mb-1">
            {label}
          </span>
          <span className="text-sm 
          font-semibold text-slate-800 ">
            {selected
              ? `${selected.flag ?? selected.icon ?? ""} ${selected.label}`
              : "Select…"}
          </span>
        </div>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* ── Dropdown ── */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 bg-white  shadow-2xl border border-gray-300 overflow-hidden w-full">
          {options.map((opt) => (
            <button
              key={opt.value}
              onMouseDown={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                ${opt.value === value ? "bg-violet-50" : "hover:bg-slate-50"}
              `}
            >
              {/* Flag or icon */}
              <span className="text-xl flex-shrink-0">
                {opt.flag ?? opt.icon}
              </span>

              {/* Label + description */}
              <div className="min-w-0">
                <div
                  className={`text-sm font-semibold truncate ${opt.value === value ? "text-violet-700" : "text-slate-700"}`}
                >
                  {opt.label}
                </div>
                {showDesc && opt.desc && (
                  <div className="text-xs text-slate-400">{opt.desc}</div>
                )}
              </div>

              {/* Checkmark for selected */}
              {opt.value === value && (
                <span className="ml-auto text-violet-500 flex-shrink-0">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
