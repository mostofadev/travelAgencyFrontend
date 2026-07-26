"use client";

import Button from "@/components/ui/Button";
import { Download, MessageCircle, RefreshCw } from "lucide-react";

export default function VisaActions({ application }) {
  console.log(application);
  
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
            href={`/visa/checkout/${application.application_reference}`}
          >
            Pay Now
          </Button>
        )}

      </div>
    </div>
  );
}