"use client";

import DashboardStatsBar from "@/components/Page/User/Dashboard/DashboardStatsBar";
import QuickActions from "@/components/Page/User/Dashboard/QuickActions";
import RecentBookingsTable from "@/components/Page/User/Dashboard/RecentBookingsTable";
import UpcomingTrips from "@/components/Page/User/Dashboard/UpcomingTrips";
import WalletCard from "@/components/Page/User/Dashboard/WalletCard";
import { useAuth } from "@/hooks/AuthUser";
import { useDashboard } from "@/hooks/Page/useUserDashboard";
import { jwtManager } from "@/lib/auth/jwt";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading } = useDashboard();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  useEffect(() => {
    const authed = jwtManager.isUserAuthenticated();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthenticated(authed);

    if (!authed) {
      const currentUrl = `/user/dashboard?${searchParams.toString()}`;
      router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
    }

    setMounted(true);
  }, [router, searchParams]);

  if (!mounted || !isAuthenticated) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome back, {user?.name?.split(" ")[0] ?? "Traveller"} 👋
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Here&apos;s what&apos;s happening with your travel plans.
        </p>
      </div>

      <DashboardStatsBar stats={data?.stats} isLoading={isLoading} />
      <QuickActions />
      <UpcomingTrips trips={data?.upcomingTrips} isLoading={isLoading} />
      <WalletCard
        transactions={data?.wallet?.transactions}
        pending={data?.wallet?.pendingDeposits}
        balance={data?.wallet?.balance}
        isLoading={isLoading}
      />
      <RecentBookingsTable
        bookings={data?.recentBookings}
        isLoading={isLoading}
      />
    </div>
  );
}
