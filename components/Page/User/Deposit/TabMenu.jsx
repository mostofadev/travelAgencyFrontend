"use client";
import { useRef, useState, useEffect } from "react";

export default function TabMenu({ tabs, activeTab, onChange }) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.value === activeTab);
    const activeEl = tabRefs.current[activeIndex];
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className="relative overflow-x-auto scrollbar-hide">
      <div className="flex" role="tablist">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              ref={(el) => (tabRefs.current[index] = el)}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.value)}
              className={`
                relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none
                ${
                  isActive
                    ? "text-primary  "
                    : "text-gray-500 hover:text-gray-800"
                }
              `}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Sliding indicator */}
      <span
        className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
        style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
      />

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 -z-10" />
    </div>
  );
}
