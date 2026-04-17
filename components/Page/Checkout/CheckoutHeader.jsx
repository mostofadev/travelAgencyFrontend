"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const STEPS = ["Search", "Passengers", "Payment", "Confirmation"];

export default function CheckoutHeader({ reference, currentStep = 3 }) {
  const router = useRouter();

  return (
    <>
      <div className="bg-primary px-6 py-3.5 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border-none cursor-pointer transition-colors"
        >
          <ArrowLeft size={14} className="text-white" />
        </button>
        <div>
          <p className="text-[15px] font-bold text-white m-0">Checkout</p>
          <p className="text-[11px] text-white/50 m-0">Ref: {reference}</p>
        </div>
      </div>

      <div className="bg-white border-b border-slate-100 px-6 py-3 flex items-center">
        {STEPS.map((step, i) => {
          const num = i + 1;
          const done = num < currentStep;
          const active = num === currentStep;
          return (
            <div key={step} className="flex items-center">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
                  ${done || active ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}`}
                >
                  {done ? "✓" : num}
                </div>
                <span
                  className={`text-[11px] font-semibold
                  ${done || active ? "text-primary" : "text-slate-400"}`}
                >
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px w-8 mx-2 ${num < currentStep ? "bg-primary" : "bg-slate-200"}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
