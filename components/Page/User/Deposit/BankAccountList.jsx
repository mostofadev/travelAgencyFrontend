"use client";
import BankAccountCard from "./BankAccountCard";
import { Landmark } from "lucide-react";

export default function BankAccountList({
  banks,
  selectedBank,
  onSelectBank,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!banks?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <Landmark className="w-10 h-10 mb-2" />
        <p className="text-sm">No banks available</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
      {banks.map((bank) => (
        <BankAccountCard
          key={bank.id}
          bank={bank}
          isSelected={selectedBank?.id === bank.id}
          onSelect={onSelectBank}
        />
      ))}
    </div>
  );
}
