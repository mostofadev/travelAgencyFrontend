"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function DepositConfirmModal({
  open,
  type,
  deposit,
  loading,
  onConfirm,
  onCancel,
}) {
  const [reason, setReason] = useState("");

  if (!open || !deposit) return null;

  const isApprove = type === "approve";

  const handleConfirm = () => {
    onConfirm(isApprove ? {} : { reason });
    setReason("");
  };

  const handleCancel = () => {
    setReason("");
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Top color bar */}
        <div
          className={`h-1.5 w-full ${
            isApprove ? "bg-emerald-500" : "bg-red-500"
          }`}
        />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-5">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isApprove ? "bg-emerald-50" : "bg-red-50"
              }`}
            >
              {isApprove ? (
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {isApprove ? "Approve Deposit" : "Reject Deposit"}
              </h3>
              <p className="text-sm text-gray-500">
                #{deposit?.id} · ৳
                {Number(deposit?.deposit_amount).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Reject reason textarea */}
          {!isApprove && (
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Rejection Reason
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent resize-none"
              />
            </div>
          )}

          <p className="text-sm text-gray-600 mb-6">
            {isApprove
              ? "Are you sure you want to approve this deposit request?"
              : "This action cannot be undone. The user will be notified."}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading || (!isApprove && !reason.trim())}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50 ${
                isApprove
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loading
                ? "Processing..."
                : isApprove
                  ? "Yes, Approve"
                  : "Yes, Reject"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
