"use client";

import Button from "@/components/ui/Button";

import Link from "next/link";

// ── Icons 
const IconArrow = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16"
    className="transition-transform duration-300 group-hover/btn:translate-x-1"
    height="14" width="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
  </svg>
);
const IconCalendar = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const IconClock = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);
const IconUsers = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconPin = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconStar = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const IconCheck = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// ── Package type colours ──────────────────────────────────────
const TYPE_COLORS = {
  religious:   { bg: "#fef3c7", text: "#92400e", border: "#fcd34d", dot: "#f59e0b" },
  adventure:   { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7", dot: "#10b981" },
  honeymoon:   { bg: "#fce7f3", text: "#9d174d", border: "#f9a8d4", dot: "#ec4899" },
  family:      { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd", dot: "#3b82f6" },
  beach:       { bg: "#e0f2fe", text: "#0c4a6e", border: "#7dd3fc", dot: "#0ea5e9" },
  cultural:    { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd", dot: "#8b5cf6" },
  default:     { bg: "#f1f5f9", text: "#475569", border: "#cbd5e1", dot: "#64748b" },
};

// ── Status badge ──────────────────────────────────────────────
const STATUS_COLORS = {
  active:    { bg: "#d1fae5", text: "#065f46" },
  cancelled: { bg: "#fee2e2", text: "#991b1b" },
  completed: { bg: "#dbeafe", text: "#1e40af" },
  default:   { bg: "#f1f5f9", text: "#475569" },
};

// ── Detail Pill 
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

// ── Format date 
function fmtDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// ── Main Card 
export default function TourPackageCard({ pkg }) {
  const {
    id,
    package_code,
    package_title,
    package_type,
    duration_days,
    duration_nights,
    start_date,
    end_date,
    adult_price,
    child_price,
    currency = "BDT",
    total_seats,
    booked_seats,
    image_url,
    description,
    inclusions,
    status,
    is_featured,
    destination_country,
    origin_country,
  } = pkg;

  const typeColor   = TYPE_COLORS[package_type]  ?? TYPE_COLORS.default;
  const statusColor = STATUS_COLORS[status]       ?? STATUS_COLORS.default;

  const formattedPrice = adult_price
    ? `${currency} ${Number(adult_price).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    : null;

  const inclusionList = inclusions?.split(",").map(i => i.trim()).filter(Boolean) ?? [];

  return (
    <>
      {/* Responsive styles injected via a <style> tag */}
      <style>{`
        .tour-card {
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;        /* mobile: stack vertically */
          align-items: stretch;
          background: #fff;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          overflow: hidden;
          position: relative;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .tour-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }

        /* ── Image section ── */
        .tour-card__image-wrap {
          position: relative;
          width: 100%;                   /* mobile: full width */
          min-width: unset;
          height: 200px;                 /* mobile: fixed height */
          flex-shrink: 0;
          overflow: hidden;
        }
        .tour-card__image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.5s ease;
        }
        .tour-card__image-wrap:hover img {
          transform: scale(1.06);
        }

        /* ── Content section ── */
        .tour-card__content {
          flex: 1;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
          border-right: none;            /* mobile: no right border */
        }

        /* ── Price / CTA section ── */
        .tour-card__price {
          width: 100%;                   /* mobile: full width */
          min-width: unset;
          flex-shrink: 0;
          display: flex;
          flex-direction: row;           /* mobile: horizontal layout */
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 20px;
          background: linear-gradient(160deg, #f8faff 0%, #f0f4fe 100%);
          border-top: 1px solid #e2e8f0;
        }
        .tour-card__price-info {
          text-align: left;
        }
        .tour-card__price-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        /* ── sm: 480px+ — show image as a slim left strip ── */
        @media (min-width: 480px) {
          .tour-card {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .tour-card__image-wrap {
            width: 160px;
            min-width: 160px;
            height: auto;
            min-height: 200px;
          }
          .tour-card__content {
            flex: 1;
            min-width: 0;
          }
          .tour-card__price {
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #e2e8f0;
            border-left: none;
          }
        }

        /* ── md: 768px+ — three-column layout matching original ── */
        @media (min-width: 768px) {
          .tour-card {
            flex-direction: row;
            flex-wrap: nowrap;
          }
          .tour-card__image-wrap {
            width: 190px;
            min-width: 190px;
            height: auto;
          }
          .tour-card__content {
            border-right: 1px solid #f0f4f8;
          }
          .tour-card__price {
            width: 175px;
            min-width: 175px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-top: none;
            border-left: none;
          }
          .tour-card__price-info {
            text-align: center;
            width: 100%;
          }
          .tour-card__price-actions {
            align-items: center;
            width: 100%;
          }
        }
      `}</style>

      <div className="tour-card">
        {/* ── Featured ribbon ── */}
        {is_featured && (
          <div style={{
            position: "absolute", top: "14px", left: "-1px",
            background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
            color: "#fff", fontSize: "9px", fontWeight: 800,
            textTransform: "uppercase", letterSpacing: "0.08em",
            padding: "3px 10px 3px 8px", borderRadius: "0 4px 4px 0",
            zIndex: 5, boxShadow: "0 2px 6px rgba(245,158,11,0.35)",
            display: "flex", alignItems: "center", gap: "3px",
          }}>
            <IconStar /> Featured
          </div>
        )}

        {/* ── Image ── */}
        <div className="tour-card__image-wrap">
          <img src={image_url} alt={package_title} />

          {/* Duration badge */}
          <div style={{
            position: "absolute", bottom: "10px", left: "10px",
            background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
            color: "#fff", borderRadius: "8px", padding: "5px 10px",
            fontSize: "11px", fontWeight: 700,
          }}>
            {duration_days}D / {duration_nights}N
          </div>

          {/* Destination overlay */}
          {destination_country?.name && (
            <div style={{
              position: "absolute", top: "10px", right: "10px",
              display: "flex", alignItems: "center", gap: "4px",
              background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)",
              borderRadius: "20px", padding: "3px 8px",
              fontSize: "10px", fontWeight: 700, color: "#1e293b",
              boxShadow: "0 1px 6px rgba(0,0,0,0.15)",
            }}>
              <IconPin />
              {destination_country.name.length > 14
                ? destination_country.name.slice(0, 14) + "…"
                : destination_country.name}
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className="tour-card__content">
          {/* Title row */}
          <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
            <h2 style={{
              margin: 0, fontSize: "15px", fontWeight: 700,
              color: "#0f172a", lineHeight: 1.3, flex: 1, minWidth: 0,
            }}>
              {package_title}
            </h2>
            <div style={{ display: "flex", gap: "5px", flexShrink: 0, flexWrap: "wrap" }}>
              {package_type && (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  padding: "2px 9px", borderRadius: "20px",
                  fontSize: "10px", fontWeight: 800, textTransform: "capitalize",
                  letterSpacing: "0.04em",
                  background: typeColor.bg, color: typeColor.text,
                  border: `1px solid ${typeColor.border}`,
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: typeColor.dot, display: "inline-block" }} />
                  {package_type}
                </span>
              )}
              {status && (
                <span style={{
                  display: "inline-flex", padding: "2px 9px", borderRadius: "20px",
                  fontSize: "10px", fontWeight: 700, textTransform: "capitalize",
                  background: statusColor.bg, color: statusColor.text,
                }}>
                  {status}
                </span>
              )}
            </div>
          </div>

          {/* Code + route */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "10px", color: "#94a3b8", fontFamily: "monospace", letterSpacing: "0.05em" }}>
              #{package_code}
            </span>
            {origin_country?.name && destination_country?.name && (
              <span style={{ fontSize: "10px", color: "#64748b", fontWeight: 600 }}>
                {origin_country.name} → {destination_country.name}
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <p style={{
              margin: 0, fontSize: "12px", color: "#64748b", lineHeight: 1.65,
              display: "-webkit-box", WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {description}
            </p>
          )}

          {/* Detail pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            <Pill icon={<IconCalendar />} label="Start"    value={fmtDate(start_date)} />
            <Pill icon={<IconCalendar />} label="End"      value={fmtDate(end_date)} />
            <Pill icon={<IconClock />}    label="Duration" value={`${duration_days}D / ${duration_nights}N`} />
            <Pill icon={<IconUsers />}    label="Seats"    value={`${total_seats - booked_seats} left`} />
          </div>

          {/* Inclusions */}
          {inclusionList.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {inclusionList.slice(0, 4).map((item, i) => (
                <span key={i} style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  fontSize: "10px", fontWeight: 600, color: "#065f46",
                  background: "#d1fae5", borderRadius: "5px", padding: "2px 7px",
                }}>
                  <IconCheck /> {item}
                </span>
              ))}
              {inclusionList.length > 4 && (
                <span style={{ fontSize: "10px", color: "#94a3b8", padding: "2px 4px" }}>
                  +{inclusionList.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Price / CTA ── */}
        <div className="tour-card__price">
          {/* Price info */}
          <div className="tour-card__price-info">
            <p style={{
              margin: "0 0 2px", fontSize: "10px", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8",
            }}>
              Adult Price
            </p>
            <p style={{ letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0 }}
               className="text-md font-bold text-primary">
              {formattedPrice ?? "—"}
            </p>
            {child_price && (
              <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#94a3b8" }}>
                Child:{" "}
                <span style={{ fontWeight: 700, color: "#64748b" }}>
                  {currency} {Number(child_price).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
              </p>
            )}
          </div>

          {/* Divider — hidden on mobile (flex row), visible on md+ (flex col) */}
          <div
            className="hidden md:block"
            style={{ width: "100%", height: "1px", background: "#e2e8f0" }}
          />

          {/* Actions */}
          <div className="tour-card__price-actions">
            <Button href={`/tour/${id}`}>View Details →</Button>
          
          </div>
        </div>
      </div>
    </>
  );
}