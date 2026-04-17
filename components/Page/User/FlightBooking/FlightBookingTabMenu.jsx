"use client";

import { LayoutGrid, Clock, CheckCircle2, XCircle } from "lucide-react";

const TABS = [
  { value: "all", label: "All", Icon: LayoutGrid },
  { value: "pending", label: "Pending", Icon: Clock },
  { value: "confirmed", label: "Confirmed", Icon: CheckCircle2 },
  { value: "cancelled", label: "Cancelled", Icon: XCircle },
];

export default function FlightBookingTabMenu({ activeTab, onChange }) {
  return (
    <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div
        className="flex gap-1 bg-slate-100 p-1 rounded-xl"
        style={{ minWidth: "max-content" }}
      >
        {TABS.map(({ value, label, Icon }) => {
          const isActive = activeTab === value;
          return (
            <button
              key={value}
              onClick={() => onChange(value)}
              className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon size={14} strokeWidth={2} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
