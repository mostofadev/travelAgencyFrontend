"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tranId = searchParams.get("tran_id");
  const type = searchParams.get("type");
  const method = searchParams.get("method");
  const amount = searchParams.get("amount"); 

  useEffect(() => {
    if (!tranId) router.replace("/");
  }, [tranId, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-10 max-w-md w-full">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M8 14.5l4 4 8-8"
              stroke="#16a34a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-xl font-medium text-center text-slate-900 mb-1">
          Payment successful
        </h1>
        <p className="text-sm text-slate-500 text-center mb-8">
          Your booking has been confirmed.
        </p>

        {/* Amount box */}
        <div className="bg-slate-50 rounded-xl p-5 text-center mb-6">
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
            Amount paid
          </p>
          <p className="text-3xl font-medium text-slate-900">৳ {amount}</p>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Transaction ID</span>
            <span className="text-xs font-mono text-slate-800">{tranId}</span>
          </div>
          {/* <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Booking type</span>
            <span className="text-sm font-medium capitalize text-slate-800">
              {type}
            </span>
          </div> */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Payment method</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
              {method === "wallet" ? "Wallet" : "bKash"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Status</span>
            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium">
              ● Confirmed
            </span>
          </div>
        </div>

        <hr className="border-slate-100 mb-6" />

        <Button
          href="/user/dashboard"
          className="w-full"
        >
          Go to dashboard
        </Button>
        <Link
          href="/"
          className="my-3 block w-full text-sm font-medium text-center py-3 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
