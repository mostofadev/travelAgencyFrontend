"use client";
import { useState } from "react";
import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/navigation";
import { TableSkeleton } from "@/components/ui/Skeleton/Skeleton";
import { useDeleteVisa, useVisas } from "@/hooks/Admin/useVisa";

export default function VisaListComponent() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, refetch } = useVisas({ page, perPage });
  const deleteVisa = useDeleteVisa();

  if (isLoading) {
    return <TableSkeleton rows={10} columns={8} />;
  }
  const paginationInfo = data?.data
    ? {
        enabled: true,
        currentPage: data.data.current_page,
        totalPages: data.data.last_page,
        totalItems: data.data.total,
        perPage: data.data.per_page,
        onPageChange: setPage,
      }
    : null;
  console.log("current_page", data.data.current_page);
  console.log("last_page", data.data.last_page);
  console.log("total", data.data.total);
  console.log("per_page", data.data.per_page);

  // Columns configuration
  const columns = [
    {
      key: "id",
      label: "ID",
      width: "60px",
    },
    {
      key: "image_url",
      label: "Image",
      type: "image",
      width: "80px",
      sortable: false,
    },
    {
      key: "visa_code",
      label: "Visa Code",
    },
    {
      key: "visa_title",
      label: "Title",
    },
    {
      key: "visa_type",
      label: "Type",
      render: (value) => (
        <span className="text-gray-700">{value?.name || "-"}</span>
      ),
    },
    {
      key: "base_fee",
      label: "Fee",
      render: (value, item) => (
        <span className="font-medium text-gray-900">
          {item.currency} {parseFloat(value).toLocaleString()}
        </span>
      ),
    },
    {
      key: "is_active",
      label: "Status",
      type: "badge",
    },
    {
      key: "created_at",
      label: "Created",
      render: (value) => new Date(value).toLocaleDateString(),
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

  // Edit handler
  const handleEdit = (item) => {
    router.push(`/admin/visa/update/${item.id}`);
  };

  // Delete handler
  const handleDelete = (item) => {
    if (confirm(`Are you sure you want to delete "${item.visa_title}"?`)) {
      deleteVisa.mutate(item.id);
    }
  };

  console.log("pagination", paginationInfo);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={() => refetch()}>Refresh</button>

          <h1 className="text-3xl font-bold text-gray-900">All Visas</h1>
          <p className="text-gray-500 mt-1">
            Manage all visa applications in your system
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/visa/create")}
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
          Add New Visa
        </button>
      </div>

      <DataTable
        data={data?.data?.data || []}
        columns={columns}
        pagination={paginationInfo}
        config={{
          showSearch: true,
          showRefresh: true,
          onRefresh: refetch,
          onEdit: handleEdit,
          onDelete: handleDelete,
          emptyMessage: "No visas found",
          searchPlaceholder: "Search by visa code, title...",
        }}
      />
    </div>
  );
}
