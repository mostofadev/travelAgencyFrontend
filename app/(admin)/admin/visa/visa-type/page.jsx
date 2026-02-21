"use client";
import { useState } from "react";
import DataTable from "@/components/ui/DataTable";
import { useVisaTypes, useDeleteVisaType } from "@/hooks/Admin/useVisaType";
import { useRouter } from "next/navigation";
import { TableSkeleton } from "@/components/ui/Skeleton/Skeleton";

export default function VisaTypeListInlineSkeleton() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, refetch } = useVisaTypes({ page, perPage });
  const deleteVisaType = useDeleteVisaType();

  if (isLoading) {
    return <TableSkeleton rows={10} columns={5} />;
  }

  // Columns configuration
  const columns = [
    {
      key: "id",
      label: "ID",
      width: "80px",
    },
    {
      key: "name",
      label: "Visa Type Name",
    },
    {
      key: "is_active",
      label: "Status",
      type: "badge",
      render: (value) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
            value === 1
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-red-100 text-red-700 border-red-200"
          }`}
        >
          {value === 1 ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Created Date",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      type: "actions",  // ✅ এটা important!
      align: "center",
      width: "150px",
      sortable: false,
    }
  ];

  // Edit handler
  const handleEdit = (item) => {
    router.push(`/admin/visa/visa-type/update/${item.id}`);
  };

  // Delete handler
  const handleDelete = (item) => {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      deleteVisaType.mutate(item.id);
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visa Types</h1>
          <p className="text-gray-500 mt-1">Manage all visa types in your system</p>
        </div>
        <button
          onClick={() => router.push("/admin/visa/visa-type/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New
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
          emptyMessage: "No visa types found",
        }}
      />
    </div>
  );
}