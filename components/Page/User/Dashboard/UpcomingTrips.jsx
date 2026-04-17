"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const TYPE_COLORS = {
  Flight: { bg: "#E6F1FB", color: "#0C447C" },
  Tour: { bg: "#EAF3DE", color: "#3B6D11" },
  Visa: { bg: "#EEEDFE", color: "#534AB7" },
};

const DAYS_COLORS = [
  { bg: "#E6F1FB", color: "#0C447C" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#EEEDFE", color: "#534AB7" },
];

export default function UpcomingTrips({ trips = [], isLoading = false }) {
  if (isLoading) {
    return (
      <div>
        <p className="text-xs text-slate-400 font-medium mb-3">
          Upcoming trips
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-2xl p-4 animate-pulse h-32"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!trips?.length) {
    return (
      <div>
        <p className="text-xs text-slate-400 font-medium mb-3">
          Upcoming trips
        </p>
        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center">
          <p className="text-sm text-slate-400">No upcoming trips</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-slate-800">Upcoming trips</p>
        <Link
          href="/tour"
          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {trips.map((trip, i) => {
          const typeStyle = TYPE_COLORS[trip.type] ?? TYPE_COLORS.Flight;
          const dayStyle = DAYS_COLORS[i % DAYS_COLORS.length];
          return (
            <div
              key={trip.id}
              className="bg-white border border-slate-100 rounded-2xl p-4 hover:border-slate-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800 line-clamp-1">
                    {trip.destination}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <CalendarDays size={11} className="text-slate-400" />
                    <p className="text-xs text-slate-400">{trip.date}</p>
                  </div>
                </div>
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap ml-2"
                  style={{ background: dayStyle.bg, color: dayStyle.color }}
                >
                  {trip.days}d
                </span>
              </div>

              <div className="border-t border-slate-100 my-3" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-400">Type</p>
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-md mt-1 inline-block"
                    style={{ background: typeStyle.bg, color: typeStyle.color }}
                  >
                    {trip.type}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-slate-400">Amount</p>
                  <p className="text-sm font-semibold text-slate-800">
                    ৳ {trip.amount}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
