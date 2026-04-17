"use client";
import { useState } from "react";
import DepositHeader from "@/components/Page/User/Deposit/DepositHeader";
import TabMenu from "@/components/Page/User/Deposit/TabMenu";
import BankDepositSection from "@/components/Page/User/Deposit/BankDepositSection";
import CacheDepositSection from "@/components/Page/User/Deposit/Cache/CacheDepositSection";
import OnlinePaymentSection from "@/components/Page/User/Deposit/OnlinePayment/OnlinePaymentSection";

const DEPOSIT_TABS = [
  { value: "bank", label: "Bank Account" },
  { value: "online", label: "Online Payment" },
  { value: "cash", label: "Cash Deposit" },
];

export default function DepositPage() {
  const [activeTab, setActiveTab] = useState("bank");

  return (
    <div className="space-y-4">
      <DepositHeader
        title="Deposit Create"
        linkHref="/user/deposit/history"
        linkLabel="Deposit History"
      />

      <TabMenu
        tabs={DEPOSIT_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Content */}
      {activeTab === "bank" && (
        <div>
          <BankDepositSection />
        </div>
      )}
      {activeTab === "online" && <div><OnlinePaymentSection /></div>}
      {activeTab === "cash" && <div><CacheDepositSection /></div>}
    </div>
  );
}

