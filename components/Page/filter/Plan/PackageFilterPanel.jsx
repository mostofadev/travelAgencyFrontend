"use client";

// components/filter/PackageFilterPanel.jsx

import { useState } from "react";
import SelectField from "../SelectField";
import SearchButton from "../SearchButton";
import { Map, Backpack, Wallet, Search } from "lucide-react";

const DESTINATIONS = [
  { value: "all", label: "All Destinations" },
  { value: "MV", label: "🇲🇻 Maldives" },
  { value: "TH", label: "🇹🇭 Thailand" },
  { value: "ID", label: "🇮🇩 Bali, Indonesia" },
  { value: "SA", label: "🇸🇦 Umrah, Saudi Arabia" },
  { value: "AE", label: "🇦🇪 Dubai" },
  { value: "EU", label: "🇪🇺 Europe" },
  { value: "NP", label: "🇳🇵 Nepal" },
];

const PACKAGE_TYPES = [
  { value: "all", label: "All Types" },
  { value: "honeymoon", label: "🏝 Honeymoon" },
  { value: "family", label: "👨‍👩‍👧 Family" },
  { value: "umrah", label: "🕌 Umrah" },
  { value: "adventure", label: "🏔 Adventure" },
  { value: "corporate", label: "💼 Corporate" },
];

const BUDGETS = [
  { value: "any", label: "Any Budget" },
  { value: "50k", label: "Under 50,000 BDT" },
  { value: "1lac", label: "50,000 – 1 Lac BDT" },
  { value: "2lac", label: "1 – 2 Lac BDT" },
  { value: "2lac+", label: "2 Lac+ BDT" },
];

export default function PackageFilterPanel() {
  const [destination, setDestination] = useState("all");
  const [packageType, setPackageType] = useState("all");
  const [budget, setBudget] = useState("any");

  const handleSearch = () => {
    console.log("Package search:", { destination, packageType, budget });
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:flex-wrap lg:flex-nowrap gap-3 w-full">
        {/* Destination */}
        <div className="w-full sm:flex-1 min-w-0">
          <SelectField
            label="Destination"
            icon={<Map size={18} />}
            options={DESTINATIONS}
            value={destination}
            onChange={setDestination}
            accentColor="emerald"
          />
        </div>

        {/* Package Type */}
        <div className="w-full sm:flex-1 min-w-0">
          <SelectField
            label="Package Type"
            icon={<Backpack size={18} />}
            options={PACKAGE_TYPES}
            value={packageType}
            onChange={setPackageType}
            accentColor="emerald"
          />
        </div>

        {/* Budget */}
        <div className="w-full sm:flex-1 min-w-0">
          <SelectField
            label="Budget (BDT)"
            icon={<Wallet size={18} />}
            options={BUDGETS}
            value={budget}
            onChange={setBudget}
            accentColor="emerald"
          />
        </div>

        {/* Reusable Search Button */}
        <div className="w-full sm:w-auto sm:flex-shrink-0">
          <SearchButton
            onClick={handleSearch}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Search className="w-6 h-6" />
          </SearchButton>
        </div>
      </div>
    </div>
  );
}
