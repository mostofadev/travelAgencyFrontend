"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";

// ─── Tour Packages Data ──────────────────────────────────────
export const tourPackages = [
  {
    id: 1,
    title: "14 Days Tour In Japan",
    country: "Japan",
    flag: "🇯🇵",
    image:
      "https://triploomadmin.demoff.xyz/storage/tour-package/1dd2aa60fa48441498a929a6b12ebe00bed4cc27-821x546.jpg",
    price: "75,000",
    duration: "14 days",
    slug: "14-dayes-tour-in-japan",
    category: "Cultural",
  },
  {
    id: 2,
    title: "SUNDARBANS Trip",
    country: "Bangladesh",
    flag: "🇧🇩",
    image:
      "https://triploomadmin.demoff.xyz/storage/tour-package/sundarban-1920x1155.jpg",
    price: "7,000",
    duration: "3 days",
    slug: "sundarbans-trip",
    category: "Wildlife",
  },
  {
    id: 3,
    title: "Bali & Kuala Lumpur Package",
    country: "Malaysia",
    flag: "🇲🇾",
    image:
      "https://triploomadmin.demoff.xyz/storage/tour-package/guillaume-marques-bnmpfpusci0-unsplash-5000x4000.jpg",
    price: "1,30,000",
    duration: "5 days",
    slug: "bali-and-kula-lumpur-tour-package",
    category: "Beach",
  },
  {
    id: 4,
    title: "Dhaka → Kathmandu → Nagarkot",
    country: "Nepal",
    flag: "🇳🇵",
    image:
      "https://triploomadmin.demoff.xyz/storage/tour-package/pexels-vome-14367175-1920x1280.jpg",
    price: "60,000",
    duration: "4 days",
    slug: "dhaka-to-kathmandu-to-nagarkot",
    category: "Mountain",
  },
  {
    id: 5,
    title: "Japan Tour Package",
    country: "Japan",
    flag: "🇯🇵",
    image:
      "https://triploomadmin.demoff.xyz/storage/tour-package/jase-bloor-oczhia1d4eu-unsplash-1920x1280.jpg",
    price: "4,00,000",
    duration: "7 days",
    slug: "japan-tour-package",
    category: "Luxury",
  },
  {
    id: 6,
    title: "Philippine Short Tour",
    country: "Philippines",
    flag: "🇵🇭",
    image:
      "https://triploomadmin.demoff.xyz/storage/tour-package/alexes-gerard-vl2h7xyiilk-unsplash-1920x1440.jpg",
    price: "80,000",
    duration: "4 days",
    slug: "philippine-short-tour-package",
    category: "Island",
  },
];

// ─── Category color map ───────────────────────────────────────
const categoryColors = {
  Cultural: "bg-violet-100 text-violet-700",
  Wildlife: "bg-emerald-100 text-emerald-700",
  Beach:    "bg-cyan-100 text-cyan-700",
  Mountain: "bg-blue-100 text-blue-700",
  Luxury:   "bg-amber-100 text-amber-700",
  Island:   "bg-teal-100 text-teal-700",
};

// ─── TourPackageCard ─────────────────────────────────────────
export function TourPackageCard({ pkg, index = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${index * 0.1}s`,
        animation: "slideUp 0.6s ease both",
      }}
      className={`
        relative bg-white rounded-2xl overflow-hidden flex flex-col shadow-lg
        transition-all duration-400 ease-out
        ${hovered
          ? "-translate-y-1.5 shadow-[0_20px_48px_rgba(10,90,112,0.15)]"
          : "shadow-[0_2px_16px_rgba(0,0,0,0.07)]"
        }
      `}
    >
      {/* ── Image wrapper — aspect-ratio 16/9 locks same height always ── */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={pkg.image}
          alt={pkg.title}
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-transform duration-700 ease-out
            ${hovered ? "scale-110" : "scale-100"}
          `}
        />

        {/* Dark gradient bottom */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" /> */}

        {/* Category — top left */}
        {/* <span
          className={`absolute top-3 left-3 text-[0.63rem] font-semibold tracking-wide px-2.5 py-1 rounded-full ${
            categoryColors[pkg.category] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {pkg.category}
        </span> */}

        {/* Duration — top right */}
        <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/90  text-gray-800 text-[0.63rem] font-semibold px-2.5 py-3 rounded-full">
          {/* <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg> */}
          {pkg.duration}
        </span>

        {/* Country — bottom left */}
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-[0.68rem] font-medium px-2.5 py-3 rounded-full">
          {pkg.country}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-4">

        {/* Title — fixed min-height so all cards align */}
        <h3 className="text-gray-900 font-semibold text-[0.92rem] leading-snug line-clamp-2"
          >
          {pkg.title}
        </h3>

        {/* Divider */}
        {/* <div className="h-px bg-gray-100" /> */}

        {/* Price + Book — always at bottom */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-[0.58rem] text-gray-400 uppercase tracking-widest mb-0.5">
              Per Person
            </p>
            <p className="text-[#0A5A70] font-bold text-[1.15rem] leading-none">
              ৳ {pkg.price}
            </p>
          </div>

         <Button>
            book now
         </Button>
        </div>
      </div>

      {/* Bottom accent line — slides in on hover */}
      <div
        className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#0A5A70] to-teal-400 transition-all duration-500 ${
          hovered ? "w-full" : "w-0"
        }`}
      />

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}