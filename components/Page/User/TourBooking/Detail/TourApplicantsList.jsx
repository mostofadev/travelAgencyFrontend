"use client";

import { User, Phone, Mail, Star } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const passengerTypeBadge = {
  adult: "bg-primary/10 text-primary",
  child: "bg-amber-50 text-amber-600",
  infant: "bg-purple-50 text-purple-600",
};

export default function TourApplicantsList({ applicants }) {
  if (!applicants?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Passengers</h3>
        <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full font-medium">
          {applicants.length} {applicants.length === 1 ? "person" : "people"}
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {applicants.map((applicant) => (
          <ApplicantRow key={applicant.id} applicant={applicant} />
        ))}
      </div>
    </div>
  );
}

function ApplicantRow({ applicant }) {
  const {
    full_name,
    passenger_type,
    gender,
    date_of_birth,
    passport_no,
    passport_expiry,
    nationality,
    email,
    mobile_number,
    emergency_contact,
    emergency_contact_relation,
    is_primary,
    special_needs,
  } = applicant;

  return (
    <div className="px-5 py-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <User size={15} className="text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-slate-800">{full_name}</p>
            {is_primary && (
              <span className="inline-flex items-center gap-0.5 text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-medium">
                <Star size={9} fill="white" /> Primary
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 capitalize">
            {gender} · {nationality}
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${passengerTypeBadge[passenger_type] ?? "bg-slate-100 text-slate-500"}`}
        >
          {passenger_type}
        </span>
      </div>

      {/* Passport Details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 mb-4">
        <Detail label="Date of Birth" value={formatDate(date_of_birth)} />
        <Detail label="Passport No" value={passport_no} />
        <Detail label="Passport Expiry" value={formatDate(passport_expiry)} />
        {email && <Detail label="Email" value={email} />}
        {mobile_number && <Detail label="Mobile" value={mobile_number} />}
        {special_needs && (
          <Detail label="Special Needs" value={special_needs} />
        )}
      </div>

      {/* Emergency Contact */}
      {emergency_contact && (
        <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
          <Phone size={13} className="text-primary shrink-0" />
          <div>
            <p className="text-xs text-slate-400">Emergency Contact</p>
            <p className="text-sm font-medium text-slate-700">
              {emergency_contact}
              {emergency_contact_relation && (
                <span className="text-slate-400 font-normal ml-1.5">
                  ({emergency_contact_relation})
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-700">{value ?? "—"}</p>
    </div>
  );
}
