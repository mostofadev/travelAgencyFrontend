"use client";
import Image from "next/image";
import { Copy, CheckCircle2, Landmark } from "lucide-react";
import { useState } from "react";

export default function BankAccountCard({ bank, isSelected, onSelect }) {

  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(bank.account_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => onSelect(bank)}
      className={`
        relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer
        transition-all duration-200 group
        ${
          isSelected
            ? "border-primary bg-purple-50 shadow-md shadow-purple-100"
            : "border-gray-100 bg-white hover:border-purple-300 hover:shadow-sm"
        }
      `}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
        </div>
      )}

      {/* Logo */}
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
        {bank.logo ? (
          <Image
            src={bank.logo}
            alt={bank.name}
            width={36}
            height={36}
            unoptimized
            className="object-contain"
          />
        ) : (
          <Landmark className="w-5 h-5 text-gray-400" />
        )}
      </div>

      {/* Bank Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {bank.name}
        </p>
        <p className="text-xs text-gray-500 truncate">{bank.branch}</p>
        <p className="text-xs text-gray-400">Routing: {bank.routing_number}</p>
      </div>

      {/* Account Details */}
      <div className="hidden sm:flex flex-col items-end gap-0.5 text-right">
        <p className="text-xs text-gray-500">
          AC:{" "}
          <span className="font-medium text-gray-800">
            {bank.account_number}
          </span>
        </p>
        <p className="text-xs text-gray-500">
          Title:{" "}
          <span className="font-medium text-gray-800">{bank.account_name}</span>
        </p>
      </div>

      {/* Copy Button */}
      <button
        type="button"
        onClick={handleCopy}
        className={`
          flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium
          transition-all duration-150
          ${
            copied
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700"
          }
        `}
      >
        <Copy className="w-3 h-3" />
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
