"use client";
import { useState } from "react";
import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/navigation";
import { TableSkeleton } from "@/components/ui/Skeleton/Skeleton";
import Link from "next/link";
import { useAirports, useDeleteAirports } from "@/hooks/Admin/useAirports";
import { useAircrafts, useDeleteAircrafts } from "@/hooks/Admin/useAircrafts";

export default function AircraftsTable() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // const { data, isLoading, refetch } = useAirports({ page, perPage });
  const {data,isLoading,refetch} = useAircrafts({page,perPage});
  const deleteAircrafts = useDeleteAircrafts();
  console.log('table aircrafts',data);
  
  if (isLoading) {
    return <TableSkeleton rows={10} columns={6} />;
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

 
  const columns = [
    {
      key: "id",
      label: "ID",
      width: "60px",
    },
    
    {
      key: "model",
      label: "Model",
    },
    {
      key: "manufacturer",
      label: "Manufacturer",
    },
    {
      key: "capacity",
      label: "Capacity",
    },
    {
      key: "is_active",
      label: "Status",
      type: "badge",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
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
    router.push(`/admin/flights/aircrafts/update/${item.id}`);
  };

  const handleDelete = (item) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${item.model}"?`
      )
    ) {
      deleteAircrafts.mutate(item.id, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tour Aircrafts</h1>
          <p className="text-gray-500 mt-1">
            Manage all tour Aircrafts in your system
          </p>
        </div>
        <Link
          href="/admin/flights/aircrafts/create"
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
          Add New Aircrafts
        </Link>
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
          emptyMessage: "No tour Aircrafts found",
          searchPlaceholder: "Search by code, title...",
        }}
      />
    </div>
  );
}