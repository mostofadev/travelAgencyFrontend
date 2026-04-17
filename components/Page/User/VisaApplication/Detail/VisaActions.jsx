"use client";

import Button from "@/components/ui/Button";
import { Download, MessageCircle, RefreshCw } from "lucide-react";

export default function VisaActions({ application }) {
  const isPending =
    application.current_status === "pending" &&
    application.payment_status === "pending";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700">Actions</h3>
      </div>
      <div className="px-5 py-4 flex flex-wrap gap-3">
        {/* Pay Now — only if payment pending */}
        {isPending && (
          <Button
          >
            Pay Now
          </Button>
        )}

        {/* Download */}
        

        {/* Support */}
        <button className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
          <MessageCircle size={14} />
          Contact Support
        </button>
      </div>
    </div>
  );
}