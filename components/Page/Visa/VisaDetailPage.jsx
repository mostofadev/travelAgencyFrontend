// components/Page/Visa/VisaDetailPage.jsx
"use client";

import Link from "next/link";
import {
  Clock,
  Globe,
  LogIn,
  CalendarDays,
  Home,
  CheckCircle2,
  HelpCircle,
  MapPin,
  ArrowLeft,
  Tag,
  ChevronDown,
} from "lucide-react";
import Button from "@/components/ui/Button";
import VisaSelector from "./VisaSelector";

const TYPE_COLORS = {
  Work: "bg-violet-100 text-violet-700 border-violet-300",
  Tourist: "bg-emerald-100 text-emerald-700 border-emerald-300",
  Student: "bg-blue-100 text-blue-700 border-blue-300",
  Business: "bg-amber-100 text-amber-700 border-amber-300",
  Transit: "bg-red-100 text-red-700 border-red-300",
  default: "bg-slate-100 text-slate-500 border-slate-300",
};

function StatCard({ icon: IconComp, label, value, accent = false }) {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-2 ${
        accent
          ? "bg-primary shadow-lg shadow-violet-200 border-0"
          : "bg-white border border-slate-100 shadow-sm"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
          accent ? "bg-white/20" : "bg-slate-50"
        }`}
      >
        <IconComp
          size={17}
          className={accent ? "text-white" : "text-primary"}
        />
      </div>
      <p
        className={`text-[10px] font-bold uppercase tracking-widest ${
          accent ? "text-white/70" : "text-slate-400"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-[15px] font-bold leading-tight ${
          accent ? "text-white" : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function FaqItem({ question, answer }) {
  return (
    <details className="border-b border-slate-100 group">
      <summary className="flex items-center justify-between gap-3 py-4 cursor-pointer list-none select-none">
        <span className="flex items-center gap-3 text-sm font-semibold text-slate-800">
          <HelpCircle size={16} className="text-primary shrink-0" />
          {question}
        </span>
        <ChevronDown
          size={16}
          className="text-slate-400 shrink-0 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <p className="pb-4 pl-7 text-[13px] text-slate-500 leading-relaxed">
        {answer}
      </p>
    </details>
  );
}

function RelatedCard({ visa }) {
  const amount = parseFloat(visa.base_fee ?? 0);
  const currency = visa.currency ?? "BDT";
  const tcClass = TYPE_COLORS[visa.visa_type?.name] ?? TYPE_COLORS.default;

  return (
    <Link href={`/visa/${visa.id}`} className="group block no-underline">
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
        <div className="relative h-32 overflow-hidden">
          <img
            src={visa.image_url}
            alt={visa.visa_title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 to-transparent" />
          {visa.destination_country?.name && (
            <span className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-bold text-slate-800">
              <MapPin size={10} /> {visa.destination_country.name}
            </span>
          )}
        </div>
        <div className="p-3">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border mb-2 ${tcClass}`}
          >
            <Tag size={9} /> {visa.visa_type?.name}
          </span>
          <p className="text-[13px] font-bold text-slate-800 leading-snug mb-2 line-clamp-2">
            {visa.visa_title}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400">
              {visa.processing_min_days}–{visa.processing_max_days} days
            </span>
            <span className="text-[12px] font-bold text-primary">
              {currency}{" "}
              {amount.toLocaleString("en-BD", { minimumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function VisaDetailPage({ visa: v, related = [] }) {
  if (!v) return null;

  const tcClass = TYPE_COLORS[v.visa_type?.name] ?? TYPE_COLORS.default;
  const fee = parseFloat(v.base_fee ?? 0);
  const currency = v.currency ?? "BDT";

  const isOptional = (val) => val === true || val === 1;

  const requirements = v.requirements ?? [];
  const faqs = v.faqs ?? [];

  const quickInfo = [
    {
      label: "Processing",
      value: `${v.processing_min_days}–${v.processing_max_days} days`,
    },
    { label: "Entry", value: v.entry_type },
    { label: "Mode", value: v.visa_mode },
    { label: "Validity", value: `${v.validity_days} days` },
    { label: "Max Stay", value: v.max_stay_label ?? `${v.max_stay_days} days` },
  ];

  return (
    <div className="bg-slate-50 pb-16">
      {/* ── Hero ── */}
      <div className="relative h-[360px] overflow-hidden">
        <img
          src={v.image_url}
          alt={v.visa_title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/25 to-slate-900/75" />

        <Link
          href="/visa"
          className="absolute top-5 left-5 flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 rounded-xl px-3 py-2 text-xs font-semibold text-white no-underline transition-all"
        >
          <ArrowLeft size={14} /> Back to Visas
        </Link>

        <div className="absolute bottom-7 left-0 right-0 px-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span
              className={`inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${tcClass}`}
            >
              {v.visa_type?.name}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-bold bg-white/15 backdrop-blur-sm text-white">
              <MapPin size={10} /> {v.country?.name}
            </span>
          </div>
          <h1 className="text-[clamp(22px,4vw,34px)] font-extrabold text-white leading-tight m-0">
            {v.visa_title}
          </h1>
          <p className="mt-1.5 text-xs text-white/60 font-mono">
            #{v.visa_code}
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className=" px-5 pt-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-6">
          {/* LEFT */}
          <div className="flex flex-col gap-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatCard
                icon={Clock}
                label="Processing"
                value={`${v.processing_min_days}–${v.processing_max_days} days`}
              />
              <StatCard
                icon={Globe}
                label="Visa Mode"
                value={v.visa_mode ?? "—"}
              />
              <StatCard
                icon={LogIn}
                label="Entry Type"
                value={v.entry_type ?? "—"}
              />
              <StatCard
                icon={CalendarDays}
                label="Validity"
                value={`${v.validity_days} days`}
              />
              <StatCard
                icon={Home}
                label="Max Stay"
                value={v.max_stay_label ?? `${v.max_stay_days} days`}
              />
              <StatCard
                icon={Tag}
                label="Starting Fee"
                value={`${currency} ${fee.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`}
                accent
              />
            </div>

            {/* Description */}
            {v.description && (
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-800 mb-3">
                  Overview
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {v.description}
                </p>
              </div>
            )}

            {/* Notes */}
            {v.notes && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
                <span className="text-xl shrink-0">📋</span>
                <div>
                  <p className="text-[13px] font-bold text-amber-800 mb-1">
                    Important Notes
                  </p>
                  <p className="text-[13px] text-amber-700 leading-relaxed">
                    {v.notes}
                  </p>
                </div>
              </div>
            )}

            {/* Requirements */}
            {requirements.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-800 mb-1">
                  Required Documents
                </h2>
                <p className="text-xs text-slate-400 mb-4">
                  {requirements.length} document
                  {requirements.length > 1 ? "s" : ""} required
                </p>
                <div className="flex flex-col gap-2.5">
                  {requirements.map((req) => {
                    const optional = isOptional(req.is_optional);
                    return (
                      <div
                        key={req.id}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                          optional
                            ? "bg-slate-50 border-slate-200"
                            : "bg-emerald-50 border-emerald-200"
                        }`}
                      >
                        <div
                          className={`w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 ${
                            optional ? "bg-slate-200" : "bg-emerald-500"
                          }`}
                        >
                          <CheckCircle2
                            size={13}
                            className={
                              optional ? "text-slate-400" : "text-white"
                            }
                          />
                        </div>
                        <span className="text-[13px] font-semibold text-slate-800 capitalize flex-1">
                          {req.title}
                        </span>
                        {optional && (
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            Optional
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-800 mb-0.5">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-slate-400 mb-4">
                  {faqs.length} questions answered
                </p>
                {faqs.map((faq) => (
                  <FaqItem
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            )}
          </div>
          <VisaSelector visaId={v.id} data={v} />
        </div>

        {/* Related Visas */}
        {related.length > 0 && (
          <div className="mt-12">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">
                  Related Visas
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  You might also be interested in
                </p>
              </div>
              <Link
                href="/visa"
                className="text-xs font-bold text-violet-600 hover:text-violet-800 no-underline transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((rv) => (
                <RelatedCard key={rv.id} visa={rv} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
