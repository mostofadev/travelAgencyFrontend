"use client";

import { useState } from "react";
import { Plane, FileText, Hotel, Globe } from "lucide-react";

const TABS = [
  { id: "flight", label: "Flights", icon: Plane, disabled: false },
  { id: "visa", label: "Visa", icon: FileText, disabled: false },
  { id: "hotel", label: "Hotel", icon: Hotel, disabled: true },
  { id: "package", label: "Packages", icon: Globe, disabled: false },
];

export default function FilterTabs({ activeTab, onChange }) {
  const [hotelTooltip, setHotelTooltip] = useState(false);

  return (
    <div className="flex rounded-t-2xl bg-white">
      {TABS.map((tab) => {
        const Icon = tab.icon; 

       

        // ── Active Tab Check ─────────────────────────────
        const isActive = activeTab === tab.id;

        return (
          
            <div  key={tab.id} className="" >
              <button
               
                onClick={() => onChange(tab.id)}
                className={`
                flex items-center justify-center gap-2 
              py-2 lg:px-5 px-2 text-sm font-semibold   text-primary
              transition-all duration-200 overflow-hidden
              ${
                isActive
                  ? "text-amber-400 bg-primary text-white"
                  : " text-primary "
              }
            `}
              >
                <Icon size={16} />
                {tab.label}
                {/* Active underline */}
                <span
                  className={`
                absolute bottom-0 left-0 right-0 
                transition-transform duration-300 origin-center
                ${isActive ? "scale-x-100 bg-primary" : "scale-x-0"}
              `}
                />
              </button>
            </div>
        );
      })}
    </div>
  );
}
