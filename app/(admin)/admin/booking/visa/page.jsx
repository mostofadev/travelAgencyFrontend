// app/user/visa-applications/page.jsx
"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import VisaApplicationStatsBar from "@/components/Page/User/VisaApplication/VisaApplicationStatsBar";
import VisaApplicationTabMenu from "@/components/Page/User/VisaApplication/VisaApplicationTabMenu";
import AdminVisaApplicationTable from "@/components/forms/Admin/Booking/Visa/AdminVisaBookingTable";
import { useAdminVisaApplications } from "@/hooks/Admin/useBooking";

export default function VisaApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { data: applications, isLoading } = useAdminVisaApplications();
  
const validApplications = applications?.data?.data ?? [];
  const filtered =
    activeTab === "all"
      ? validApplications
      : validApplications.filter((app) => app.current_status === activeTab);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <FileText size={20} className="text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Visa Applications
            </h1>
            <p className="text-sm text-slate-400">Your All Visa Applications</p>
          </div>
        </div>
      </div>

      <VisaApplicationStatsBar applications={validApplications} />
      <VisaApplicationTabMenu activeTab={activeTab} onChange={setActiveTab} />
      <AdminVisaApplicationTable data={filtered} isLoading={isLoading} />
    </div>
  );
}
