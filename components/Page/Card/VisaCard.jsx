"use client";

import Button from "@/components/ui/Button";
// components/VisaCard.jsx

import Link from "next/link";

// ── Icons ─────────────────────────────────────────────────────
const IconArrow = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16"
    className="transition-transform duration-300 group-hover/btn:translate-x-1"
    height="14" width="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
  </svg>
);

const IconClock = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);
const IconGlobe = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconEntry = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
  </svg>
);
const IconCalendar = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const IconStay = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconPin = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

// ── Badge colour map ──────────────────────────────────────────
const TYPE_COLORS = {
  Work:     { bg: "#ede9fe", text: "#6d28d9", border: "#c4b5fd" },
  Tourist:  { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
  Student:  { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  Business: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  Transit:  { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
  default:  { bg: "#f1f5f9", text: "#475569", border: "#cbd5e1" },
};

// ── Detail Pill ───────────────────────────────────────────────
function Pill({ icon, label, value }) {
  if (!value) return null;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "5px",
      background: "#f8fafc", border: "1px solid #e2e8f0",
      borderRadius: "6px", padding: "4px 8px",
    }}>
      <span style={{ color: "#64748b", display: "flex" }}>{icon}</span>
      <span style={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
        {label}
      </span>
      <span style={{ fontSize: "11px", fontWeight: 600, color: "#334155", whiteSpace: "nowrap" }}>
        {value}
      </span>
    </div>
  );
}

// ── Main Card ─────────────────────────────────────────────────
export default function VisaCard({ visa }) {
  const {
    visa_code,
    visa_title,
    image_url,
    country,
    visa_type,
    processing,
    visa_mode,
    entry_type,
    validity,
    max_stay,
    fee,
    description,
  } = visa;

  const typeColor = TYPE_COLORS[visa_type?.name] ?? TYPE_COLORS.default;

  return (
    <>
      <style>{`
        .visa-card {
          display: flex;
          flex-direction: column;          /* mobile: stack */
          align-items: stretch;
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #e8eef5;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          overflow: hidden;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .visa-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }

        /* ── Image ── */
        .visa-card__image-wrap {
          position: relative;
          width: 100%;                     /* mobile: full width */
          min-width: unset;
          height: 200px;                   /* mobile: fixed height */
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 14px 14px 0 0;   /* mobile: round top corners */
        }
        .visa-card__image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.5s ease;
        }
        .visa-card__image-wrap:hover img {
          transform: scale(1.06);
        }

        /* ── Content ── */
        .visa-card__content {
          flex: 1;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
          border-right: none;              /* mobile: no right border */
        }

        /* ── Price / CTA ── */
        .visa-card__price {
          width: 100%;                     /* mobile: full width */
          min-width: unset;
          flex-shrink: 0;
          display: flex;
          flex-direction: row;             /* mobile: horizontal */
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 20px;
          background: linear-gradient(160deg, #f8faff 0%, #f0f4fe 100%);
          border-top: 1px solid #e2e8f0;
        }
        .visa-card__price-info {
          text-align: left;
        }

        /* ── sm: 480px+ ── */
        @media (min-width: 480px) {
          .visa-card {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .visa-card__image-wrap {
            width: 180px;
            min-width: 180px;
            height: auto;
            min-height: 200px;
            border-radius: 14px 0 0 0;    /* only top-left */
          }
          .visa-card__content {
            flex: 1;
            min-width: 0;
          }
          .visa-card__price {
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #e2e8f0;
            border-left: none;
          }
        }

        /* ── md: 768px+ — original three-column layout ── */
        @media (min-width: 768px) {
          .visa-card {
            flex-direction: row;
            flex-wrap: nowrap;
          }
          .visa-card__image-wrap {
            width: 280px;
            min-width: 280px;
            height: auto;
            border-radius: 14px 0 0 14px; /* original */
          }
          .visa-card__content {
            border-right: 1px solid #f0f4f8;
          }
          .visa-card__price {
            width: 170px;
            min-width: 170px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-top: none;
          }
          .visa-card__price-info {
            text-align: center;
          }
        }
      `}</style>

      <div className="visa-card">

        {/* ── LEFT: Image ── */}
        <div className="visa-card__image-wrap">
          <img
            src={image_url}
            alt={`${visa_title}${country?.name ? ` — ${country.name}` : ""}`}
          />

          {/* Country overlay pill */}
          {country?.name && (
            <div style={{
              position: "absolute", bottom: "10px", left: "10px",
              display: "flex", alignItems: "center", gap: "4px",
              background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)",
              borderRadius: "20px", padding: "3px 8px",
              fontSize: "10px", fontWeight: 700, color: "#1e293b",
              boxShadow: "0 1px 6px rgba(0,0,0,0.15)",
            }}>
              <IconPin />
              {country.name}
            </div>
          )}
        </div>

        {/* ── MIDDLE: Content ── */}
        <div className="visa-card__content">
          {/* Title + badge row */}
          <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
            <h2 style={{
              margin: 0, fontSize: "15px", fontWeight: 700,
              color: "#0f172a", lineHeight: 1.3, flex: 1, minWidth: 0,
            }}>
              {visa_title}
            </h2>
            {visa_type?.name && (
              <span style={{
                display: "inline-flex", alignItems: "center",
                padding: "2px 10px", borderRadius: "20px",
                fontSize: "10px", fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.06em",
                background: typeColor.bg, color: typeColor.text,
                border: `1px solid ${typeColor.border}`,
                whiteSpace: "nowrap", flexShrink: 0,
              }}>
                {visa_type.name}
              </span>
            )}
          </div>

          {/* Code */}
          <p style={{ margin: 0, fontSize: "10px", color: "#94a3b8", fontFamily: "monospace", letterSpacing: "0.05em" }}>
            #{visa_code}
          </p>

          {/* Description */}
          {description && (
            <p style={{
              margin: 0, fontSize: "12px", color: "#64748b", lineHeight: 1.6,
              display: "-webkit-box", WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {description}
            </p>
          )}

          {/* Detail pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "2px" }}>
            <Pill icon={<IconClock />}    label="Processing" value={processing?.range} />
            <Pill icon={<IconGlobe />}    label="Mode"       value={visa_mode} />
            <Pill icon={<IconEntry />}    label="Entry"      value={entry_type} />
            <Pill icon={<IconCalendar />} label="Validity"   value={validity?.formatted} />
            <Pill icon={<IconStay />}     label="Max Stay"   value={max_stay?.label} />
          </div>
        </div>

        {/* ── RIGHT: Price + CTA ── */}
        <div className="visa-card__price">
          {/* Price info */}
          <div className="visa-card__price-info">
            <p className="m-0 mb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
              Starting Price
            </p>
            <p className="text-sm font-semibold text-primary m-0">
              {fee?.formatted ?? `${fee?.currency ?? "BDT"} 0`}
            </p>
          </div>

          {/* Divider — only on md+ (column layout) */}
          <div
            className="hidden md:block"
            style={{ width: "100%", height: "1px", background: "#e2e8f0" }}
          />

          {/* CTA */}
          <Button href="/visa/details">
            View Details
          </Button>
        </div>
      </div>
    </>
  );
}