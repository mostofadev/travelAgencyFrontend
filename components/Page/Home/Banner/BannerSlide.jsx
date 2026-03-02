"use client";

// components/banner/BannerSlide.jsx
// ─────────────────────────────────────────────────────────────────────────────
// একটি single slide — image background + center title + description।
// isActive হলে content animate হয়ে দেখায়।
//
// Props:
//   slide      → bannerSlides.js থেকে একটি object
//   isActive   → boolean — এই slide টি এখন দেখানো হচ্ছে কিনা
//   visible    → boolean — content fade-in হবে কিনা (navigation এ false হয়)
// ─────────────────────────────────────────────────────────────────────────────

import { Plane } from "lucide-react";

export default function BannerSlide({ slide, isActive, visible }) {
  return (
    <>
      {/* ── Background Image (crossfade) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scale(1)" : "scale(1.06)",
          transition:
            "opacity 900ms cubic-bezier(0.4,0,0.2,1), transform 7000ms ease-out",
          zIndex: 0,
        }}
      />

      {/* ── Gradient Overlay ── */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.10) 40%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.80) 100%)",
            zIndex: 1,
          }}
        />
      )}

      {/* ── Center Content: Badge + Title + Description ── */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 clamp(20px, 6vw, 100px)",
            paddingBottom: "clamp(80px, 14vw, 140px)",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "6px 18px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              border: `1px solid ${slide.accentHex}66`,
              background: `${slide.accentHex}22`,
              color: slide.accentHex,
              marginBottom: "22px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 400ms ease, transform 400ms ease",
              transitionDelay: visible ? "60ms" : "0ms",
            }}
          >
            <Plane size={11} />
            {slide.badge}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(28px, 4.5vw, 58px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.1,
              margin: "0 0 18px 0",
              fontFamily: "'Georgia', 'Times New Roman', serif",
              textShadow: "0 3px 36px rgba(0,0,0,0.45)",
              maxWidth: "820px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 400ms ease, transform 400ms ease",
              transitionDelay: visible ? "170ms" : "0ms",
            }}
          >
            {slide.title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "clamp(14px, 1.55vw, 17px)",
              color: "rgba(255,255,255,0.82)",
              fontWeight: 300,
              lineHeight: 1.72,
              maxWidth: "560px",
              margin: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 400ms ease, transform 400ms ease",
              transitionDelay: visible ? "290ms" : "0ms",
            }}
          >
            {slide.description}
          </p>
        </div>
      )}
    </>
  );
}
