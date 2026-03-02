"use client";

// components/filter/VisaFilterPanel.jsx

import { useState } from "react";
import VisaSelectField from "../SelectField";
import SearchButton from "../SearchButton";
import { Globe, ClipboardList, IdCard, Search } from "lucide-react";
import SelectField from "../SelectField";

const COUNTRIES = [
  { value: "AE", label: "United Arab Emirates", flag: "🇦🇪" },
  { value: "SA", label: "Saudi Arabia", flag: "🇸🇦" },
  { value: "MY", label: "Malaysia", flag: "🇲🇾" },
  { value: "TH", label: "Thailand", flag: "🇹🇭" },
  { value: "US", label: "United States", flag: "🇺🇸" },
  { value: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { value: "CA", label: "Canada", flag: "🇨🇦" },
  { value: "SG", label: "Singapore", flag: "🇸🇬" },
  { value: "AU", label: "Australia", flag: "🇦🇺" },
  { value: "JP", label: "Japan", flag: "🇯🇵" },
];

const CATEGORIES = [
  { value: "tourist", label: "Tourist", desc: "Leisure & sightseeing" },
  { value: "business", label: "Business", desc: "Work & meetings" },
  { value: "student", label: "Student", desc: "Education & study" },
  { value: "umrah", label: "Umrah / Hajj", desc: "Religious pilgrimage" },
  { value: "work", label: "Work Permit", desc: "Employment visa" },
];

const NATIONALITIES = [
  { value: "BD", label: "Bangladeshi", flag: "🇧🇩" },
  { value: "IN", label: "Indian", flag: "🇮🇳" },
  { value: "PK", label: "Pakistani", flag: "🇵🇰" },
  { value: "NP", label: "Nepali", flag: "🇳🇵" },
  { value: "LK", label: "Sri Lankan", flag: "🇱🇰" },
];

export default function VisaFilterPanel() {
  const [country, setCountry] = useState("AE");
  const [category, setCategory] = useState("tourist");
  const [nationality, setNationality] = useState("BD");

  const handleSearch = () => {
    console.log("Visa search:", { country, category, nationality });
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:flex-wrap lg:flex-nowrap gap-3 w-full">

        {/* Destination Country */}
        <div className="w-full sm:flex-1 min-w-0">
          <SelectField
            label="Destination Country"
            icon={<Globe size={18} />}
            options={COUNTRIES}
            value={country}
            onChange={setCountry}
            accentColor="violet"
          />
        </div>

        {/* Visa Category */}
        <div className="w-full sm:flex-1 min-w-0">
          <SelectField
            label="Visa Category"
            icon={<ClipboardList size={18} />}
            options={CATEGORIES}
            value={category}
            onChange={setCategory}
            accentColor="violet"
            showDesc
          />
        </div>

        {/* Traveler Nationality */}
        <div className="w-full sm:flex-1 min-w-0">
          <SelectField
            label="Your Nationality"
            icon={<IdCard size={18} />}
            options={NATIONALITIES}
            value={nationality}
            onChange={setNationality}
            accentColor="violet"
          />
        </div>

        {/* Reusable Search Button */}
        <div className="w-full sm:w-auto sm:flex-shrink-0">
          <SearchButton
            onClick={handleSearch}
            
          >
            <Search className="w-12 h-12" />
          </SearchButton>
        </div>

      </div>
    </div>
  );
}