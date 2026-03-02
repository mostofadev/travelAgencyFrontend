"use client";

// components/banner/ProgressBar.jsx
// ─────────────────────────────────────────────────────────────────────────────
// প্রতিটি slide এর জন্য একটি thin progress bar।
// Slide active হলে bar টি ধীরে ধীরে ভরে যায়।
//
// Props:
//   isActive   → boolean — এই slide টি এখন চলছে কিনা
//   duration   → number  — কত ms এ bar শেষ হবে (default: 5000)
//   accentHex  → string  — bar এর color (#hex)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

export default function ProgressBar({ isActive, duration = 5000, accentHex }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // প্রতিবার isActive বদলালে reset করি
    setWidth(0);
    if (!isActive) return;

    // Double RAF — browser কে layout করার সুযোগ দিই, তারপর animate করি
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setWidth(100))
    );
    return () => cancelAnimationFrame(raf);
  }, [isActive]);

  return (
    <div
      style={{
        flex: 1,
        height: "2px",
        borderRadius: "999px",
        background: "rgba(255,255,255,0.18)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          borderRadius: "999px",
          width: `${width}%`,
          background: accentHex,
          transition: isActive ? `width ${duration}ms linear` : "none",
        }}
      />
    </div>
  );
}