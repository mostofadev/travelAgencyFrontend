"use client";
import { useState, useMemo, useCallback } from "react";
import {
  LayoutDashboard,
  Plane,
  Users,
  Calendar,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Globe,
  Plus,
  List,
  UserPlus,
  UserCheck,
  Banknote,
  BanknoteXIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

//  SidebarContent 
function SidebarContent({
  isMobile,
  navigation,
  expandedMenus,
  toggleMenu,
  isActiveRoute,
  isParentActive,
  setSidebarOpen,
}) {
  const renderNavItem = (item) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedMenus.includes(item.name);
    const isActive = isActiveRoute(item.href);
    const hasActiveChild = isParentActive(item.submenu);

    return (
      <div key={item.name}>
        {hasSubmenu ? (
          <button
            onClick={() => toggleMenu(item.name)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer ${
              hasActiveChild
                ? "bg-[#10172a] text-white shadow-lg shadow-[#10172a]/20"
                : "text-gray-600 hover:text-[#10172a] hover:bg-gray-50"
            }`}
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
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${hasActiveChild ? "bg-white/20 text-white" : "bg-red-100 text-red-600"}`}
                >
                  {item.badge}
                </span>
              )}
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""} ${hasActiveChild ? "text-white" : "text-gray-400"}`}
              />
            </div>
          </button>
        ) : (
          <Link
            href={item.href}
            onClick={() => isMobile && setSidebarOpen(false)}
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer ${
              isActive
                ? "bg-[#10172a] text-white shadow-lg shadow-[#10172a]/20"
                : "text-gray-600 hover:text-[#10172a] hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon
                className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-[#10172a]"}`}
              />
              <span className="font-medium text-sm">{item.name}</span>
            </div>
            {item.badge && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isActive ? "bg-white/20 text-white" : "bg-red-100 text-red-600"}`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        )}

        {hasSubmenu && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
          >
            <div className="ml-4 pl-4 border-l-2 border-gray-200 space-y-1 py-1">
              {item.submenu.map((subItem) => {
                const isSubActive = isActiveRoute(subItem.href);
                return (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    onClick={() => isMobile && setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150 group ${
                      isSubActive
                        ? "bg-blue-50 text-[#10172a] font-semibold"
                        : "text-gray-600 hover:text-[#10172a] hover:bg-gray-50"
                    }`}
                  >
                    <subItem.icon
                      className={`w-4 h-4 ${isSubActive ? "text-[#10172a]" : "text-gray-400 group-hover:text-[#10172a]"}`}
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
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#10172a] rounded-xl flex items-center justify-center shadow-lg">
            <Plane className="w-6 h-6 text-white transform -rotate-45" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#10172a] tracking-tight">
              Wanderlust
            </h1>
            <p className="text-xs text-gray-500 font-medium">Travel Agency</p>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        {navigation.map((item) => renderNavItem(item))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 cursor-pointer transition-all">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-md">
            MK
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">Mostofa Kamal</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          {!isMobile ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <button className="text-sm font-medium text-gray-700 hover:text-[#10172a]">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── AdminLayout ──────────────────────────────────────────────────────────────
export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [manualToggles, setManualToggles] = useState({});
  const [lastPathname, setLastPathname] = useState(null);
  const pathname = usePathname();

  const isActiveRoute = useCallback(
    (href) => {
      if (!href || href === "#") return false;
      return pathname === href || pathname.startsWith(href + "/");
    },
    [pathname],
  );

  const isParentActive = useCallback(
    (submenu) => {
      if (!submenu) return false;
      return submenu.some((item) => isActiveRoute(item.href));
    },
    [isActiveRoute],
  );

  const navigation = useMemo(
    () => [
      { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
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
          {
            name: "New Package",
            icon: Plus,
            href: "/admin/tour-package/create",
          },
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
          {
            name: "All Aircrafts",
            icon: List,
            href: "/admin/flights/aircrafts",
          },
          {
            name: "New Aircrafts",
            icon: Plus,
            href: "/admin/flights/aircrafts/create",
          },
          {
            name: "All Route",
            icon: List,
            href: "/admin/flights/flight-route",
          },
          {
            name: "New Route",
            icon: Plus,
            href: "/admin/flights/flight-route/create",
          },
          { name: "All Flight", icon: List, href: "/admin/flights" },
          { name: "New Flight", icon: Plus, href: "/admin/flights/create" },
          {
            name: "All Class",
            icon: List,
            href: "/admin/flights/flight-class",
          },
          {
            name: "New Class",
            icon: Plus,
            href: "/admin/flights/flight-class/create",
          },
        ],
      },
      {
        name: "Bank",
        icon: Banknote,
        submenu: [
          { name: "All Bank", icon: List, href: "/admin/bank" },
          { name: "Create Bank", icon: Plus, href: "/admin/bank/create" },
        ],
      },
      {
        name: "Deposit",
        icon: BanknoteXIcon,
        submenu: [{ name: "Deposit", icon: List, href: "/admin/deposit" }],
      },
      {
        name: "Booking",
        icon: Users,
        submenu: [
          { name: "Flight", icon: List, href: "/admin/booking/flight" },
          {
            name: "Tour Package",
            icon: UserPlus,
            href: "/admin/booking/tour",
          },
          {
            name: "Visa",
            icon: UserCheck,
            href: "/admin/booking/visa",
          },
        ],
      },
      {
        name: "Customers",
        icon: Users,
        submenu: [
          { name: "All Customers", icon: List, href: "/admin/customers/all" },
          {
            name: "Add Customer",
            icon: UserPlus,
            href: "/admin/customers/new",
          },
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
    ],
    [],
  );

  // Reset manual toggles on route change — no useEffect needed
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setManualToggles({});
  }

  // Derived expanded state — no useEffect, no setState in effect
  const expandedMenus = useMemo(() => {
    return navigation
      .filter((item) => {
        const manual = manualToggles[item.name];
        if (manual === true) return true;
        if (manual === false) return false;
        return isParentActive(item.submenu) || isActiveRoute(item.href);
      })
      .map((item) => item.name);
  }, [navigation, manualToggles, isParentActive, isActiveRoute]);

  const toggleMenu = useCallback(
    (menuName) => {
      const isCurrentlyExpanded = expandedMenus.includes(menuName);
      setManualToggles((prev) => ({
        ...prev,
        [menuName]: !isCurrentlyExpanded,
      }));
    },
    [expandedMenus],
  );

  const sidebarProps = {
    navigation,
    expandedMenus,
    toggleMenu,
    isActiveRoute,
    isParentActive,
    setSidebarOpen,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 animate-float-delayed" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl hidden lg:block border-r border-gray-100">
        <SidebarContent isMobile={false} {...sidebarProps} />
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
      >
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
        <aside className="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl">
          <SidebarContent isMobile={true} {...sidebarProps} />
        </aside>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
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
                <button className="text-sm font-medium text-gray-700 hover:text-[#10172a]">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

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
