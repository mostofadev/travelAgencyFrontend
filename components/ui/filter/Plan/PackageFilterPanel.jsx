"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { Map, Backpack, Globe, Search } from "lucide-react";
import SelectField from "../SelectField";
import SearchButton from "../SearchButton";
import { useVisaFormCountries } from "@/hooks/Admin/useForm";

const LOADING_OPTION = [{ value: "", label: "Loading…" }];
const ALL_DESTINATION = { value: "", label: "All Destinations" };
const ALL_TYPES = { value: "", label: "All Types" };
const ALL_NATIONALS = { value: "", label: "Any Nationality" };

const PACKAGE_TYPE_OPTIONS = [
  ALL_TYPES,
  { value: "honeymoon", label: "🏝 Honeymoon" },
  { value: "family", label: "👨‍👩‍👧 Family" },
  { value: "adventure", label: "🏔 Adventure" },
  { value: "religious", label: "🕌 Religious / Umrah" },
  { value: "domestic", label: "🏡 Domestic" },
  { value: "international", label: "✈️ International" },
  { value: "beach", label: "🏖 Beach" },
  { value: "cultural", label: "🏛 Cultural" },
  { value: "corporate", label: "💼 Corporate" },
];

export default function PackageFilterPanel({ onSearch }) {
  const router = useRouter();

  const [destinationCountryId, setDestinationCountryId] = useState("");
  const [packageType, setPackageType] = useState("");
  const [nationalCountryId, setNationalCountryId] = useState("");

  const { data: countriesData, isLoading: countriesLoading } =
    useVisaFormCountries();

  const destinationOptions = countriesLoading
    ? LOADING_OPTION
    : [
        ALL_DESTINATION,
        ...(countriesData?.data ?? []).map(({ id, name }) => ({
          value: String(id),
          label: name,
        })),
      ];

  const nationalityOptions = countriesLoading
    ? LOADING_OPTION
    : [
        ALL_NATIONALS,
        ...(countriesData?.data ?? []).map(({ id, name }) => ({
          value: String(id),
          label: name,
        })),
      ];

  // ── Search ────────────────────────────────────────────────
  const handleSearch = () => {
    const filters = {
      destination_country_id: destinationCountryId || undefined,
      package_type: packageType || undefined,
      origin_country_id: nationalCountryId || undefined,
    };

    if (onSearch) {
      onSearch(filters);
    } else {
      const params = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).filter(([, v]) => v !== undefined),
        ),
      );
      router.push(`/tour${params.toString() ? `?${params.toString()}` : ""}`);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:flex-wrap lg:flex-nowrap gap-3 w-full">
        <div className="w-full sm:flex-1 min-w-0">
          <SelectField
            label="Destination"
            icon={<Map size={18} />}
            options={destinationOptions}
            value={destinationCountryId}
            onChange={setDestinationCountryId}
            accentColor="emerald"
          />
        </div>

        <div className="w-full sm:flex-1 min-w-0">
          <SelectField
            label="Package Type"
            icon={<Backpack size={18} />}
            options={PACKAGE_TYPE_OPTIONS}
            value={packageType}
            onChange={setPackageType}
            accentColor="emerald"
          />
        </div>

        <div className="w-full sm:flex-1 min-w-0">
          <SelectField
            label="Your Nationality"
            icon={<Globe size={18} />}
            options={nationalityOptions}
            value={nationalCountryId}
            onChange={setNationalCountryId}
            accentColor="emerald"
          />
        </div>

        <div className="w-full sm:w-auto sm:flex-shrink-0">
          <SearchButton onClick={handleSearch}>
            <Search className="w-6 h-6" />
          </SearchButton>
        </div>
      </div>
    </div>
  );
}
