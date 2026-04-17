"use client";

export default function TourBookingTabMenu({ activeTab, onChange }) {
  const tabs = [
    { key: "all", label: "All Bookings" },
    { key: "pending", label: "Pending" },
    { key: "processing", label: "Processing" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div
        className="flex items-center gap-2 bg-white rounded-xl p-1.5 border border-gray-100"
        style={{ minWidth: "max-content" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-green-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
