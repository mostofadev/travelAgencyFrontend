"use client";

import { User, FileText, ExternalLink } from "lucide-react";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const docTypeLabels = {
  1: "Passport Copy",
  2: "Photo",
  3: "Supporting Document",
};

export default function ApplicantsList({ applicants }) {
  if (!applicants?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Applicants</h3>
        <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full font-medium">
          {applicants.length} {applicants.length === 1 ? "person" : "people"}
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {applicants.map((applicant, index) => (
          <ApplicantRow
            key={applicant.id}
            applicant={applicant}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function ApplicantRow({ applicant, index }) {
  const {
    first_name,
    last_name,
    gender,
    date_of_birth,
    passport_type,
    passport_no,
    passport_expiry,
    profession,
    city,
    address,
    documents,
  } = applicant;

  return (
    <div className="px-5 py-5">
      {/* Applicant Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <User size={15} className="text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">
            {first_name} {last_name}
          </p>
          <p className="text-xs text-slate-400 capitalize">
            {gender} · {profession}
          </p>
        </div>
        <span className="ml-auto text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full capitalize">
          {passport_type} passport
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 mb-4">
        <Detail label="Date of Birth" value={formatDate(date_of_birth)} />
        <Detail label="Passport No" value={passport_no} />
        <Detail label="Passport Expiry" value={formatDate(passport_expiry)} />
        <Detail label="City" value={city} />
        <Detail label="Address" value={address} />
      </div>

      {/* Documents */}
      {documents?.length > 0 && (
        <div>
          <p className="text-xs text-primary font-medium mb-2 flex items-center gap-1">
            <FileText size={12} /> Documents
          </p>
          <div className="flex flex-wrap gap-2">
            {documents.map((doc) => (
              <a
                key={doc.id}
                href={doc.file_path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs bg-slate-50 border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                <FileText size={11} />
                {docTypeLabels[doc.document_type_id] ??
                  `Document ${doc.document_type_id}`}
                <ExternalLink size={10} className="opacity-50" />
              </a>
            ))}
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
