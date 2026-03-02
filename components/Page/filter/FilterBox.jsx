"use client";

import { useState } from "react";
import FilterTabs from "./FilterTabs";
import FlightFilterPanel from "./Plan/FlightFilterPanel";
import VisaFilterPanel from "./Plan/VisaFilterPanel";
import HotelComingSoon from "./HotelComingSoon";
import PackageFilterPanel from "./Plan/PackageFilterPanel";

export default function FilterBox() {
  const [activeTab, setActiveTab] = useState("flight");

  const handleTabChange = (tabId) => {
    if (tabId !== "hotel") setActiveTab(tabId);
  };

  return (
    <div
      className="bg-white border-none rounded-2xl "
      style={{
        boxShadow:
          "0 20px 80px rgba(10, 22, 40, 0.16), 0 0 0 1px rgba(201, 168, 76, 0.1)",
      }}
    >
      {/* ── Tab Navigation ── */}
      <FilterTabs activeTab={activeTab} onChange={handleTabChange} />

      {/* ── Panel Area ── */}
      <div className="border-none py-6 px-0 lg:px-6 ">
        {activeTab === "flight" && <FlightFilterPanel />}
        {activeTab === "visa" && <VisaFilterPanel />}
        {activeTab === "hotel" && <HotelComingSoon />}
        {activeTab === "package" && <PackageFilterPanel />}
      </div>
    </div>
  );
}
