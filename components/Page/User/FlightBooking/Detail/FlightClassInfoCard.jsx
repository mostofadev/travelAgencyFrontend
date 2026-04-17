"use client";

import {
  PlaneTakeoff,
  Banknote,
  Armchair,
  Tag,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function FlightClassInfoCard({ flightClass: fc }) {
  if (!fc) return null;

  const items = [
    { Icon: PlaneTakeoff, label: "Class", value: fc.class_name },
    {
      Icon: Banknote,
      label: "Base Fare",
      value: `${fc.currency} ${Number(fc.base_fare).toLocaleString()}`,
    },
    { Icon: Armchair, label: "Total Seats", value: fc.total_seats },
    { Icon: CheckCircle2, label: "Available", value: fc.seats_available },
    { Icon: XCircle, label: "Booked", value: fc.seats_booked },
    { Icon: Tag, label: "Fare Code", value: fc.fare_code },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
        <PlaneTakeoff size={18} className="text-blue-500" />
        Flight Class Details
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map(({ Icon, label, value }) => (
          <div key={label} className="bg-slate-50 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 mb-1 flex items-center gap-1">
              <Icon size={10} /> {label}
            </p>
            <p className="text-sm font-bold text-slate-800">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
