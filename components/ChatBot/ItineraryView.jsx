"use client";
// ============================================
// ItineraryView.jsx — Day by Day Plan
// ============================================

import { useState } from "react";

export default function ItineraryView({ itinerary }) {
  const [activeDay, setActiveDay] = useState(0);

  if (!itinerary?.length) return null;

  const current = itinerary[activeDay];

  return (
    <div className="rounded-2xl border border-primary/20 bg-white overflow-hidden">
      {/* Header */}
      <div
        className="bg-gradient-to-r from-primary/5 to-primary/10
                      px-3 py-2 flex items-center gap-2"
      >
        <span className="text-base">🗺️</span>
        <p className="text-xs font-semibold text-gray-700">
          Day-by-Day Itinerary ({itinerary.length} days)
        </p>
      </div>

      {/* Day Selector — Scrollable pills */}
      <div
        className="flex gap-1.5 p-2 overflow-x-auto scrollbar-none
                      border-b border-gray-100"
      >
        {itinerary.map((day, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            className={`
              flex-shrink-0 text-[10px] font-semibold px-3 py-1.5 rounded-full
              transition-all duration-200
              ${
                activeDay === i
                  ? "bg-primary text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary"
              }
            `}
          >
            Day {day.day_number}
          </button>
        ))}
      </div>

      {/* Active Day Content */}
      <div className="p-3">
        <h4 className="text-xs font-bold text-primary mb-2">
          📍 Day {current.day_number} — {current.title}
        </h4>

        <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
          {current.description}
        </p>

        <div className="space-y-1.5">
          {current.accommodation && (
            <div className="flex items-start gap-2 text-[10px] text-gray-500">
              <span className="flex-shrink-0">🏨</span>
              <span>
                <strong className="text-gray-600">থাকা:</strong>{" "}
                {current.accommodation}
              </span>
            </div>
          )}
          {current.meals && (
            <div className="flex items-start gap-2 text-[10px] text-gray-500">
              <span className="flex-shrink-0">🍽️</span>
              <span>
                <strong className="text-gray-600">খাবার:</strong>{" "}
                {current.meals}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-3 pb-3">
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((activeDay + 1) / itinerary.length) * 100}%` }}
          />
        </div>
        <p className="text-[9px] text-gray-400 mt-1 text-right">
          {activeDay + 1} / {itinerary.length} days
        </p>
      </div>
    </div>
  );
}
