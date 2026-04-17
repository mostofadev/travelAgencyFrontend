// components/Page/User/VisaApplication/VisaApplicationStatsBar.jsx
"use client";

import { FileCheck, Clock, XCircle, Users } from "lucide-react";

export default function VisaApplicationStatsBar({ applications = [] }) {
  const validApplications = Array.isArray(applications) ? applications : [];

  const stats = {
    total: validApplications.length,
    pending: validApplications.filter((a) => a.current_status === "pending")
      .length,
    approved: validApplications.filter((a) => a.current_status === "approved")
      .length,
    rejected: validApplications.filter((a) => a.current_status === "rejected")
      .length,
  };

  const cards = [
    {
      label: "Total Applications",
      value: stats.total,
      icon: Users,
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      border: "border-yellow-200",
    },
    {
      label: "Approved",
      value: stats.approved,
      icon: FileCheck,
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`${card.bg} ${card.border} border rounded-2xl p-4 transition-all hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  {card.label}
                </p>
                <p className={`text-2xl font-bold ${card.text}`}>
                  {card.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}
              >
                <Icon size={24} className={card.text} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
