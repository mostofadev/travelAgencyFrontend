"use client";

import { Mail, Phone } from "lucide-react";

export default function ContactInfoCard({ contact }) {
  if (!contact) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700">
          Contact Information
        </h3>
      </div>
      <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ContactRow
          icon={<Mail size={14} className="text-primary" />}
          label="Email"
          value={contact.email}
        />
        <ContactRow
          icon={<Phone size={14} className="text-primary
          " />}
          label="Phone"
          value={contact.phone_number}
        />
      </div>
    </div>
  );
}

function ContactRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );
}