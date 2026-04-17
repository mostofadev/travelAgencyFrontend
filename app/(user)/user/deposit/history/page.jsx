"use client";

import { useState } from "react";
import DepositHeader from "@/components/Page/User/Deposit/DepositHeader";
import TabMenu from "@/components/Page/User/Deposit/TabMenu";
import DepositHistoryTable from "@/components/Page/User/Deposit/History/DepositHistoryTable";
import PaymentHistoryTable from "@/components/Page/User/Deposit/History/PaymentHistoryTable";
import { useAdminDeposit } from "@/hooks/Page/useDeposit";
import { usePaymentHistory } from "@/hooks/Page/usePayment";

const HISTORY_TABS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const DEPOSIT_HISTORY_TABS = [
  { value: "bank", label: "Bank & Cash" },
  { value: "online", label: "Online Payment" },
];

export default function DepositHistoryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [mainActiveTab, setMainActiveTab] = useState("bank");
  const [depositPage, setDepositPage] = useState(1);
  const [paymentPage, setPaymentPage] = useState(1);

  const { data, isLoading } = useAdminDeposit(depositPage);
  const { data: paymentData, isLoading: paymentLoading } =
    usePaymentHistory(paymentPage);

  const deposits = data?.data ?? [];
  const filtered =
    activeTab === "all"
      ? deposits
      : deposits.filter((d) => d.status === activeTab);

  const handleMainTabChange = (tab) => {
    setMainActiveTab(tab);
    setDepositPage(1);
    setPaymentPage(1);
  };

  return (
    <div className="space-y-4">
      <DepositHeader
        title="Deposit History"
        linkHref="/user/deposit"
        linkLabel="New Deposit"
      />

      <TabMenu
        tabs={DEPOSIT_HISTORY_TABS}
        activeTab={mainActiveTab}
        onChange={handleMainTabChange}
      />

      {mainActiveTab === "bank" && (
        <>
          <TabMenu
            tabs={HISTORY_TABS}
            activeTab={activeTab}
            onChange={(tab) => {
              setActiveTab(tab);
              setDepositPage(1);
            }}
          />
          <DepositHistoryTable
            data={data}
            isLoading={isLoading}
            onPageChange={setDepositPage}
          />
        </>
      )}

      {mainActiveTab === "online" && (
        <PaymentHistoryTable
          data={paymentData}
          isLoading={paymentLoading}
          onPageChange={setPaymentPage}
        />
      )}
    </div>
  );
}
