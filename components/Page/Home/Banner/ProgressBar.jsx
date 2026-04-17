"use client";



import { useState, useEffect } from "react";

export default function ProgressBar({ isActive, duration = 5000, accentHex }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWidth(0);
    if (!isActive) return;

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