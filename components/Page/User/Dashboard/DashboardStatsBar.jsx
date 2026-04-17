"use client";

import { PlaneTakeoff, MapPin, Wallet, FileCheck } from "lucide-react";

export default function DashboardStatsBar({ stats = {}, isLoading = false }) {
  const cards = [
    {
      label: "Total Bookings",
      value: isLoading ? "—" : (stats?.totalBookings ?? 0),
      sub: "All time",
      bg: "#E6F1FB",
      iconColor: "#185FA5",
      icon: <PlaneTakeoff size={16} color="#185FA5" />,
    },
    {
      label: "Active Trips",
      value: isLoading ? "—" : (stats?.activeTrips ?? 0),
      badge: "In Progress",
      badgeBg: "#EAF3DE",
      badgeColor: "#3B6D11",
      bg: "#EAF3DE",
      icon: <MapPin size={16} color="#3B6D11" />,
    },
    {
      label: "Visa Applications",
      value: isLoading ? "—" : (stats?.visaCount ?? 0),
      badge: `${stats?.pendingVisa ?? 0} Pending`,
      badgeBg: "#EEEDFE",
      badgeColor: "#534AB7",
      bg: "#EEEDFE",
      icon: <FileCheck size={16} color="#534AB7" />,
    },
    {
      label: "Wallet Balance",
      value: isLoading ? "—" : `৳ ${stats?.walletBalance ?? "0"}`,
      sub: "Available",
      bg: "#FAEEDA",
      icon: <Wallet size={16} color="#854F0B" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-2"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: card.bg }}
          >
            {card.icon}
          </div>
          <p className="text-xs text-slate-400 font-medium">{card.label}</p>
          <p className="text-2xl font-semibold text-slate-800">{card.value}</p>
          {card.sub && <p className="text-xs text-slate-400">{card.sub}</p>}
          {card.badge && (
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-md w-fit"
              style={{ background: card.badgeBg, color: card.badgeColor }}
            >
              {card.badge}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
