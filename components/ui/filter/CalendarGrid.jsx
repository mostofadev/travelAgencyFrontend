"use client";

import { useState } from "react";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WEEKDAY_FULL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function CalendarGrid({
  selected,
  minDate,
  onChange,
  viewYear: externalYear,
  viewMonth: externalMonth,
  onPrev: externalPrev,
  onNext: externalNext,
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const min = minDate ?? today;

  
  const [internalYear, setInternalYear] = useState(
    selected?.getFullYear() ?? today.getFullYear(),
  );
  const [internalMonth, setInternalMonth] = useState(
    selected?.getMonth() ?? today.getMonth(),
  );

  const isControlled =
    externalYear !== undefined && externalMonth !== undefined;
  const viewYear = isControlled ? externalYear : internalYear;
  const viewMonth = isControlled ? externalMonth : internalMonth;

  const handlePrev =
    externalPrev ??
    (() => {
      if (internalMonth === 0) {
        setInternalMonth(11);
        setInternalYear((y) => y - 1);
      } else setInternalMonth((m) => m - 1);
    });

  const handleNext =
    externalNext ??
    (() => {
      if (internalMonth === 11) {
        setInternalMonth(0);
        setInternalYear((y) => y + 1);
      } else setInternalMonth((m) => m + 1);
    });

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();

  const btnBase = {
    width: 36,
    height: 36,
    border: "1px solid #e2e8f0",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
    fontSize: 20,
    lineHeight: 1,
    transition: "all 0.2s",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Cinzel:wght@400;500&display=swap');
      `}</style>

      <div
        style={{
          background: "#ffffff",
         // borderRadius: 24,
          border: "1px solid #e2e8f0",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.04)",
          padding: "28px 28px 22px",
          width: 300,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative top border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background:
              "linear-gradient(90deg, transparent, #3b82f6, transparent)",
            pointerEvents: "none",
          }}
        />

        {/* ── Month Navigation ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 22,
          }}
        >
          <button
            style={btnBase}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.color = "#1e293b";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#64748b";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
            onClick={handlePrev}
          >
            ‹
          </button>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "0.04em",
              }}
            >
              {MONTH_NAMES[viewMonth]}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#94a3b8",
                letterSpacing: "0.22em",
                marginTop: 2,
                fontFamily: "'Cinzel', serif",
              }}
            >
              {viewYear}
            </div>
          </div>

          <button
            style={btnBase}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.color = "#1e293b";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#64748b";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
            onClick={handleNext}
          >
            ›
          </button>
        </div>

        {/* ── Weekday Labels ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            marginBottom: 6,
          }}
        >
          {WEEKDAY_LABELS.map((d) => (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: 9,
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                paddingBottom: 8,
                borderBottom: "1px solid #f1f5f9",
                fontFamily: "'Cinzel', serif",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* ── Day Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 3,
            marginTop: 8,
          }}
        >
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <div key={`blank-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const day = idx + 1;
            const date = new Date(viewYear, viewMonth, day);
            date.setHours(0, 0, 0, 0);

            const isPast = date < min;
            const isSelected =
              selected && date.toDateString() === selected.toDateString();
            const isToday = date.toDateString() === today.toDateString();
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;

            return (
              <button
                key={day}
                disabled={isPast}
                onClick={() => !isPast && onChange(date)}
                style={{
                  aspectRatio: "1",
                  borderRadius: "50%",
                  border: isSelected
                    ? "2px solid #3b82f6"
                    : isToday
                      ? "1.5px dashed #3b82f680"
                      : "2px solid transparent",
                  background: isSelected
                    ? "linear-gradient(135deg, #3b82f6, #1d4ed8)"
                    : "transparent",
                  color: isSelected
                    ? "#fff"
                    : isPast
                      ? "#cbd5e1"
                      : isToday
                        ? "#3b82f6"
                        : isWeekend
                          ? "#64748b"
                          : "#0f172a",
                  cursor: isPast ? "not-allowed" : "pointer",
                  fontSize: 13,
                  fontWeight: isSelected || isToday ? 700 : 500,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  transition: "all 0.15s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isSelected
                    ? "0 4px 12px rgba(59,130,246,0.35)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isPast && !isSelected) {
                    e.currentTarget.style.background = "#eff6ff";
                    e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
                    e.currentTarget.style.color = "#3b82f6";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isPast && !isSelected) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.color = isToday
                      ? "#3b82f6"
                      : isWeekend
                        ? "#64748b"
                        : "#0f172a";
                  }
                }}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* ── Selected Date display ── */}
        {selected && (
          <div
            style={{
              marginTop: 18,
              padding: "10px 14px",
              background: "#eff6ff",
              borderRadius: 12,
              border: "1px solid #bfdbfe",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "#3b82f6",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "'Cinzel', serif",
                }}
              >
                Selected
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#0f172a",
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                {selected.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>
                {WEEKDAY_FULL[selected.getDay()]}
              </div>
            </div>
            <button
              onClick={() => onChange(null)}
              style={{
                background: "none",
                border: "1px solid #bfdbfe",
                borderRadius: 8,
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: 11,
                color: "#64748b",
                fontFamily: "'Cormorant Garamond', serif",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.color = "#3b82f6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#bfdbfe";
                e.currentTarget.style.color = "#64748b";
              }}
            >
              ✕ Clear
            </button>
          </div>
        )}

        {/* ── Today Shortcut ── */}
        <button
          onClick={() => onChange(new Date(today))}
          style={{
            marginTop: 12,
            width: "100%",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            color: "#94a3b8",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "'Cinzel', serif",
            padding: "6px 0",
            borderRadius: 10,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#3b82f6";
            e.currentTarget.style.background = "#eff6ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#94a3b8";
            e.currentTarget.style.background = "none";
          }}
        >
          ✦ Today
        </button>
      </div>
    </>
  );
}
