"use client";
import { useAdminDashboard } from "@/hooks/Admin/useAdminDashboard";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Plane,
  MapPin,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Globe,
  FileText,
  Wallet,
} from "lucide-react";

//  Skeleton helpers 
function SkeletonBox({ className = "" }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
  );
}

//  Status badge 
function StatusBadge({ status }) {
  const map = {
    confirmed: {
      cls: "bg-green-100 text-green-700",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
    paid: {
      cls: "bg-green-100 text-green-700",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
    processing: {
      cls: "bg-blue-100 text-blue-700",
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    pending: {
      cls: "bg-orange-100 text-orange-700",
      icon: <AlertCircle className="w-3.5 h-3.5" />,
    },
    approved: {
      cls: "bg-green-100 text-green-700",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
    rejected: {
      cls: "bg-red-100 text-red-700",
      icon: <AlertCircle className="w-3.5 h-3.5" />,
    },
    unpaid: {
      cls: "bg-red-100 text-red-700",
      icon: <AlertCircle className="w-3.5 h-3.5" />,
    },
  };
  const { cls, icon } = map[status] ?? {
    cls: "bg-gray-100 text-gray-600",
    icon: null,
  };
  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 capitalize ${cls}`}
    >
      {icon}
      {status}
    </span>
  );
}

//  Type badge 
function TypeBadge({ type }) {
  const map = {
    flight: { cls: "bg-blue-50 text-blue-700", label: "Flight" },
    tour: { cls: "bg-purple-50 text-purple-700", label: "Tour" },
    visa: { cls: "bg-yellow-50 text-yellow-700", label: "Visa" },
  };
  const { cls, label } = map[type] ?? {
    cls: "bg-gray-50 text-gray-600",
    label: type,
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}

export default function TravelDashboard() {
  const { data, isLoading } = useAdminDashboard();
  
  const s = data?.data?.stats ?? {};

  //  Stat cards config (mix static style + live values) 
  const stats = [
    {
      name: "Total Revenue",
      value: s.totalRevenue ? `৳ ${s.totalRevenue}` : "—",
      change:
        s.revenueChange != null
          ? `${s.revenueChange > 0 ? "+" : ""}${s.revenueChange}%`
          : "—",
      trend: s.revenueChange >= 0 ? "up" : "down",
      icon: DollarSign,
      gradient: "from-green-400 to-emerald-500",
      bg: "from-green-50 to-emerald-50",
    },
    {
      name: "Active Bookings",
      value: s.activeBookings ?? "—",
      change: `${s.totalBookings ?? 0} total`,
      trend: "up",
      icon: Calendar,
      gradient: "from-blue-400 to-cyan-500",
      bg: "from-blue-50 to-cyan-50",
    },
    {
      name: "Total Customers",
      value: s.totalCustomers ?? "—",
      change: `${s.totalFlights ?? 0} flights`,
      trend: "up",
      icon: Users,
      gradient: "from-purple-400 to-pink-500",
      bg: "from-purple-50 to-pink-50",
    },
    {
      name: "Destinations",
      value: s.totalDestinations ?? "—",
      change: `${s.pendingVisas ?? 0} visa pending`,
      trend: "up",
      icon: MapPin,
      gradient: "from-orange-400 to-red-500",
      bg: "from-orange-50 to-red-50",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-[#10172a]">
          Travel Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here&apos;s your travel agency overview.
        </p>
      </div>

      {/*  Stats Grid  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={stat.name}
            className="relative group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-50`}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                {isLoading ? (
                  <SkeletonBox className="w-16 h-6" />
                ) : (
                  <div
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      stat.trend === "up"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {stat.change}
                  </div>
                )}
              </div>
              <div>
                {isLoading ? (
                  <>
                    <SkeletonBox className="w-24 h-8 mb-2" />
                    <SkeletonBox className="w-32 h-4" />
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-bold mb-1 text-gray-800">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      {stat.name}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*  Alert row: Pending deposits & visas */}
      {!isLoading && (s.pendingDeposits > 0 || s.pendingVisas > 0) && (
        <div className="flex flex-wrap gap-4 mb-8">
          {s.pendingDeposits > 0 && (
            <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 text-orange-800 rounded-xl px-5 py-3 text-sm font-medium">
              <Wallet className="w-4 h-4" />
              {s.pendingDeposits} deposit{s.pendingDeposits > 1 ? "s" : ""}{" "}
              awaiting approval
            </div>
          )}
          {s.pendingVisas > 0 && (
            <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl px-5 py-3 text-sm font-medium">
              <FileText className="w-4 h-4" />
              {s.pendingVisas} visa application{s.pendingVisas > 1 ? "s" : ""}{" "}
              pending
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/*  Recent Bookings  */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Recent Bookings
                </h2>
                <p className="text-sm text-gray-500">
                  Latest customer reservations
                </p>
              </div>
              <button className="px-4 py-2 bg-[#10172a] text-white rounded-xl hover:bg-[#1a2342] transition-colors text-sm font-medium shadow-md">
                View All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Ref / Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>
                        {Array.from({ length: 5 }).map((__, j) => (
                          <td key={j} className="px-6 py-4">
                            <SkeletonBox className="w-full h-5" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : (data?.data?.recentBookings ?? []).map((booking, index) => (
                      <tr
                        key={booking.id}
                        className="hover:bg-gray-50 transition-colors animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <span className="text-sm font-semibold text-[#10172a]">
                              {booking.ref}
                            </span>
                            <div className="mt-1">
                              <TypeBadge type={booking.type} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <span className="text-sm font-medium text-gray-800">
                              {booking.customer}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {Array.isArray(booking.travelers)
                                ? booking.travelers.length
                                : booking.travelers}{" "}
                              traveler(s)
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {booking.destination}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 pl-6">
                            {booking.date}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-bold text-gray-800">
                            ৳ {booking.amount}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={booking.status} />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        {/*Top Destinations*/}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Top Destinations
            </h2>
            <p className="text-sm text-gray-500">Most booked tour packages</p>
          </div>

          <div className="p-6 space-y-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <SkeletonBox key={i} className="w-full h-20" />
              ))
            ) : (data?.data?.topDestinations ?? []).length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                No paid tour bookings yet.
              </p>
            ) : (
              data?.data?.topDestinations.map((destination, index) => (
                <div
                  key={destination.name}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all cursor-pointer border border-gray-100 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-800 truncate">
                      {destination.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {destination.bookings} booking
                      {destination.bookings !== 1 ? "s" : ""}
                    </p>
                    <p className="text-sm font-bold text-[#10172a] mt-0.5">
                      ৳ {destination.revenue}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Upcoming Flights ──────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                Upcoming Flights
              </h2>
              <p className="text-sm text-gray-500">Next scheduled departures</p>
            </div>
            <Globe className="w-8 h-8 text-[#10172a]" />
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonBox key={i} className="h-44" />
              ))}
            </div>
          ) : (data?.upcomingFlights ?? []).length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No upcoming flights scheduled.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data?.data?.upcomingFlights.map((flight, index) => (
                <div
                  key={flight.id ?? index}
                  className="p-5 bg-gradient-to-br from-[#10172a] to-[#1a2342] rounded-xl text-white shadow-xl hover:shadow-2xl transition-all animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Plane className="w-6 h-6 transform -rotate-45" />
                    <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                      {flight.date}
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-white/70 mb-1">Airline</p>
                    <p className="font-bold text-lg">
                      {flight.airline !== "—" ? flight.airline : "Unknown"}
                    </p>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-white/70 mb-1">Route</p>
                    <p className="font-semibold">{flight.route}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/70">Departure</p>
                      <p className="font-semibold">{flight.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/70">Passengers</p>
                      <p className="font-semibold">{flight.passengers}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Wallet: Recent Transactions + Pending Deposits ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Recent Transactions
            </h2>
            <p className="text-sm text-gray-500">Wallet activity</p>
          </div>
          <div className="divide-y divide-gray-100">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="px-6 py-4">
                  <SkeletonBox className="w-full h-10" />
                </div>
              ))
            ) : (data?.data?.wallet?.recentTransactions ?? []).length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                No transactions yet.
              </p>
            ) : (
              data?.data?.wallet?.recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {tx.user}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {tx.ref} · {tx.date}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      tx.type === "credit" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {tx.amount}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Deposits */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Pending Deposits
                </h2>
                <p className="text-sm text-gray-500">Awaiting approval</p>
              </div>
              {!isLoading &&
                (data?.data?.wallet?.pendingDeposits ?? []).length > 0 && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                    {data?.data?.wallet?.pendingDeposits.length}
                  </span>
                )}
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="px-6 py-4">
                  <SkeletonBox className="w-full h-10" />
                </div>
              ))
            ) : (data?.data?.wallet?.pendingDeposits ?? []).length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                No pending deposits.
              </p>
            ) : (
              data?.data?.wallet?.pendingDeposits.map((dep) => (
                <div
                  key={dep.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {dep.user?.name ?? "—"}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 capitalize">
                      {dep.deposit_type?.replace("_", " ")} ·{" "}
                      {dep.reference_id ?? "—"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">
                      ৳ {Number(dep.amount).toLocaleString()}
                    </p>
                    <StatusBadge status={dep.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
