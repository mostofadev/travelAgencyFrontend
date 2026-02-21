"use client";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Plane,
  MapPin,
  Users,
  Calendar,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Hotel,
  Briefcase,
  Globe,
  MessageCircle,
  FileText,
  CreditCard,
  Plus,
  List,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  UserPlus,
  UserCheck,
  MapPinned,
  Building,
  Palmtree,
  Ship,
  Package,
  Receipt,
  BarChart3,
  PieChart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState([]);
  const pathname = usePathname();

  // Check if a route is active
  const isActiveRoute = (href) => {
    if (!href || href === "#") return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Check if parent menu has active child
  const isParentActive = (submenu) => {
    if (!submenu) return false;
    return submenu.some((item) => isActiveRoute(item.href));
  };

  const navigation = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      name: "Visa",
      icon: Calendar,
      submenu: [
        { name: "All Visa Types", icon: List, href: "/admin/visa/visa-type" },
        {
          name: "Add Visa Type",
          icon: Plus,
          href: "/admin/visa/visa-type/create",
        },
        { name: "All Visas", icon: Globe, href: "/admin/visa" },
        { name: "Add Visa", icon: Plus, href: "/admin/visa/create" },
      ],
    },
    {
      name: "Tour Package",
      icon: Calendar,
      submenu: [
        { name: "All packages", icon: List, href: "/admin/tour-package" },
        { name: "New Package", icon: Plus, href: "/admin/tour-package/create" },
      ],
    },

    {
      name: "Flights",
      icon: Plane,
      submenu: [
        { name: "All Airports", icon: List, href: "/admin/flights/airports" },
        {
          name: "New Airports",
          icon: Plus,
          href: "/admin/flights/airports/create",
        },
        { name: "All Aircrafts", icon: List, href: "/admin/flights/aircrafts" },
        {
          name: "New Aircrafts",
          icon: Plus,
          href: "/admin/flights/aircrafts/create",
        },
        { name: "All Route", icon: List, href: "/admin/flights/flight-route" },
        {
          name: "New Route",
          icon: Plus,
          href: "/admin/flights/flight-route/create",
        },
        { name: "All Flight", icon: List, href: "/admin/flights" },
        {
          name: "New Flight",
          icon: Plus,
          href: "/admin/flights/create",
        },
      ],
    },
    {
      name: "Destinations",
      icon: MapPin,
      submenu: [
        {
          name: "All Destinations",
          icon: Globe,
          href: "/admin/destinations/all",
        },
        {
          name: "Add Destination",
          icon: MapPinned,
          href: "/admin/destinations/new",
        },
        {
          name: "Popular Places",
          icon: Palmtree,
          href: "/admin/destinations/popular",
        },
        {
          name: "Beach Resorts",
          icon: Palmtree,
          href: "/admin/destinations/beach",
        },
        {
          name: "City Tours",
          icon: Building,
          href: "/admin/destinations/city",
        },
      ],
    },
    {
      name: "Hotels",
      icon: Hotel,
      submenu: [
        { name: "All Hotels", icon: Building, href: "/admin/hotels/all" },
        { name: "Add Hotel", icon: Plus, href: "/admin/hotels/new" },
        {
          name: "Reservations",
          icon: Calendar,
          href: "/admin/hotels/reservations",
        },
        { name: "Room Types", icon: List, href: "/admin/hotels/rooms" },
      ],
    },
    {
      name: "Customers",
      icon: Users,
      submenu: [
        { name: "All Customers", icon: List, href: "/admin/customers/all" },
        { name: "Add Customer", icon: UserPlus, href: "/admin/customers/new" },
        {
          name: "VIP Customers",
          icon: UserCheck,
          href: "/admin/customers/vip",
        },
        {
          name: "Customer Groups",
          icon: Users,
          href: "/admin/customers/groups",
        },
      ],
    },
    {
      name: "Tours",
      icon: Globe,
      submenu: [
        { name: "All Tours", icon: List, href: "/admin/tours/all" },
        { name: "Create Tour", icon: Plus, href: "/admin/tours/new" },
        { name: "Group Tours", icon: Users, href: "/admin/tours/group" },
        {
          name: "Private Tours",
          icon: UserCheck,
          href: "/admin/tours/private",
        },
      ],
    },
    {
      name: "Packages",
      icon: Briefcase,
      submenu: [
        { name: "All Packages", icon: List, href: "/admin/packages/all" },
        { name: "Create Package", icon: Plus, href: "/admin/packages/new" },
        {
          name: "Holiday Packages",
          icon: Palmtree,
          href: "/admin/packages/holiday",
        },
        { name: "Honeymoon", icon: Ship, href: "/admin/packages/honeymoon" },
        { name: "Adventure", icon: Package, href: "/admin/packages/adventure" },
      ],
    },
    {
      name: "Payments",
      icon: CreditCard,
      submenu: [
        { name: "All Transactions", icon: List, href: "/admin/payments/all" },
        {
          name: "Pending Payments",
          icon: Eye,
          href: "/admin/payments/pending",
        },
        { name: "Invoices", icon: Receipt, href: "/admin/payments/invoices" },
        { name: "Refunds", icon: DollarSign, href: "/admin/payments/refunds" },
      ],
    },
    {
      name: "Messages",
      icon: MessageCircle,
      badge: "5",
      submenu: [
        { name: "Inbox", icon: List, href: "/admin/messages/inbox" },
        { name: "Sent", icon: Eye, href: "/admin/messages/sent" },
        { name: "Compose", icon: Plus, href: "/admin/messages/compose" },
      ],
    },
    {
      name: "Reports",
      icon: FileText,
      submenu: [
        { name: "Sales Report", icon: BarChart3, href: "/admin/reports/sales" },
        {
          name: "Booking Analytics",
          icon: PieChart,
          href: "/admin/reports/bookings",
        },
        {
          name: "Revenue Report",
          icon: DollarSign,
          href: "/admin/reports/revenue",
        },
        {
          name: "Customer Report",
          icon: Users,
          href: "/admin/reports/customers",
        },
      ],
    },
    {
      name: "Settings",
      icon: Settings,
      submenu: [
        { name: "General", icon: Settings, href: "/admin/settings/general" },
        { name: "Profile", icon: UserCheck, href: "/admin/settings/profile" },
        {
          name: "Notifications",
          icon: Bell,
          href: "/admin/settings/notifications",
        },
        { name: "Security", icon: Eye, href: "/admin/settings/security" },
      ],
    },
  ];

  const toggleMenu = (menuName) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((m) => m !== menuName)
        : [...prev, menuName],
    );
  };
  // Auto-expand menus with active routes
  useEffect(() => {
    const activeMenus = navigation
      .filter(
        (item) => isParentActive(item.submenu) || isActiveRoute(item.href),
      )
      .map((item) => item.name);

    setExpandedMenus(activeMenus);
  }, [pathname]);

  const renderNavItem = (item, isMobile = false) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedMenus.includes(item.name);
    const isActive = isActiveRoute(item.href);
    const hasActiveChild = isParentActive(item.submenu);

    return (
      <div key={item.name}>
        {/* Main Menu Item */}
        {hasSubmenu ? (
          <button
            onClick={() => toggleMenu(item.name)}
            className={`
              w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer
              ${
                hasActiveChild
                  ? "bg-[#10172a] text-white shadow-lg shadow-[#10172a]/20"
                  : "text-gray-600 hover:text-[#10172a] hover:bg-gray-50"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <item.icon
                className={`w-5 h-5 ${hasActiveChild ? "text-white" : "text-gray-400 group-hover:text-[#10172a]"}`}
              />
              <span className="font-medium text-sm">{item.name}</span>
            </div>

            <div className="flex items-center gap-2">
              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    hasActiveChild
                      ? "bg-white/20 text-white"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.badge}
                </span>
              )}
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? "rotate-90" : ""
                } ${hasActiveChild ? "text-white" : "text-gray-400"}`}
              />
            </div>
          </button>
        ) : (
          <Link
            href={item.href}
            onClick={() => isMobile && setSidebarOpen(false)}
            className={`
              flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer
              ${
                isActive
                  ? "bg-[#10172a] text-white shadow-lg shadow-[#10172a]/20"
                  : "text-gray-600 hover:text-[#10172a] hover:bg-gray-50"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <item.icon
                className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-[#10172a]"}`}
              />
              <span className="font-medium text-sm">{item.name}</span>
            </div>

            {item.badge && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        )}

        {/* Submenu */}
        {hasSubmenu && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
            }`}
          >
            <div className="ml-4 pl-4 border-l-2 border-gray-200 space-y-1 py-1">
              {item.submenu.map((subItem) => {
                const isSubActive = isActiveRoute(subItem.href);

                return (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    onClick={() => isMobile && setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150 group
                      ${
                        isSubActive
                          ? "bg-blue-50 text-[#10172a] font-semibold"
                          : "text-gray-600 hover:text-[#10172a] hover:bg-gray-50"
                      }
                    `}
                  >
                    <subItem.icon
                      className={`w-4 h-4 ${
                        isSubActive
                          ? "text-[#10172a]"
                          : "text-gray-400 group-hover:text-[#10172a]"
                      }`}
                    />
                    <span className="text-sm">{subItem.name}</span>
                    {isSubActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#10172a]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 animate-float-delayed" />
      </div>

      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl hidden lg:block border-r border-gray-100">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-20 flex items-center px-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#10172a] rounded-xl flex items-center justify-center shadow-lg">
                <Plane className="w-6 h-6 text-white transform -rotate-45" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#10172a] tracking-tight">
                  Wanderlust
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Travel Agency
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
            {navigation.map((item) => renderNavItem(item, false))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 cursor-pointer transition-all">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-md">
                MK
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  Mostofa Kamal
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
      >
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
        <aside className="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl">
          <div className="flex flex-col h-full">
            <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#10172a] rounded-xl flex items-center justify-center shadow-lg">
                  <Plane className="w-6 h-6 text-white transform -rotate-45" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#10172a] tracking-tight">
                    Wanderlust
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">
                    Travel Agency
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
              {navigation.map((item) => renderNavItem(item, true))}
            </nav>

            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 cursor-pointer">
                <div className="flex-1">
                  <button className="text-sm font-medium text-gray-700 hover:text-[#10172a]">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-40 h-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
          <div className="h-full px-4 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations, bookings..."
                  className="w-96 pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10172a] focus:border-transparent transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors group">
                <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#10172a]" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>

              <div className="hidden md:flex items-center gap-3 pl-3 ml-3 border-l border-gray-200">
                <div className="flex-1">
                  <button className="text-sm font-medium text-gray-700 hover:text-[#10172a]">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8 relative z-10">{children}</main>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap");

        * {
          font-family:
            "Poppins",
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Outfit", sans-serif;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, -20px);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
