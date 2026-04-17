"use client";
import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/navigation";
import { TableSkeleton } from "@/components/ui/Skeleton/Skeleton";
import { useBank, useDeleteBank } from "@/hooks/Admin/useBank";
import Link from "next/link";

export default function BankList() {
  const router = useRouter();

  const { data, isLoading, refetch } = useBank();
  const deleteBank = useDeleteBank();

  if (isLoading) {
    return <TableSkeleton rows={10} columns={7} />;
  }

  const columns = [
    {
      key: "id",
      label: "ID",
      width: "60px",
    },
    {
      key: "logo",
      label: "Logo",
      type: "image",
      width: "80px",
      sortable: false,
    },
    {
      key: "name",
      label: "Bank Name",
    },
    {
      key: "account_name",
      label: "Account Name",
    },
    {
      key: "account_number",
      label: "Account Number",
    },
    {
      key: "branch",
      label: "Branch",
    },
    {
      key: "routing_number",
      label: "Routing No.",
    },
    {
      key: "status",
      label: "Status",
      type: "badge",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      type: "actions",
      align: "center",
      width: "120px",
      sortable: false,
    },
  ];

  const handleEdit = (item) => {
    router.push(`/admin/bank/update/${item.id}`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      deleteBank.mutate(item.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Banks</h1>
          <p className="text-gray-500 mt-1">
            Manage all bank accounts in your system
          </p>
        </div>
        <Link
          href="/admin/bank/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Bank
        </Link>
      </div>

      <DataTable
        data={data?.data || []}
        columns={columns}
        config={{
          showSearch: true,
          showRefresh: true,
          onRefresh: refetch,
          onEdit: handleEdit,
          onDelete: handleDelete,
          emptyMessage: "No banks found",
          searchPlaceholder: "Search by name, branch...",
        }}
      />
    </div>
  );
}
