"use client";

import { Eye, CheckCircle, XCircle } from "lucide-react";
import DepositStatusBadge from "./DepositStatusBadge";

export const getDepositColumns = ({ onView, onApprove, onReject }) => [
  {
    key: "id",
    label: "ID",
    width: "60px",
    render: (val) => (
      <span className="text-xs font-bold text-gray-400">#{val}</span>
    ),
  },
  {
    key: "user",
    label: "User",
    render: (val) => (
      <div>
        <p className="text-sm font-semibold text-gray-800">
          {val?.name ?? "-"}
        </p>
        <p className="text-xs text-gray-400">{val?.email ?? ""}</p>
      </div>
    ),
  },
  {
    key: "bank",
    label: "Bank",
    render: (val) => (
      <span className="text-sm text-gray-700">{val?.name ?? "-"}</span>
    ),
  },
  {
    key: "deposit_type",
    label: "Type",
    render: (val) => (
      <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full capitalize">
        {val?.replace("_", " ")}
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
      <span className="text-sm font-bold text-gray-900">
        {val}
      </span>
    ),
  },
  {
    key: "deposit_date",
    label: "Date",
    render: (val) => (
      <span className="text-sm text-gray-600">
        {new Date(val).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    sortable: false,
    render: (val) => <DepositStatusBadge status={val} />,
  },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
    align: "center",
    render: (_, item) => (
      <div className="flex items-center gap-1 justify-center">
        <button
          onClick={() => onView(item)}
          className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-all"
          title="View"
        >
          <Eye className="w-4 h-4" />
        </button>

        {item.status === "pending" && (
          <>
            <button
              onClick={() => onApprove(item)}
              className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"
              title="Approve"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => onReject(item)}
              className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all"
              title="Reject"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    ),
  },
];
