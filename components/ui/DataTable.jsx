"use client";
import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

export default function DataTable({
  data = [],
  columns = [],
  config = {},
  pagination = null,
}) {
  // Default configuration
  const {
    itemsPerPage = 10,
    searchPlaceholder = "Search...",
    showSearch = true,
    showFilter = false,
    showExport = false,
    showRefresh = false,
    onView,
    onEdit,
    onDelete,
    onRefresh,
    rowClassName,
    emptyMessage = "No data available",
    filters = [],
  } = config;

  // Check if server-side pagination is enabled
  const isServerPagination = pagination?.enabled;

  // State management (for client-side only)
  const [clientPage, setClientPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  const actualData = useMemo(() => {
    if (data?.data && Array.isArray(data.data)) {
      return data.data;
    }
    return data;
  }, [data]);

  // Client-side search and filter
  const filteredData = useMemo(() => {
    if (isServerPagination) return actualData;

    let result = [...actualData];

    if (searchTerm) {
      result = result.filter((item) => {
        return columns.some((column) => {
          if (column.searchable !== false) {
            const value = item[column.key];
            return value
              ?.toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          }
          return false;
        });
      });
    }

    if (activeFilter) {
      result = result.filter(activeFilter.filterFn);
    }

    return result;
  }, [actualData, searchTerm, activeFilter, columns, isServerPagination]);

  // Client-side sort
  const sortedData = useMemo(() => {
    if (isServerPagination) return filteredData;
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortConfig, isServerPagination]);

  // Pagination calculations
  const paginationInfo = useMemo(() => {
    if (isServerPagination) {
      // Server-side pagination
      return {
        currentPage: pagination.currentPage || 1,
        totalPages: pagination.totalPages || 1,
        totalItems: pagination.totalItems || actualData.length,
        perPage: pagination.perPage || itemsPerPage,
        startIndex: (pagination.currentPage - 1) * pagination.perPage + 1,
        endIndex: Math.min(
          pagination.currentPage * pagination.perPage,
          pagination.totalItems,
        ),
      };
    } else {
      // Client-side pagination
      const totalPages = Math.ceil(sortedData.length / itemsPerPage);
      const startIndex = (clientPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      return {
        currentPage: clientPage,
        totalPages,
        totalItems: sortedData.length,
        perPage: itemsPerPage,
        startIndex: startIndex + 1,
        endIndex: Math.min(endIndex, sortedData.length),
      };
    }
  }, [
    isServerPagination,
    pagination,
    clientPage,
    sortedData,
    itemsPerPage,
    actualData,
  ]);

  // Current page data (client-side only)
  const currentData = useMemo(() => {
    if (isServerPagination) {
      return actualData;
    }

    const start = (clientPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedData.slice(start, end);
  }, [isServerPagination, actualData, sortedData, clientPage, itemsPerPage]);

  // Handlers
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (newPage) => {
    if (isServerPagination) {
      pagination.onPageChange?.(newPage);
    } else {
      setClientPage(newPage);
    }
    setSelectedRows([]);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === currentData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map((_, index) => index));
    }
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleExport = () => {
    const csv = [
      columns.map((col) => col.label).join(","),
      ...currentData.map((row) => columns.map((col) => row[col.key]).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data-export.csv";
    a.click();
  };

  // Render cell content
  const renderCell = (item, column) => {
    const value = item[column.key];

    if (column.render) {
      return column.render(value, item);
    }

    switch (column.type) {
      case "image":
        return value ? (
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group">
            <Image
              src={value}
              unoptimized
              alt=""
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-gray-400" />
          </div>
        );

      case "badge":
        const badgeColors = {
          1: "bg-green-100 text-green-700 border-green-200",
          0: "bg-red-100 text-red-700 border-red-200",
          active: "bg-green-100 text-green-700 border-green-200",
          inactive: "bg-red-100 text-red-700 border-red-200",
          pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
          completed: "bg-blue-100 text-blue-700 border-blue-200",
        };

        const displayValue =
          value === 1 ? "Active" : value === 0 ? "Inactive" : value;
        const colorClass =
          badgeColors[value] || "bg-gray-100 text-gray-700 border-gray-200";

        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${colorClass}`}
          >
            {displayValue}
          </span>
        );

      case "date":
        return value ? new Date(value).toLocaleDateString() : "-";

      case "currency":
        return value ? `$${parseFloat(value).toFixed(2)}` : "-";

      case "actions":
        return (
          <div className="flex items-center gap-2 justify-center">
            {onView && (
              <button
                onClick={() => onView(item)}
                className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-all duration-200 hover:scale-110"
                title="View"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => onEdit(item)}
                className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-all duration-200 hover:scale-110"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(item)}
                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-all duration-200 hover:scale-110"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        );

      default:
        if (column.key === "actions" && (onView || onEdit || onDelete)) {
          return (
            <div className="flex items-center gap-2 justify-center">
              {onView && (
                <button
                  onClick={() => onView(item)}
                  className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-all duration-200 hover:scale-110"
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}
              {onEdit && (
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-all duration-200 hover:scale-110"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(item)}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-all duration-200 hover:scale-110"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        }

        return <span className="text-gray-700">{value || "-"}</span>;
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {showSearch && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (!isServerPagination) setClientPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            {showExport && (
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}

            {showRefresh && onRefresh && (
              <button
                onClick={onRefresh}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
              <th className="w-12 px-6 py-4">
                <input
                  type="checkbox"
                  checked={
                    currentData.length > 0 &&
                    selectedRows.length === currentData.length
                  }
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
              </th>

              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-${column.align || "left"} ${
                    column.sortable !== false
                      ? "cursor-pointer select-none"
                      : ""
                  }`}
                  style={{ width: column.width }}
                  onClick={() =>
                    column.sortable !== false && handleSort(column.key)
                  }
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    <span>{column.label}</span>
                    {column.sortable !== false && (
                      <div className="flex flex-col">
                        {sortConfig.key === column.key ? (
                          sortConfig.direction === "asc" ? (
                            <ChevronUp className="w-4 h-4 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-blue-600" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {currentData.length > 0 ? (
              currentData.map((item, index) => {
                const isSelected = selectedRows.includes(index);
                const isHovered = hoveredRow === index;

                return (
                  <tr
                    key={item.id || index}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`
                      transition-all duration-200
                      ${isSelected ? "bg-blue-50/50" : isHovered ? "bg-gray-50" : "bg-white"}
                      ${rowClassName ? rowClassName(item) : ""}
                      hover:shadow-sm
                    `}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(index)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>

                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-6 py-4 text-sm text-${column.align || "left"}`}
                      >
                        {renderCell(item, column)}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer - Pagination */}
      {paginationInfo.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {paginationInfo.startIndex}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900">
                {paginationInfo.endIndex}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {paginationInfo.totalItems}
              </span>{" "}
              results
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={paginationInfo.currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
                disabled={paginationInfo.currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: Math.min(5, paginationInfo.totalPages) },
                  (_, i) => {
                    let pageNum;
                    const { totalPages, currentPage } = paginationInfo;

                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handlePageChange(pageNum)}
                        className={`min-w-[2.5rem] px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                            : "border border-gray-200 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  },
                )}
              </div>

              <button
                onClick={() => handlePageChange(paginationInfo.currentPage + 1)}
                disabled={
                  paginationInfo.currentPage === paginationInfo.totalPages
                }
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handlePageChange(paginationInfo.totalPages)}
                disabled={
                  paginationInfo.currentPage === paginationInfo.totalPages
                }
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedRows.length > 0 && (
        <div className="px-6 py-3 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">
              {selectedRows.length} row{selectedRows.length > 1 ? "s" : ""}{" "}
              selected
            </span>
            <button
              onClick={() => setSelectedRows([])}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
