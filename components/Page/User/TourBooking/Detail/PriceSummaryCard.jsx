"use client";

import { ReceiptText } from "lucide-react";

const fmt = (amount, currency = "BDT") =>
  `${currency} ${parseFloat(amount).toLocaleString("en-BD", { minimumFractionDigits: 2 })}`;

export default function PriceSummaryCard({ booking }) {
  const {
    base_amount,
    addon_amount,
    discount_amount,
    total_price,
    currency,
    special_requests,
  } = booking;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
        <ReceiptText size={15} className="text-primary" />
        <h3 className="text-sm font-semibold text-slate-700">Price Summary</h3>
      </div>

      <div className="px-5 py-4 space-y-3">
        <PriceRow label="Base Amount" value={fmt(base_amount, currency)} />
        <PriceRow label="Add-on Amount" value={fmt(addon_amount, currency)} />
        <PriceRow
          label="Discount"
          value={`- ${fmt(discount_amount, currency)}`}
          valueClass="text-red-500"
        />
        <div className="border-t border-dashed border-slate-200 pt-3">
          <PriceRow
            label="Total Price"
            value={fmt(total_price, currency)}
            labelClass="font-bold text-slate-800"
            valueClass="font-bold text-primary text-base"
          />
        </div>
      </div>

      {special_requests && (
        <div className="px-5 pb-4">
          <p className="text-xs text-slate-400 mb-1">Special Requests</p>
          <p className="text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
            {special_requests}
          </p>
        </div>
      )}
    </div>
  );
}

function PriceRow({ label, value, labelClass = "", valueClass = "" }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm text-slate-500 ${labelClass}`}>{label}</span>
      <span className={`text-sm text-slate-700 ${valueClass}`}>{value}</span>
    </div>
  );
}