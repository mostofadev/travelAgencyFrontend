"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import VisaFilterPanel from "@/components/ui/filter/Plan/VisaFilterPanel";
import VisaList from "@/components/Page/Visa/VisaList";
import Section from "@/components/ui/Section";

export default function VisaPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [overrideFilters, setOverrideFilters] = useState(null);
  const [page, setPage] = useState(1);

  const urlFilters = useMemo(
    () => ({
      destination_country_id:
        searchParams.get("destination_country_id") || undefined,
      visa_type_id: searchParams.get("visa_type_id") || undefined,
      country_id: searchParams.get("country_id") || undefined,
    }),
    [searchParams],
  );

  const filters = useMemo(
    () => ({
      ...(overrideFilters ?? urlFilters),
      per_page: 10,
      page,
    }),
    [overrideFilters, urlFilters, page],
  );

  const handleSearch = (newFilters) => {
    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries(newFilters).filter(([, v]) => v !== undefined),
      ),
    );
    router.replace(`/visa${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
    setOverrideFilters(newFilters);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Section>
      <div className="py-3 px-3 my-6 shadow-lg">
        <VisaFilterPanel onSearch={handleSearch} />
      </div>
      <VisaList filters={filters} onPageChange={handlePageChange} />
    </Section>
  );
}
