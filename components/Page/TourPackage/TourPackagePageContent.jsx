"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PackageFilterPanel from "@/components/ui/filter/Plan/PackageFilterPanel";
import TourPackageList from "@/components/Page/TourPackage/TourPackageList";
import Section from "@/components/ui/Section";

export default function TourPackagePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [overrideFilters, setOverrideFilters] = useState(null);
  const [page, setPage] = useState(1);

  const urlFilters = useMemo(
    () => ({
      destination_country_id:
        searchParams.get("destination_country_id") || undefined,
      origin_country_id: searchParams.get("origin_country_id") || undefined,
      package_type: searchParams.get("package_type") || undefined,
    }),
    [searchParams],
  );

  const filters = useMemo(
    () => ({
      ...(overrideFilters ?? urlFilters),
      per_page: 12,
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
    router.replace(`/tour${params.toString() ? `?${params.toString()}` : ""}`, {
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
      <div className="py-3 my-6 shadow-lg">
        <PackageFilterPanel onSearch={handleSearch} />
      </div>
      <TourPackageList filters={filters} onPageChange={handlePageChange} />
    </Section>
  );
}
