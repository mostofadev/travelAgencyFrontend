"use client";

import { useState } from "react";
import { RefreshCw, Wallet, Clock, BadgeCheck, TrendingUp } from "lucide-react";
import DataTable from "@/components/ui/DataTable";

import DepositSummaryCard from "@/components/forms/Admin/Deposit/DepositSummaryCard";
import DepositStatusTabs from "@/components/forms/Admin/Deposit/DepositStatusTabs";
import DepositConfirmModal from "@/components/forms/Admin/Deposit/DepositConfirmModal";
import DepositDetailModal from "@/components/forms/Admin/Deposit/DepositDetailModal";
import {
  useAdminDeposits,
  useApproveDeposit,
  useRejectDeposit,
} from "@/hooks/Admin/useAdminDeposit";
import { getDepositColumns } from "@/components/forms/Admin/Deposit/DepositTableColumns";

export default function AdminDepositPage() {
  const [page, setPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState("");
  const [modal, setModal] = useState({ type: null, deposit: null });
  const [detailId, setDetailId] = useState(null);

  const filters = activeStatus ? { status: activeStatus } : {};

  const { data, isLoading, refetch } = useAdminDeposits({
    page,
    perPage: 10,
    filters,
  });

  const { mutate: approve, isPending: isApproving } = useApproveDeposit();
  const { mutate: reject, isPending: isRejecting } = useRejectDeposit();

  const deposits = data?.data ?? [];
  const meta = data?.meta ?? {};
  const summary = data?.summary ?? {};
  const total_deposit =
    (summary?.pending ?? 0) +
    (summary?.approved ?? 0) +
    (summary?.rejected ?? 0);
  const columns = getDepositColumns({
    onView: (item) => setDetailId(item.id),
    onApprove: (item) => setModal({ type: "approve", deposit: item }),
    onReject: (item) => setModal({ type: "reject", deposit: item }),
  });

  const handleConfirm = (extraData) => {
    const { type, deposit } = modal;
    const payload = { id: deposit.id, data: extraData };
    const onSuccess = () => setModal({ type: null, deposit: null });

    if (type === "approve") {
      approve(payload, { onSuccess });
    } else {
      reject(payload, { onSuccess });
    }
  };

  const handleTabChange = (status) => {
    setActiveStatus(status);
    setPage(1);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deposit Requests</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and review all deposit requests
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DepositSummaryCard
          label="Total Deposits"
          value={total_deposit}
          icon={<Wallet className="w-5 h-5 text-blue-600" />}
          color="bg-blue-50"
        />
        <DepositSummaryCard
          label="Pending"
          value={summary?.pending}
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          color="bg-amber-50"
        />
        <DepositSummaryCard
          label="Approved"
          value={summary?.approved}
          icon={<BadgeCheck className="w-5 h-5 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <DepositSummaryCard
          label="Reject"
          value={summary?.rejected}
          icon={<BadgeCheck className="w-5 h-5 text-red-600" />}
          color="bg-emerald-50"
        />
      </div>

      {/* Status Filter Tabs */}
      <DepositStatusTabs
        activeStatus={activeStatus}
        onChange={handleTabChange}
      />

      {/* DataTable */}
      <DataTable
        data={deposits}
        columns={columns}
        config={{
          showSearch: false,
          emptyMessage: isLoading ? "Loading..." : "No deposit requests found",
        }}
        pagination={{
          enabled: true,
          currentPage: meta.current_page ?? 1,
          totalPages: meta.last_page ?? 1,
          totalItems: meta.total ?? 0,
          perPage: 10,
          onPageChange: setPage,
        }}
      />

      {/* Modals */}
      <DepositConfirmModal
        open={!!modal.type}
        type={modal.type}
        deposit={modal.deposit}
        loading={isApproving || isRejecting}
        onConfirm={handleConfirm}
        onCancel={() => setModal({ type: null, deposit: null })}
      />

      {detailId && (
        <DepositDetailModal id={detailId} onClose={() => setDetailId(null)} />
      )}
    </div>
  );
}
