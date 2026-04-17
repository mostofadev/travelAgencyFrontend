"use client";

import { Wallet, AlertCircle, CheckCircle2 } from "lucide-react";

function BkashLogo() {
  return (
    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#e2136e] flex-shrink-0">
      <span className="text-white text-[8px] font-black">bKash</span>
    </div>
  );
}

function PayOption({ id, selected, onSelect, disabled, children }) {
  return (
    <button
      onClick={() => !disabled && onSelect(id)}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all
        ${
          disabled
            ? "border-slate-100 bg-slate-50 cursor-not-allowed opacity-50"
            : selected
              ? "border-primary bg-primary/5 cursor-pointer"
              : "border-slate-200 bg-white hover:border-primary/40 cursor-pointer"
        }`}
    >
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
        ${selected ? "border-primary" : "border-slate-300"}`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-primary" />}
      </div>
      {children}
    </button>
  );
}


export default function CheckoutPaymentSelector({
  selected,
  onSelect,
  walletBalance = 0,
  totalAmount = 0,
  className = "",
}) {
  const balance = parseFloat(walletBalance) || 0;
  const hasEnough = balance >= totalAmount;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 overflow-hidden ${className}`}
    >
      <div className="bg-slate-50 px-5 py-3 border-b border-slate-100">
        <span className="text-[13px] font-bold text-primary">
          Payment method
        </span>
      </div>
      <div className="px-5 py-4 space-y-2.5">
        {/* bKash */}
        <PayOption
          id="bkash"
          selected={selected === "bkash"}
          onSelect={onSelect}
          disabled={false}
        >
          <BkashLogo />
          <div className="flex-1">
            <p className="text-[13px] font-bold text-slate-800 m-0">bKash</p>
            <p className="text-[11px] text-slate-400 m-0">
              Mobile banking payment
            </p>
          </div>
          {selected === "bkash" && (
            <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
          )}
        </PayOption>

        {/* Wallet */}
        <PayOption
          id="wallet"
          selected={selected === "wallet"}
          onSelect={onSelect}
          disabled={!hasEnough}
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
            ${hasEnough ? "bg-emerald-100" : "bg-slate-100"}`}
          >
            <Wallet
              size={16}
              className={hasEnough ? "text-emerald-600" : "text-slate-400"}
            />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-bold text-slate-800 m-0">Wallet</p>
            <p
              className={`text-[11px] m-0 ${hasEnough ? "text-emerald-600" : "text-red-400"}`}
            >
              ৳ {balance.toLocaleString("en-BD")} available
            </p>
          </div>
          {!hasEnough && (
            <span className="text-[9px] font-bold bg-red-50 text-red-500 px-2 py-1 rounded-md flex-shrink-0">
              Insufficient
            </span>
          )}
          {selected === "wallet" && hasEnough && (
            <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
          )}
        </PayOption>

        {/* Insufficient hint */}
        {!hasEnough && (
          <p className="text-[11px] text-slate-400 flex items-center gap-1 m-0 pt-1">
            <AlertCircle size={11} />
            Add ৳ {(totalAmount - balance).toLocaleString("en-BD")} more to use
            wallet
          </p>
        )}
      </div>
    </div>
  );
}
