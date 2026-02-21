"use client";
import AdminLayout from "@/components/layout/Admin/AdminLayout";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Plane,
  MapPin,
  ArrowUpRight,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Globe,
} from "lucide-react";

export default function TravelDashboard() {
  const stats = [
    {
      name: "Total Revenue",
      value: "$124,580",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-green-400 to-emerald-500",
      bg: "from-green-50 to-emerald-50",
    },
    {
      name: "Active Bookings",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: Calendar,
      gradient: "from-blue-400 to-cyan-500",
      bg: "from-blue-50 to-cyan-50",
    },
    {
      name: "Total Customers",
      value: "2,847",
      change: "+18.3%",
      trend: "up",
      icon: Users,
      gradient: "from-purple-400 to-pink-500",
      bg: "from-purple-50 to-pink-50",
    },
    {
      name: "Destinations",
      value: "48",
      change: "+5",
      trend: "up",
      icon: MapPin,
      gradient: "from-orange-400 to-red-500",
      bg: "from-orange-50 to-red-50",
    },
  ];

  const recentBookings = [
    {
      id: "BK-3847",
      customer: "Arif Rahman",
      destination: "Maldives Beach Resort",
      date: "Dec 15-22, 2024",
      amount: "$2,850",
      status: "confirmed",
      type: "flight",
      travelers: 2,
    },
    {
      id: "BK-3846",
      customer: "Nusrat Jahan",
      destination: "Dubai City Tour",
      date: "Dec 10-15, 2024",
      amount: "$1,450",
      status: "pending",
      type: "package",
      travelers: 4,
    },
    {
      id: "BK-3845",
      customer: "Kamal Hossain",
      destination: "Thailand Adventure",
      date: "Jan 5-12, 2025",
      amount: "$3,200",
      status: "confirmed",
      type: "package",
      travelers: 2,
    },
    {
      id: "BK-3844",
      customer: "Faria Islam",
      destination: "Singapore Shopping",
      date: "Dec 20-25, 2024",
      amount: "$1,890",
      status: "processing",
      type: "flight",
      travelers: 3,
    },
    {
      id: "BK-3843",
      customer: "Shakib Ahmed",
      destination: "London Historical",
      date: "Feb 1-10, 2025",
      amount: "$4,500",
      status: "confirmed",
      type: "package",
      travelers: 2,
    },
  ];

  const topDestinations = [
    {
      name: "Maldives",
      bookings: 45,
      revenue: "$128,500",
      rating: 4.9,
      image: "🏝️",
      trend: "up",
    },
    {
      name: "Dubai",
      bookings: 38,
      revenue: "$95,400",
      rating: 4.8,
      image: "🏙️",
      trend: "up",
    },
    {
      name: "Thailand",
      bookings: 32,
      revenue: "$87,600",
      rating: 4.7,
      image: "🏯",
      trend: "down",
    },
    {
      name: "Singapore",
      bookings: 28,
      revenue: "$76,300",
      rating: 4.8,
      image: "🌆",
      trend: "up",
    },
  ];

  const upcomingFlights = [
    {
      airline: "Emirates",
      route: "DAC → DXB",
      time: "10:30 AM",
      date: "Dec 15",
      passengers: 2,
    },
    {
      airline: "Thai Airways",
      route: "DAC → BKK",
      time: "02:15 PM",
      date: "Jan 5",
      passengers: 2,
    },
    {
      airline: "Singapore Airlines",
      route: "DAC → SIN",
      time: "11:45 PM",
      date: "Dec 20",
      passengers: 3,
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={stat.name}
            className="relative group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient Background */}
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
              </div>

              <div>
                <p className="text-3xl font-bold mb-1 text-gray-800">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 font-medium">{stat.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Bookings */}
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
                    Booking
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
                {recentBookings.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className="text-sm font-semibold text-[#10172a]">
                          {booking.id}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {booking.date}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className="text-sm font-medium text-gray-800">
                          {booking.customer}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {booking.travelers} travelers
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {booking.destination}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-800">
                        {booking.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "processing"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {booking.status === "confirmed" && (
                          <CheckCircle className="w-3.5 h-3.5" />
                        )}
                        {booking.status === "processing" && (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {booking.status === "pending" && (
                          <AlertCircle className="w-3.5 h-3.5" />
                        )}
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Top Destinations
            </h2>
            <p className="text-sm text-gray-500">Most popular locations</p>
          </div>

          <div className="p-6 space-y-4">
            {topDestinations.map((destination, index) => (
              <div
                key={destination.name}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all cursor-pointer border border-gray-100 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl shadow-md">
                  {destination.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-sm text-gray-800">
                      {destination.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-semibold text-gray-600">
                        {destination.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    {destination.bookings} bookings
                  </p>
                  <p className="text-sm font-bold text-[#10172a]">
                    {destination.revenue}
                  </p>
                </div>
                <div>
                  {destination.trend === "up" ? (
                    <ArrowUpRight className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Flights */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingFlights.map((flight, index) => (
              <div
                key={index}
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
                  <p className="font-bold text-lg">{flight.airline}</p>
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
