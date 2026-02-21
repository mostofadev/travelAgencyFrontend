"use client";
import { useState } from "react";
import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/navigation";
import { TableSkeleton } from "@/components/ui/Skeleton/Skeleton";
import {
  useDeleteTourPackage,
  useTourPackages,
} from "@/hooks/Admin/useTourPackage";
import Link from "next/link";

export default function TourPackageList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, refetch } = useTourPackages({ page, perPage });
  const deleteTourPackage = useDeleteTourPackage();

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
      key: "package_code",
      label: "Code",
    },
    {
      key: "package_title",
      label: "Title",
    },
    {
      key: "prices",
      label: "Price",
      render: (value) => (
        <span className="font-medium text-gray-900">
          ৳{parseFloat(value).toLocaleString()}
        </span>
      ),
    },
    {
      key: "view_count",
      label: "Views",
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
    router.push(`/admin/tour-package/update/${item.id}`);
  };

  const handleDelete = (item) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${item.package_title}"?`
      )
    ) {
      deleteTourPackage.mutate(item.id, {
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
          <h1 className="text-3xl font-bold text-gray-900">Tour Packages</h1>
          <p className="text-gray-500 mt-1">
            Manage all tour packages in your system
          </p>
        </div>
        <Link
          href="/admin/tour-package/create"
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
          Add New Package
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
          emptyMessage: "No tour packages found",
          searchPlaceholder: "Search by code, title...",
        }}
      />
    </div>
  );
}