"use client";

// components/filter/PassengerPicker.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Passenger count selector। Adults / Children / Infants আলাদা আলাদা।
// Field click করলে dropdown popup হয়।
//
// Props:
//   adults      → adult count
//   children    → children count
//   infants     → infant count
//   onAdults    → adult count change হলে
//   onChildren  → children count change হলে
//   onInfants   → infant count change হলে
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";

// ── +/- Counter row ────────────────────────────────────────────────────────
function CounterRow({ label, subtitle, value, onChange, min = 0 }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold text-slate-700">{label}</div>
        <div className="text-xs text-slate-400">{subtitle}</div>
      </div>
      <div className="flex items-center gap-3">
        {/* Minus */}
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border-2 border-slate-200 hover:border-blue-400 flex items-center justify-center text-slate-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-base font-bold leading-none"
        >
          −
        </button>
        <span className="w-4 text-center text-sm font-bold text-slate-800">
          {value}
        </span>
        {/* Plus */}
        <button
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full border-2 border-slate-200 hover:border-blue-400 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all text-base font-bold leading-none"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function PassengerPicker({
  adults,
  children,
  infants,
  onAdults,
  onChildren,
  onInfants,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const totalPassengers = adults + children + infants;

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
      {/* ── Field ── */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 bg-white
          cursor-pointer select-none transition-all duration-200 min-w-[150px]
          ${
            open
              ? "border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
              : "border-slate-100 hover:border-slate-200"
          }
        `}
      >
        {/* People icon */}
        <span
          className={`flex-shrink-0 transition-colors ${open ? "text-blue-500" : "text-slate-400"}`}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </span>

        {/* Count text */}
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 leading-none mb-1">
            Passengers
          </span>
          <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">
            {totalPassengers} Traveller{totalPassengers !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-auto transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 w-60">
          <div className="space-y-4">
            <CounterRow
              label="Adults"
              subtitle="Age 12+"
              value={adults}
              onChange={onAdults}
              min={1}
            />
            <div className="h-px bg-slate-100" />
            <CounterRow
              label="Children"
              subtitle="Age 2–11"
              value={children}
              onChange={onChildren}
            />
            <div className="h-px bg-slate-100" />
            <CounterRow
              label="Infants"
              subtitle="Age 0–2"
              value={infants}
              onChange={onInfants}
            />
          </div>

          {/* Done button */}
          <button
            onClick={() => setOpen(false)}
            className="mt-5 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
