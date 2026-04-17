"use client";

import { useAdminDepositById } from "@/hooks/Admin/useAdminDeposit";
import DepositStatusBadge from "./DepositStatusBadge";



const DetailRow = ({ label, value }) => (
  <div className="flex items-start justify-between py-2.5 border-b border-gray-100 last:border-0">
    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </span>
    <span className="text-sm text-gray-800 text-right">{value}</span>
  </div>
);

export default function DepositDetailModal({ id, onClose }) {
  const { data, isLoading } = useAdminDepositById({ id });
  const deposit = data?.data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="h-1.5 w-full bg-blue-500" />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-gray-900">Deposit Details</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-500 text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="py-10 text-center text-gray-500 text-sm">
              Loading...
            </div>
          ) : !deposit ? (
            <div className="py-10 text-center text-gray-500 text-sm">
              Not found
            </div>
          ) : (
            <div className="space-y-1">
              <DetailRow label="Deposit ID" value={`#${deposit.id}`} />
              <DetailRow label="User" value={deposit.user?.name ?? "-"} />
              <DetailRow label="Bank" value={deposit.bank?.bank_name ?? "-"} />
              <DetailRow label="Payment Type" value={deposit.payment_type} />
              <DetailRow
                label="Amount"
                value={`৳${Number(deposit.deposit_amount).toLocaleString()}`}
              />
              <DetailRow
                label="Reference"
                value={deposit.transaction_reference}
              />
              <DetailRow
                label="Deposit Date"
                value={new Date(deposit.deposit_date).toLocaleDateString()}
              />
              <DetailRow
                label="Status"
                value={<DepositStatusBadge status={deposit.status} />}
              />
              <DetailRow label="Notes" value={deposit.user_notes || "-"} />

              {/* Attachment */}
              {deposit.photo_path && (
                <div className="pt-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Attachment
                  </p>
                  <img
                    src={deposit.photo_path}
                    alt="attachment"
                    className="w-full rounded-xl border border-gray-200 object-cover max-h-60"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
