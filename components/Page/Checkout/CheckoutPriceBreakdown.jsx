"use client";


export default function CheckoutPriceBreakdown({
  rows = [],
  total = 0,
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 overflow-hidden ${className}`}
    >
      <div className="bg-slate-50 px-5 py-3 border-b border-slate-100">
        <span className="text-[13px] font-bold text-primary">
          Price breakdown
        </span>
      </div>
      <div className="px-5 py-4">
        <div className="space-y-2">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-[12px] py-1 border-b border-slate-50"
            >
              <span className="text-slate-500">{row.label}</span>
              <span className="font-semibold text-slate-800">
                ৳ {Number(row.amount).toLocaleString("en-BD")}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-3 mt-1 border-t border-slate-100">
          <span className="text-[13px] font-bold text-slate-800">Total</span>
          <span className="text-[20px] font-black text-primary">
            ৳ {Number(total).toLocaleString("en-BD")}
          </span>
        </div>
      </div>
    </div>
  );
}
