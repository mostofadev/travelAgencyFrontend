"use client";
// ============================================
// VisaCard.jsx — Visa Information Card
// ============================================

import { useState } from "react";
import { formatPrice } from "@/lib/helpers";

export default function VisaCard({ visa, onSelect }) {
  const [expanded, setExpanded] = useState(false);

  const mandatory = visa.requirements?.filter((r) => !r.is_optional) ?? [];
  const optional = visa.requirements?.filter((r) => r.is_optional) ?? [];

  return (
    <div
      className="rounded-2xl border border-primary/20 bg-white overflow-hidden
                    transition-all duration-300 hover:border-primary/40
                    hover:shadow-md hover:shadow-primary/10"
    >
      {/* Header */}
      <div
        className="bg-gradient-to-r from-primary/5 to-primary/10 p-3
                      flex items-start justify-between gap-2"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-base">🛂</span>
            <h4 className="text-xs font-semibold text-gray-800 truncate">
              {visa.visa_title}
            </h4>
          </div>
          <p className="text-[10px] text-gray-400">
            {visa.origin_country} → {visa.destination_country}
          </p>
          <span
            className="inline-block mt-1 text-[9px] bg-primary/10
                           text-primary px-2 py-0.5 rounded-full font-medium"
          >
            {visa.visa_type}
          </span>
        </div>

        {/* Fee */}
        <div className="text-right flex-shrink-0">
          <p className="text-[9px] text-gray-400">Fee</p>
          <p className="text-sm font-bold text-primary">
            {formatPrice(visa.base_fee, visa.currency)}
          </p>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 gap-px bg-gray-100 border-t border-gray-100">
        {[
          {
            icon: "⏱️",
            label: "Processing",
            value: `${visa.processing_min_days}-${visa.processing_max_days} days`,
          },
          {
            icon: "📅",
            label: "Validity",
            value: `${visa.validity_days} days`,
          },
          { icon: "🔄", label: "Entry", value: visa.entry_type },
          { icon: "📱", label: "Mode", value: visa.visa_mode },
        ].map((item, i) => (
          <div key={i} className="bg-white p-2 flex items-center gap-1.5">
            <span className="text-xs">{item.icon}</span>
            <div>
              <p className="text-[9px] text-gray-400">{item.label}</p>
              <p className="text-[10px] font-medium text-gray-700 capitalize">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Documents — Expandable */}
      {mandatory.length > 0 && (
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between
                       text-[10px] font-semibold text-gray-600
                       hover:text-primary transition-colors"
          >
            <span>📋 Required Documents ({mandatory.length})</span>
            <span
              className={`transition-transform duration-200
                             ${expanded ? "rotate-180" : ""}`}
            >
              ▾
            </span>
          </button>

          {expanded && (
            <div className="mt-2 space-y-1">
              {mandatory.map((req, i) => (
                <div
                  key={i}
                  className="flex items-start gap-1.5 text-[10px] text-gray-600"
                >
                  <span className="text-green-500 mt-0.5 flex-shrink-0">
                    ✅
                  </span>
                  <span>{req.title}</span>
                </div>
              ))}
              {optional.map((req, i) => (
                <div
                  key={i}
                  className="flex items-start gap-1.5 text-[10px] text-gray-400"
                >
                  <span className="mt-0.5 flex-shrink-0">⭕</span>
                  <span>{req.title} (ঐচ্ছিক)</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Apply Button */}
      <div className="p-3 pt-0">
        <button
          onClick={() => onSelect(visa)}
          className="w-full bg-primary text-white text-[11px] font-semibold
                     py-2 rounded-xl hover:bg-primary/90 active:scale-95
                     transition-all duration-200"
        >
          এই ভিসা সম্পর্কে জানতে চাই →
        </button>
      </div>
    </div>
  );
}
