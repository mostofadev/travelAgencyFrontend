"use client";

import { UserCheck, User, Baby } from "lucide-react";

function Badge({ icon: Icon, label, sublabel, count, color, textColor }) {
  if (!count || count === 0) return null;
  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${color}`}
    >
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center bg-white/60`}
      >
        <Icon size={13} className={textColor} />
      </div>
      <div>
        <p className={`text-[14px] font-black m-0 ${textColor}`}>{count}</p>
        <p className={`text-[10px] font-medium m-0 opacity-70 ${textColor}`}>
          {label}
        </p>
        <p className={`text-[9px] m-0 opacity-50 ${textColor}`}>{sublabel}</p>
      </div>
    </div>
  );
}

// adults, children, infants — number
export default function CheckoutPassengerCard({
  adults = 0,
  children = 0,
  infants = 0,
  className = "",
}) {
  const total = adults + children + infants;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 overflow-hidden ${className}`}
    >
      <div className="bg-slate-50 px-5 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <UserCheck size={13} className="text-primary" />
          </div>
          <span className="text-[13px] font-bold text-primary">Passengers</span>
        </div>
        <span className="text-[11px] text-slate-400 bg-white border border-slate-100 px-2.5 py-1 rounded-full">
          {total} total
        </span>
      </div>
      <div className="px-5 py-4 flex gap-3 flex-wrap">
        <Badge
          icon={UserCheck}
          label="Adults"
          sublabel="Age 12+"
          count={adults}
          color="border-blue-100 bg-blue-50"
          textColor="text-blue-700"
        />
        <Badge
          icon={User}
          label="Children"
          sublabel="Age 2–11"
          count={children}
          color="border-amber-100 bg-amber-50"
          textColor="text-amber-700"
        />
        <Badge
          icon={Baby}
          label="Infants"
          sublabel="Under 2"
          count={infants}
          color="border-purple-100 bg-purple-50"
          textColor="text-purple-700"
        />
      </div>
    </div>
  );
}
