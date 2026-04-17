"use client";

import { usePageAirport } from "@/hooks/Page/usePageFlight";
import { useState, useRef, useEffect } from "react";

export default function AirportField({ id, label, icon, value, onChange }) {
  const { data, loading } = usePageAirport();
  const airports = data?.data;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setFocused(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleFocus = () => {
    setFocused(true);
    setQuery("");
    setResults(airports.slice(0, 7));
    setOpen(true);
  };

  const handleInput = (e) => {
    const q = e.target.value;
    setQuery(q);
    const filtered = airports
      .filter(
        (a) =>
          a.city.toLowerCase().includes(q.toLowerCase()) ||
          a.code.toLowerCase().includes(q.toLowerCase()) ||
          a.country?.name?.toLowerCase().includes(q.toLowerCase()) ||
          a.name.toLowerCase().includes(q.toLowerCase()),
      )
      .slice(0, 7);
    setResults(filtered);
    setOpen(filtered.length > 0);
  };

  const handleSelect = (airport) => {
    onChange({
      id: airport.id,
      city: airport.city,
      code: airport.code,
      name: airport.name,
      country: airport.country?.name ?? "",
    });
    setOpen(false);
    setFocused(false);
    setQuery("");
  };

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <div
        onClick={() => document.getElementById(id)?.focus()}
        className={`
          flex items-center gap-3 px-4 py-2 bg-white
          cursor-text transition-all duration-200 border
          ${focused ? "border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]" : "border-gray-200 hover:border-gray-300"}
        `}
      >
        <span
          className={`text-sm flex-shrink-0 transition-colors ${focused ? "text-blue-500" : "text-slate-400"}`}
        >
          {icon}
        </span>

        <div className="flex flex-col px-2 py-2">
          <span className="text-primary text-sm font-medium mb-1">{label}</span>

          <input
            id={id}
            type="text"
            value={
              focused ? query : value ? `${value.code} - ${value.name}` : ""
            }
            onFocus={handleFocus}
            onChange={handleInput}
            placeholder={
              loading
                ? "Loading airports…"
                : focused
                  ? "Search city or airport…"
                  : "Select city"
            }
            disabled={loading}
            className="text-sm font-medium bg-transparent outline-none border-none placeholder:text-slate-300 placeholder:font-normal w-full disabled:cursor-wait"
            autoComplete="off"
          />

          {value && !focused && (
            <span className="text-sm text-slate-400 leading-none mt-0.5"></span>
          )}
        </div>
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-white shadow-2xl border border-gray-300 overflow-hidden min-w-[260px]">
          <div className="px-4 py-2.5 border-b border-gray-300">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              {query ? "Search Results" : "Popular Airports"}
            </span>
          </div>

          {results.map((airport) => (
            <button
              key={airport.id}
              onMouseDown={() => handleSelect(airport)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center text-[11px] font-black text-blue-600 transition-colors flex-shrink-0">
                {airport.code}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-800 truncate">
                  {airport.city}{" "}
                  <span className="text-slate-400 font-normal text-xs">
                    · {airport.country?.name}
                  </span>
                </div>
                <div className="text-xs text-slate-400 truncate">
                  {airport.name}
                </div>
              </div>

              <svg
                className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
