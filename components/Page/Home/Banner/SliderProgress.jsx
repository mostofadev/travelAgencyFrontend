"use client";


import { useEffect, useState } from "react";

export default function SliderProgress({ isActive, duration = 5000, accentHex }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Reset
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWidth(0);
    if (!isActive) return;

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