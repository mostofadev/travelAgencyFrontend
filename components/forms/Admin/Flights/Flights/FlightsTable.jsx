"use client";
import { useState } from "react";
import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/navigation";
import { TableSkeleton } from "@/components/ui/Skeleton/Skeleton";
import Link from "next/link";
import { useFlights, useDeleteFlights } from "@/hooks/Admin/useFlights";

export default function FlightsTable() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, refetch } = useFlights({ page, perPage });
  const deleteFlights = useDeleteFlights();
  console.log("table flights", data);

  if (isLoading) {
    return <TableSkeleton rows={10} columns={7} />;
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

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      width: "60px",
    },
    {
      key: "flight_number",
      label: "Flight Number",
    },
    {
      key: "aircraft",
      label: "Aircraft",
      render: (value) => value?.model || "-",
    },
    {
      key: "route",
      label: "Route",
      render: (value) =>
        value
          ? `Airport ${value.from_airport_id} → Airport ${value.to_airport_id}`
          : "-",
    },
    {
      key: "departure_datetime",
      label: "Departure",
      render: (value) => formatDateTime(value),
    },
    {
      key: "arrival_datetime",
      label: "Arrival",
      render: (value) => formatDateTime(value),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => {
        const statusStyles = {
          scheduled: "bg-blue-100 text-blue-800",
          departed: "bg-yellow-100 text-yellow-800",
          arrived: "bg-green-100 text-green-800",
          cancelled: "bg-red-100 text-red-800",
          delayed: "bg-orange-100 text-orange-800",
        };
        const style = statusStyles[value] || "bg-gray-100 text-gray-800";
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${style}`}
          >
            {value || "-"}
          </span>
        );
      },
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
    router.push(`/admin/flights/update/${item.id}`);
  };

  const handleDelete = (item) => {
    if (
      window.confirm(
        `Are you sure you want to delete flight "${item.flight_number}"?`
      )
    ) {
      deleteFlights.mutate(item.id, {
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
          <h1 className="text-3xl font-bold text-gray-900">Flights</h1>
          <p className="text-gray-500 mt-1">
            Manage all flights in your system
          </p>
        </div>
        <Link
          href="/admin/flights/create"
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
          Add New Flight
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
          emptyMessage: "No flights found",
          searchPlaceholder: "Search by flight number...",
        }}
      />
    </div>
  );
}