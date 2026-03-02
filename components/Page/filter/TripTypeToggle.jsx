"use client";

// components/filter/TripTypeToggle.jsx
// ─────────────────────────────────────────────────────────────────────────────
// "One Way" এবং "Round Trip" toggle button।
// Active option টি white background এ highlight হয়।
//
// Props:
//   value     → "One Way" বা "Round Trip"
//   onChange  → click করলে নতুন value পাঠায়
// ─────────────────────────────────────────────────────────────────────────────

const TRIP_TYPES = ["One Way", "Round Trip"];

export default function TripTypeToggle({ value, onChange }) {
  return (
    <div className="flex gap-1 p-1 bg-slate-100 rounded-xl self-start">
      {TRIP_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`
            px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider
            transition-all duration-200
            ${
              value === type
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }
          `}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
