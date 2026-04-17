"use client";


import { Lock } from "lucide-react";

export default function CheckoutOrderSummary({
  rows = [],
  total = 0,
  onPay,
  isLoading = false,
  selectedMethod = null,
}) {
  const canPay = !!selectedMethod && !isLoading;

  return (
    <div className="bg-primary rounded-2xl p-5 text-white">
      <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-4 m-0">
        Order summary
      </p>

      <div className="space-y-2 mb-4">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex justify-between items-center text-[12px]"
          >
            <span className="text-white/60">{row.label}</span>
            <span className="font-semibold text-white">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-white/15 pt-4 mb-5">
        <div className="flex justify-between items-center">
          <span className="text-[12px] text-white/60">Total payable</span>
          <span className="text-[24px] font-black text-white">
            ৳ {Number(total).toLocaleString("en-BD")}
          </span>
        </div>
      </div>

      <button
        onClick={onPay}
        disabled={!canPay}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-bold transition-all
          ${
            canPay
              ? "bg-white text-primary hover:bg-white/90 active:scale-[0.98] cursor-pointer"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock size={13} />
            Pay Now
          </>
        )}
      </button>

      <p className="text-center text-[10px] text-white/30 mt-3 flex items-center justify-center gap-1 m-0">
        <Lock size={9} />
        Secured by SSLCommerz
      </p>
    </div>
  );
}
