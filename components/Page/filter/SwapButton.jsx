"use client";

// components/filter/SwapButton.jsx
// ─────────────────────────────────────────────────────────────────────────────
// From ↔ To swap করার button।
// Click করলে smooth 180° rotate animation হয়।
//
// Props:
//   onClick → swap করার function (LocationInput থেকে আসে)
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";

export default function SwapButton({ onClick }) {
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    // Animate করি
    setSpinning(true);
    // Parent কে বলি swap করতে
    onClick();
    // Animation শেষ হলে reset
    setTimeout(() => setSpinning(false), 480);
  };

  return (
    <button
      onClick={handleClick}
      title="From ↔ To swap করুন"
      className="
        relative z-10 flex-shrink-0
        w-9 h-9 rounded-full bg-white
        border-2 border-blue-100
        hover:border-blue-400 hover:bg-blue-50
        shadow-md flex items-center justify-center
        text-blue-500
        hover:scale-110 active:scale-95
        transition-colors duration-200
      "
      style={{
        // Rotation টা inline style এ দিচ্ছি কারণ dynamic value
        transform: spinning ? "rotate(180deg)" : "rotate(0deg)",
        transition: spinning
          ? "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "transform 0.3s ease, border-color 0.2s, background 0.2s",
      }}
    >
      <svg
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Up arrow (From side) */}
        <path d="M7 16V4m0 0L3 8m4-4l4 4" />
        {/* Down arrow (To side) */}
        <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    </button>
  );
}
