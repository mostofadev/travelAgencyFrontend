"use client";

import { Users, User, Baby } from "lucide-react";
import PassengerCard from "./PassengerCard";

export default function PassengersList({ passengersCount, passengers = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <h2 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
        <Users size={18} className="text-blue-500" />
        Passengers ({passengersCount?.total ?? passengers.length})
      </h2>

      {/* Summary pills */}
      <div className="flex gap-2 flex-wrap mb-5">
        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 text-sm font-medium">
          <User size={13} />
          {passengersCount?.adults ?? 0} Adult
          {passengersCount?.adults !== 1 ? "s" : ""}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100 text-sm font-medium">
          <Users size={13} />
          {passengersCount?.children ?? 0} Child
          {passengersCount?.children !== 1 ? "ren" : ""}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-700 px-3 py-1 rounded-full border border-pink-100 text-sm font-medium">
          <Baby size={13} />
          {passengersCount?.infants ?? 0} Infant
          {passengersCount?.infants !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {passengers.map((p) => (
          <PassengerCard key={p.id} passenger={p} />
        ))}
      </div>
    </div>
  );
}
