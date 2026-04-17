"use client";

import DataTable from "@/components/ui/DataTable";
import DepositStatusBadge from "@/components/forms/Admin/Deposit/DepositStatusBadge";

const columns = [
  {
    key: "id",
    label: "ID",
    width: "60px",
    render: (val) => (
      <span className="text-xs font-bold text-gray-400">#{val}</span>
    ),
  },
  {
    key: "bank",
    label: "Bank",
    render: (val) => (
      <div className="flex items-center gap-2">
        {val?.logo && (
          <img
            src={val.logo}
            alt={val.name}
            className="w-8 h-8 rounded-lg object-cover border border-gray-100"
          />
        )}
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {val?.name ?? "-"}
          </p>
          <p className="text-xs text-gray-400">{val?.account_number ?? ""}</p>
        </div>
      </div>
    ),
  },
  {
    key: "deposit_type",
    label: "Type",
    render: (val) => (
      <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full capitalize">
        {val?.replace("_", " ") ?? "-"}
      </span>
    ),
  },
  {
    key: "amount",
    label: "Amount",
    render: (val) => (
      <span className="text-sm font-bold text-gray-900">
        ৳{Number(val).toLocaleString()}
      </span>
    ),
  },
  {
    key: "reference_id",
    label: "Reference",
    render: (val) => (
      <span className="text-xs text-gray-500 font-mono">{val ?? "-"}</span>
    ),
  },
  {
    key: "deposit_date",
    label: "Date",
    render: (val) => (
      <span className="text-sm text-gray-600">
        {val ? new Date(val).toLocaleDateString() : "-"}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    sortable: false,
    render: (val) => <DepositStatusBadge status={val} />,
  },
];

export default function DepositHistoryTable({ data, isLoading, onPageChange }) {
  const meta = data?.meta;
  
  return (
    <DataTable
      data={data?.data ?? []}
      columns={columns}
      config={{
        showSearch: true,
        searchPlaceholder: "Search by bank, reference...",
        emptyMessage: isLoading ? "Loading..." : "No deposit history found",
      }}
      pagination={
        meta
          ? {
              enabled: true,
              currentPage: meta.current_page,
              totalPages: meta.last_page,
              totalItems: meta.total,
              perPage: meta.per_page,
              onPageChange: onPageChange,
            }
          : null
      }
    />
  );
}
