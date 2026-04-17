"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TYPE_STYLE = {
  flight: { bg: "#E6F1FB", color: "#0C447C", label: "Flight" },
  visa: { bg: "#EEEDFE", color: "#3C3489", label: "Visa" },
  tour: { bg: "#EAF3DE", color: "#27500A", label: "Tour" },
};

const STATUS_STYLE = {
  pending: { bg: "#FAEEDA", color: "#854F0B" },
  approved: { bg: "#EAF3DE", color: "#3B6D11" },
  confirmed: { bg: "#EAF3DE", color: "#3B6D11" },
  cancelled: { bg: "#FCEBEB", color: "#A32D2D" },
  unpaid: { bg: "#FAEEDA", color: "#854F0B" },
};

const DETAIL_LINKS = {
  flight: (id) => `/user/flight/booking/${id}`,
  visa: (id) => `/user/visa/booking/${id}`,
  tour: (id) => `/user/tour/booking/${id}`,
};

export default function RecentBookingsTable({
  bookings = [],
  isLoading = false,
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <p className="text-sm font-semibold text-slate-800">Recent bookings</p>
        <Link
          href="/user/flight/booking"
          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>

      {isLoading ? (
        <div className="p-5 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse h-10 bg-slate-100 rounded-lg"
            />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-sm text-slate-400">No bookings yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {[
                  "Reference",
                  "Type",
                  "Destination",
                  "Date",
                  "Amount",
                  "Status",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[11px] font-medium text-slate-400 px-5 py-2.5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const type = TYPE_STYLE[b.type] ?? TYPE_STYLE.flight;
                const status = STATUS_STYLE[b.status] ?? STATUS_STYLE.pending;
                return (
                  <tr
                    key={`${b.type}-${b.id}`}
                    className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <span className="font-mono text-xs font-bold text-blue-600">
                        {b.ref ?? "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: type.bg, color: type.color }}
                      >
                        {type.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-700 max-w-[160px] truncate">
                      {b.destination}
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-400">
                      {b.date}
                    </td>
                    <td className="px-5 py-3 text-sm font-semibold text-slate-800">
                      ৳ {b.amount}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg capitalize"
                        style={{ background: status.bg, color: status.color }}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={DETAIL_LINKS[b.type]?.(b.id) ?? "#"}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        View <ArrowRight size={11} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
