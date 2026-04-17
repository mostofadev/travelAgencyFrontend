"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, FileCheck, Loader2, SearchX } from "lucide-react";
import { useVisaBookingById } from "@/hooks/Page/useVisaApplication";
import VisaHeroCard from "@/components/Page/User/VisaApplication/Detail/VisaHeroCard";
import ContactInfoCard from "@/components/Page/User/VisaApplication/Detail/ContactInfoCard";
import ApplicantsList from "@/components/Page/User/VisaApplication/Detail/ApplicantsList";
import VisaActions from "@/components/Page/User/VisaApplication/Detail/VisaActions";

export default function VisaApplicationDetailPage() {
  const { id } = useParams();
  const { booking, isLoading, isError } = useVisaBookingById(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-32 text-slate-400">
        <Loader2 size={20} className="animate-spin" />
        <span>Loading application...</span>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="text-center py-32 text-slate-400">
        <SearchX size={40} className="mx-auto mb-3 text-slate-300" />
        <p className="font-medium text-slate-600">Application not found</p>
        <Link
          href="/user/visa/applications"
          className="inline-flex items-center gap-1 text-blue-600 text-sm hover:underline mt-2"
        >
          <ChevronLeft size={14} /> Back to applications
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link
          href="/user/visa/applications"
          className="inline-flex items-center gap-1 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft size={14} /> All Applications
        </Link>
        <span className="text-slate-300">/</span>
        <span className="inline-flex items-center gap-1.5 text-slate-800 font-bold">
          <FileCheck size={14} className="text-emerald-500" />
          {booking.application_reference}
        </span>
      </div>

      <VisaHeroCard application={booking} />
      <ContactInfoCard contact={booking.contact} />
      <ApplicantsList applicants={booking.applicants ?? []} />
      <VisaActions application={booking} />
    </div>
  );
}
