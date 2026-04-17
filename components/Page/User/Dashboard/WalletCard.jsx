
"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";

export default function WalletCard({
  transactions = [],
  pending = [],
  balance = "0",
  isLoading = false,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Left — Balance */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5">
        <p className="text-xs text-slate-400 font-medium mb-2">
          Available balance
        </p>
        <p className="text-3xl font-semibold text-slate-800 mb-5">
          ৳ {isLoading ? "—" : balance}
        </p>

        <div className="flex gap-2 mb-5">
          <Link
            href="/user/deposit"
            className="flex-1 text-center text-xs font-semibold py-2 rounded-xl transition-colors"
            style={{ background: "#E6F1FB", color: "#0C447C" }}
          >
            + Add Money
          </Link>
          <Link
            href="/user/deposit"
            className="flex-1 text-center text-xs font-semibold py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            History
          </Link>
        </div>

        {/* Pending */}
        <div className="border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-400 font-medium mb-3">
            Pending deposits
          </p>
          {isLoading ? (
            <div className="animate-pulse h-8 bg-slate-100 rounded-lg" />
          ) : pending.length === 0 ? (
            <p className="text-xs text-slate-300">No pending deposits</p>
          ) : (
            pending.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between mb-2"
              >
                <div>
                  <p className="text-sm text-slate-700">
                    {p.label ?? "Deposit"}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={10} className="text-slate-400" />
                    <p className="text-xs text-slate-400">
                      {p.date ?? p.deposit_date?.slice(0, 10)}
                    </p>
                  </div>
                </div>
                <span
                  className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
                  style={{ background: "#FAEEDA", color: "#854F0B" }}
                >
                  ৳ {Number(p.amount).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right — Transactions */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-slate-400 font-medium">
            Recent transactions
          </p>
          <Link
            href="/user/deposit/history"
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            All <ArrowRight size={11} />
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse h-10 bg-slate-100 rounded-lg"
              />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-xs text-slate-300">No transactions yet</p>
        ) : (
          <div className="space-y-1">
            {transactions.map((tx, i) => (
              <div
                key={tx.id}
                className={`flex items-center justify-between py-3 ${
                  i < transactions.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: tx.type === "credit" ? "#EAF3DE" : "#FCEBEB",
                    }}
                  >
                    {tx.type === "credit" ? (
                      <ArrowDownLeft size={14} color="#3B6D11" />
                    ) : (
                      <ArrowUpRight size={14} color="#A32D2D" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 font-medium">
                      {tx.label}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {tx.date} · {tx.ref}
                    </p>
                  </div>
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: tx.type === "credit" ? "#3B6D11" : "#A32D2D",
                  }}
                >
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
