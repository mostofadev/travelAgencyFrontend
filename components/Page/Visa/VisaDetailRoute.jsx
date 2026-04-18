"use client";

import { useParams } from "next/navigation";
import VisaDetailPage from "@/components/Page/Visa/VisaDetailPage";
import { useVisa } from "@/hooks/Page/usePageVisa";
import Section from "@/components/ui/Section";

function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[360px] bg-slate-200" />
      <div className="max-w-[1180px] mx-auto px-5 pt-7 flex gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 bg-slate-100 rounded-2xl" />
            ))}
          </div>
          <div className="h-36 bg-slate-100 rounded-2xl" />
          <div className="h-52 bg-slate-100 rounded-2xl" />
        </div>
        <div className="w-[300px] shrink-0">
          <div className="h-96 bg-slate-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

function DetailError({ message }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="text-center p-10 bg-red-50 border border-red-200 rounded-2xl max-w-sm">
        <p className="text-4xl mb-3">⚠️</p>
        <p className="font-bold text-red-800">Failed to load visa</p>
        <p className="text-sm text-red-600 mt-1">{message}</p>
      </div>
    </div>
  );
}

export default function VisaDetailRoute() {
  const { id } = useParams();
  const { visa, related, isLoading, isError, error } = useVisa(id);

  if (isLoading) return <DetailSkeleton />;
  if (isError) return <DetailError message={error?.message} />;

  return (
    <Section>
      <VisaDetailPage visa={visa} related={related} />
    </Section>
  );
}
