"use client";

import Link from "next/link";
import { Send, FileCheck, Globe, CreditCard, User } from "lucide-react";

const actions = [
  {
    label: "Book Flight",
    sub: "Search routes",
    href: "/flight",
    bg: "#E6F1FB",
    iconColor: "#185FA5",
    icon: Send,
  },
  {
    label: "Apply Visa",
    sub: "New application",
    href: "/visa",
    bg: "#EEEDFE",
    iconColor: "#534AB7",
    icon: FileCheck,
  },
   
  {
    label: "Tour Package",
    sub: "Explore tours",
    href: "/tour",
    bg: "#EAF3DE",
    iconColor: "#3B6D11",
    icon: Globe,
  },
  {
    label: "Add Deposit",
    sub: "Top up wallet",
    href: "/user/deposit",
    bg: "#FAEEDA",
    iconColor: "#854F0B",
    icon: CreditCard,
  },
 
  {
    label: "My Profile",
    sub: "Edit details",
    href: "/user/settings/profile",
    bg: "#FAECE7",
    iconColor: "#993C1D",
    icon: User,
  },
];

export default function QuickActions() {
  return (
    <div>
      <p className="text-xs text-slate-400 font-medium mb-3">Quick actions</p>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-slate-200 hover:shadow-sm transition-all text-center group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: action.bg }}
              >
                <Icon size={18} color={action.iconColor} />
              </div>
              <p className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 leading-tight">
                {action.label}
              </p>
              <p className="text-[11px] text-slate-400 leading-tight">
                {action.sub}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
