
"use client";

import {
  User,
  Baby,
  Users,
  Venus,
  Mars,
  CalendarDays,
  Globe,
  Armchair,
  BookOpen,
  CalendarCheck,
  Mail,
  Phone,
} from "lucide-react";

const TYPE_CONFIG = {
  adult: {
    label: "Adult",
    Icon: User,
    badge: "bg-blue-50   text-blue-700   border-blue-200",
  },
  child: {
    label: "Child",
    Icon: Users,
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  infant: {
    label: "Infant",
    Icon: Baby,
    badge: "bg-pink-50   text-pink-700   border-pink-200",
  },
};

const GENDER_ICON = { male: Mars, female: Venus };

export default function PassengerCard({ passenger: p }) {
  const typeCfg = TYPE_CONFIG[p.passenger_type] ?? TYPE_CONFIG.adult;
  const TypeIcon = typeCfg.Icon;
  const GenderIcon = GENDER_ICON[p.gender] ?? User;

  const fields = [
    { Icon: GenderIcon, label: "Gender", value: p.gender },
    {
      Icon: CalendarDays,
      label: "Date of Birth",
      value: p.date_of_birth
        ? new Date(p.date_of_birth).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "-",
    },
    { Icon: Globe, label: "Nationality", value: p.nationality?.name ?? "N/A" },
    { Icon: Armchair, label: "Seat", value: p.seat_number ?? "Not assigned" },
    { Icon: BookOpen, label: "Passport No", value: p.passport_no ?? "N/A" },
    {
      Icon: CalendarCheck,
      label: "Passport Expiry",
      value: p.passport_expiry ?? "N/A",
    },
    ...(p.email ? [{ Icon: Mail, label: "Email", value: p.email }] : []),
    ...(p.phone ? [{ Icon: Phone, label: "Phone", value: p.phone }] : []),
  ];

  return (
    <div
      className={`relative bg-white rounded-2xl border p-5 ${p.is_primary ? "border-blue-200 ring-1 ring-blue-100" : "border-slate-100"}`}
    >
      {p.is_primary && (
        <span className="absolute -top-2.5 left-4 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
          PRIMARY
        </span>
      )}

      {/* Avatar + name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <TypeIcon size={20} className="text-slate-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 truncate">{p.full_name}</p>
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${typeCfg.badge}`}
          >
            <TypeIcon size={10} strokeWidth={2.5} />
            {typeCfg.label}
          </span>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-2">
        {fields.map(({ Icon, label, value }) => (
          <div key={label} className="bg-slate-50 rounded-xl p-2.5">
            <p className="text-[10px] text-slate-400 mb-0.5 flex items-center gap-1">
              <Icon size={10} /> {label}
            </p>
            <p className="text-xs font-semibold text-slate-700 truncate">
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
