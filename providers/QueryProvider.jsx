"use client";

import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import AdminLayout from "@/components/layout/Admin/AdminLayout";
import PageLayout from "@/components/layout/page/PageLayout";
import { CustomToaster } from "@/components/ui/CustomToast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ClientOnlyWrapper({ children }) {
  const queryClient = new QueryClient();
  const pathname = usePathname() || "";
  const isAdminPage = pathname.startsWith("/admin");

  const content = (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      <ToastContainer position="bottom-right" autoClose={300} />
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );

  return isAdminPage ? <AdminLayout>{content}</AdminLayout> : <PageLayout>{content}</PageLayout>;
}
