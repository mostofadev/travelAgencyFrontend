"use client";



export default function SliderDots({ total, current, onChange, accentHex }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          aria-label={`Slide ${i + 1}`}
          style={{
            height: "8px",
            width: i === current ? "28px" : "8px",
            borderRadius: "999px",
            border: "none",
            padding: 0,
            cursor: "pointer",
            background:
              i === current ? accentHex : "rgba(255,255,255,0.32)",
            transition: "all 350ms ease-out",
          }}
        />
      ))}
    </div>
  );
}