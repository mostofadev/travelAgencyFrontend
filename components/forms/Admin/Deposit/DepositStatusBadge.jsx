"use client";

import { Clock, BadgeCheck, Ban } from "lucide-react";

const STATUS_MAP = {
  pending: {
    label: "Pending",
    class: "bg-amber-50 text-amber-700 border-amber-200",
    icon: <Clock className="w-3 h-3" />,
  },
  approved: {
    label: "Approved",
    class: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: <BadgeCheck className="w-3 h-3" />,
  },
  rejected: {
    label: "Rejected",
    class: "bg-red-50 text-red-700 border-red-200",
    icon: <Ban className="w-3 h-3" />,
  },
};

export default function DepositStatusBadge({ status }) {
  const cfg = STATUS_MAP[status] ?? STATUS_MAP.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.class}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}
