"use client";

// components/banner/SliderArrows.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Banner slider এর Prev / Next arrow buttons।
//
// Props:
//   onPrev → function — previous slide এ যাওয়ার function
//   onNext → function — next slide এ যাওয়ার function
// ─────────────────────────────────────────────────────────────────────────────

import { ChevronLeft, ChevronRight } from "lucide-react";

function ArrowButton({ label, onClick, Icon }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.28)",
        background: "rgba(255,255,255,0.14)",
        backdropFilter: "blur(8px)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 200ms",
        padding: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.26)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
        e.currentTarget.style.transform = "scale(1.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.14)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <Icon size={17} />
    </button>
  );
}

export default function SliderArrows({ onPrev, onNext }) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <ArrowButton label="Previous slide" onClick={onPrev} Icon={ChevronLeft} />
      <ArrowButton label="Next slide" onClick={onNext} Icon={ChevronRight} />
    </div>
  );
}
