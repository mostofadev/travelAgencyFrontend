"use client";

import { Lock } from "lucide-react";

export default function CheckoutActionBar({
  totalAmount,
  selectedMethod,
  onPay,
  isLoading,
}) {
  const canPay = !!selectedMethod && !isLoading;

  return (
    <div className="bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-5 py-4">
      <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] text-slate-400 m-0">Total payable</p>
          <p className="text-[22px] font-black text-primary leading-none m-0">
            ৳ {Number(totalAmount).toLocaleString("en-BD")}
          </p>
        </div>

        <button
          onClick={onPay}
          disabled={!canPay}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold transition-all
            ${
              canPay
                ? "bg-primary text-white hover:opacity-90 active:scale-95 cursor-pointer"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <Lock size={13} />
              Pay Now
            </>
          )}
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-300 mt-2 m-0 flex items-center justify-center gap-1">
        <Lock size={9} />
        Secured by SSLCommerz
      </p>
    </div>
  );
}
