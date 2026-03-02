"use client";

// components/banner/SliderProgress.jsx
// ─────────────────────────────────────────────────────────────────────────────
// প্রতিটি slide এর জন্য একটি progress bar।
// Slide active হলে bar টি ভরে যায় (duration শেষে next slide চলে যায়)।
// Props:
//   isActive   → এই slide টি এখন চলছে কিনা
//   duration   → কত ms এ bar শেষ হবে (default 5000ms)
//   accentHex  → bar এর color
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";

export default function SliderProgress({ isActive, duration = 5000, accentHex }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Reset
    setWidth(0);
    if (!isActive) return;

    // Double RAF — browser কে layout করার সুযোগ দেই তারপর animate করি
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setWidth(100))
    );
    return () => cancelAnimationFrame(raf);
  }, [isActive]);

  return (
    <div className="flex-1 h-0.5 rounded-full bg-white/15 overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${width}%`,
          background: accentHex,
          transition: isActive ? `width ${duration}ms linear` : "none",
        }}
      />
    </div>
  );
}