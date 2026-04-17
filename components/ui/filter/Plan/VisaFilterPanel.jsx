
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, ClipboardList, IdCard, Search } from "lucide-react";
import SelectField from "../SelectField";
import SearchButton from "../SearchButton";
import { useVisaFormCountries, useVisaFormTypes } from "@/hooks/Admin/useForm";

const LOADING_OPTION = [{ value: "", label: "Loading…" }];
const ALL_COUNTRIES = { value: "", label: "All Countries" };
const ALL_TYPES = { value: "", label: "All Types" };
const ALL_NATIONALS = { value: "", label: "Any Nationality" };

export default function VisaFilterPanel({ onSearch }) {
  const router = useRouter();

  const [destinationCountryId, setDestinationCountryId] = useState("");
  const [visaTypeId, setVisaTypeId] = useState("");
  const [countryId, setCountryId] = useState("");

  const { data: countriesData, isLoading: countriesLoading } =
    useVisaFormCountries();
  const { data: visaTypesData, isLoading: visaTypesLoading } =
    useVisaFormTypes();

  const countryOptions = countriesLoading
    ? LOADING_OPTION
    : [
        ALL_COUNTRIES,
        ...(countriesData?.data ?? []).map(({ id, name }) => ({
          value: String(id),
          label: name,
        })),
      ];

  const visaTypeOptions = visaTypesLoading
    ? LOADING_OPTION
    : [
        ALL_TYPES,
        ...(visaTypesData?.data ?? []).map(({ id, name }) => ({
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
      visa_type_id: visaTypeId || undefined,
      country_id: countryId || undefined,
    };

    if (onSearch) {
      onSearch(filters);
    } else {
      const params = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).filter(([, v]) => v !== undefined),
        ),
      );
      router.push(`/visa${params.toString() ? `?${params.toString()}` : ""}`);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:flex-wrap lg:flex-nowrap gap-3 w-full">
        <div className="w-full sm:flex-1 min-w-0">
          <SelectField
            label="Destination Country"
            icon={<Globe size={18} />}
            options={countryOptions}
            value={destinationCountryId}
            onChange={setDestinationCountryId}
            accentColor="violet"
          />
        </div>

        <div className="w-full sm:flex-1 min-w-0">
          <SelectField
            label="Visa Category"
            icon={<ClipboardList size={18} />}
            options={visaTypeOptions}
            value={visaTypeId}
            onChange={setVisaTypeId}
            accentColor="violet"
            showDesc
          />
        </div>

        <div className="w-full sm:flex-1 min-w-0">
          <SelectField
            label="Your Nationality"
            icon={<IdCard size={18} />}
            options={nationalityOptions}
            value={countryId}
            onChange={setCountryId}
            accentColor="violet"
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
