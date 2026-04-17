
"use client";

import {
  Clock,
  CheckCircle2,
  XCircle,
  CreditCard,
  AlertCircle,
} from "lucide-react";

const STATUS_MAP = {
  pending: {
    label: "Pending",
    Icon: Clock,
    cls: "bg-amber-50   text-amber-700   border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    Icon: CheckCircle2,
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  cancelled: {
    label: "Cancelled",
    Icon: XCircle,
    cls: "bg-red-50     text-red-700     border-red-200",
  },
};

const PAYMENT_MAP = {
  paid: {
    label: "Paid",
    Icon: CreditCard,
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  unpaid: {
    label: "Unpaid",
    Icon: AlertCircle,
    cls: "bg-amber-50   text-amber-700   border-amber-200",
  },
};

export function BookingStatusBadge({ status }) {
  const cfg = STATUS_MAP[status] ?? {
    label: status,
    Icon: Clock,
    cls: "bg-gray-100 text-gray-600 border-gray-200",
  };
  const { Icon } = cfg;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize ${cfg.cls}`}
    >
      <Icon size={11} strokeWidth={2.5} />
      {cfg.label}
    </span>
  );
}

export function PaymentStatusBadge({ status }) {
  const cfg = PAYMENT_MAP[status] ?? {
    label: status,
    Icon: AlertCircle,
    cls: "bg-gray-100 text-gray-600 border-gray-200",
  };
  const { Icon } = cfg;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize ${cfg.cls}`}
    >
      <Icon size={11} strokeWidth={2.5} />
      {cfg.label}
    </span>
  );
}
