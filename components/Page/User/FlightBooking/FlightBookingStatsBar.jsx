
"use client";

import { Ticket, CheckCircle2, Clock, Wallet } from "lucide-react";

export default function FlightBookingStatsBar({ bookings = [] }) {
  const total = bookings.length;
  const paid = bookings.filter((b) => b.payment_status === "paid").length;
  const unpaid = bookings.filter((b) => b.payment_status === "unpaid").length;
  const totalAmount = bookings.reduce((s, b) => s + Number(b.total_amount), 0);

  const stats = [
    {
      Icon: Ticket,
      label: "Total Bookings",
      value: total,
      iconCls: "text-blue-500   bg-blue-50",
    },
    {
      Icon: CheckCircle2,
      label: "Paid",
      value: paid,
      iconCls: "text-emerald-500 bg-emerald-50",
    },
    {
      Icon: Clock,
      label: "Unpaid",
      value: unpaid,
      iconCls: "text-amber-500  bg-amber-50",
    },
    {
      Icon: Wallet,
      label: "Total Amount",
      value: `৳${totalAmount.toLocaleString()}`,
      iconCls: "text-violet-500 bg-violet-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map(({ Icon, label, value, iconCls }) => (
        <div
          key={label}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm"
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${iconCls}`}
          >
            <Icon size={18} strokeWidth={2} />
          </div>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          <p className="text-xs text-slate-400 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}
