"use client";

import { useState } from "react";
import {
  FileText,
  LayoutGrid,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useVisaBookings } from "@/hooks/Page/useVisaApplication";
import VisaApplicationStatsBar from "@/components/Page/User/VisaApplication/VisaApplicationStatsBar";
import VisaApplicationTable from "@/components/Page/User/VisaApplication/VisaApplicationTable";
import BookingTabMenu from "@/components/ui/booking/BookingTabMenu";

const VISA_TABS = [
  { value: "all", label: "All", Icon: LayoutGrid },
  { value: "pending", label: "Pending", Icon: Clock },
  { value: "approved", label: "Approved", Icon: CheckCircle2 },
  { value: "rejected", label: "Rejected", Icon: XCircle },
];

export default function VisaApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useVisaBookings(page);
  const applications = Array.isArray(response?.data?.data) ? response.data.data : [];
const meta = response?.data ?? null;


  const filtered =
    activeTab === "all"
      ? applications
      : applications.filter((app) => app.current_status === activeTab);

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

      <VisaApplicationStatsBar applications={applications} />

      <BookingTabMenu
        activeTab={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          setPage(1);
        }}
        tabs={VISA_TABS}
      />

      <VisaApplicationTable
        data={filtered}
        isLoading={isLoading}
        meta={meta}
        onPageChange={setPage}
      />
    </div>
  );
}
