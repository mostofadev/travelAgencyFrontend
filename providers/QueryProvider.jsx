"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

import AdminLayout from "@/components/layout/Admin/AdminLayout";
import UserLayout from "@/components/layout/User/UserLayout";
import PageLayout from "@/components/layout/page/PageLayout";

function AppLayout({ pathname, children }) {
  if (pathname.startsWith("/admin"))
    return <AdminLayout>{children}</AdminLayout>;
  if (pathname.startsWith("/user")) return <UserLayout>{children}</UserLayout>;
  return <PageLayout>{children}</PageLayout>;
}

export default function ClientOnlyWrapper({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname() ?? "";

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      <ToastContainer position="bottom-right" autoClose={300} />
      <AppLayout pathname={pathname}>{children}</AppLayout>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
