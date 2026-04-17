"use client";
import Image from "next/image";
import { Info, Building2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function DepositSummary({
  selectedBank,
  amount,
  gatewayFee = 0,
  isPending,
  type = true,
}) {
  const numericAmount = parseFloat(amount) || 0;
  const feeAmount = (numericAmount * gatewayFee) / 100;
  const totalAmount = numericAmount + feeAmount;

  return (
    <div className="flex flex-col gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100 h-full">
      {/* Deposit To */}
      {type ? (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Deposit To
          </p>
          {selectedBank ? (
            <div className="flex items-center gap-2 bg-white rounded-lg p-2.5 border border-purple-100">
              <div className="w-8 h-8 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                <Image
                  src={selectedBank.logo}
                  alt={selectedBank.name}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">
                  {selectedBank.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  AC: {selectedBank.account_number}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-white rounded-lg p-2.5 border border-dashed border-gray-200">
              <Building2 className="w-5 h-5 text-gray-300" />
              <p className="text-xs text-gray-400">No bank selected</p>
            </div>
          )}
        </div>
      ) : (
        ""
      )}

      {/* Fee + Amount */}
      <div className="space-y-3">
        {/* Gateway Fee */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-xs text-gray-500">Gateway Fee</p>
            <button
              type="button"
              aria-label="Fee info"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-sm font-bold text-gray-800">
            {gatewayFee.toFixed(2)}%
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Amount to be deposited */}
        <div>
          <p className="text-xs text-gray-500 mb-1.5">Amount to be Deposited</p>
          <div className="bg-white rounded-lg border border-gray-200 px-3 py-2.5">
            <p
              className={`text-sm font-bold ${totalAmount > 0 ? "text-gray-900" : "text-gray-300"}`}
            >
              {totalAmount > 0
                ? `৳ ${totalAmount.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`
                : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-auto space-y-2">
        <Button
          className="w-full"
          type="submit"
          disabled={type ? !selectedBank || isPending : isPending}
          loading={isPending}
        >
          Submit
        </Button>
     
        {type && !selectedBank && (
          <p className="text-center text-xs text-gray-400">
            Please select a Bank
          </p>
        )}
      </div>
    </div>
  );
}
