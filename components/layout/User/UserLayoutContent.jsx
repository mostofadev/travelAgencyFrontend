"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Plane,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Eye,
  UserCheck,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useWalletBalance } from "@/hooks/Page/useWallet";
import { useUserLogout } from "@/hooks/AuthUser";
import { jwtManager } from "@/lib/auth/jwt";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/user/dashboard" },
  {
    name: "Flight Booking",
    icon: LayoutDashboard,
    href: "/user/flight/booking",
  },
  { name: "Visa Booking", icon: LayoutDashboard, href: "/user/visa/booking" },
  {
    name: "Tour Package Booking",
    icon: LayoutDashboard,
    href: "/user/tour/booking",
  },
  { name: "Deposit", icon: LayoutDashboard, href: "/user/deposit" },
  {
    name: "Settings",
    icon: Settings,
    submenu: [
      { name: "General", icon: Settings, href: "" },
      { name: "Profile", icon: UserCheck, href: "" },
      { name: "Notifications", icon: Bell, href: "" },
      { name: "Security", icon: Eye, href: "" },
    ],
  },
];

function checkActiveRoute(pathname, href) {
  if (!href || href === "#") return false;
  return pathname === href || pathname.startsWith(href + "/");
}

function checkParentActive(pathname, submenu) {
  if (!submenu) return false;
  return submenu.some((item) => checkActiveRoute(pathname, item.href));
}

export default function UserLayoutContent({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [manuallyToggled, setManuallyToggled] = useState([]);
  const pathname = usePathname();
  const { data: walletData } = useWalletBalance();
  const balance = walletData?.balance ?? "0.00 BDT";
  const [isReady, setIsReady] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user_data");
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (!jwtManager.isUserAuthenticated()) {
      const currentUrl = `${pathname}?${searchParams.toString()}`;
      router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReady(true);
    }
  }, [router, searchParams, pathname]);

  const { mutate: logout, isPending: isLoggingOut } = useUserLogout();

  const expandedMenus = useMemo(() => {
    const autoExpanded = navigation
      .filter(
        (item) =>
          checkParentActive(pathname, item.submenu) ||
          checkActiveRoute(pathname, item.href),
      )
      .map((item) => item.name);

    const merged = new Set(autoExpanded);
    manuallyToggled.forEach((name) => {
      if (merged.has(name)) {
        merged.delete(name);
      } else {
        merged.add(name);
      }
    });
    return [...merged];
  }, [pathname, manuallyToggled]);

  const toggleMenu = (menuName) => {
    setManuallyToggled((prev) =>
      prev.includes(menuName)
        ? prev.filter((m) => m !== menuName)
        : [...prev, menuName],
    );
  };

  const renderNavItem = (item, isMobile = false) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedMenus.includes(item.name);
    const isActive = checkActiveRoute(pathname, item.href);
    const hasActiveChild = checkParentActive(pathname, item.submenu);

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
                const isSubActive = checkActiveRoute(pathname, subItem.href);
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

  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 animate-float-delayed" />
      </div>

      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl hidden lg:block border-r border-gray-100">
        <div className="flex flex-col h-full">
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

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
            {navigation.map((item) => renderNavItem(item, false))}
          </nav>

          <div className="p-4 border-t border-gray-100 space-y-2">
            <button
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 group disabled:opacity-50"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </span>
            </button>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 cursor-pointer transition-all">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-md">
                MK
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {user ? user.name : "Loading..."}
                </p>
                <p className="text-xs text-gray-500">User</p>
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
              <button
                onClick={() => logout()}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </span>
              </button>
            </div>
          </div>
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
              <p className="py-1 px-6 bg-gray-900 rounded-lg text-sm text-white">
                <span>৳</span> {balance}
              </p>
              <div className="hidden md:flex items-center gap-3 pl-3 ml-3 border-l border-gray-200">
                <button
                  onClick={() => logout()}
                  disabled={isLoggingOut}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
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
