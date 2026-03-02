"use client";

import FilterBox from "../../filter/FilterBox";
import HeroBanner from "./HeroBanner";

// components/BannerWithFilter.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Banner + FilterBox একসাথে।
// এটাই homepage এ import করতে হবে।
//
// Layout:
//   ┌─────────────────────────────────────┐
//   │          HeroBanner (640px)          │
//   │  (slide content, dots, arrows)       │
//   │                                      │
//   │         ┌──────────────────┐         │
//   │  50% ▼  │   FilterBox      │  50% ▼  │
//   └─────────│──────────────────│─────────┘
//             │   (overlapping)  │
//             └──────────────────┘
//
// Usage:
//   import BannerWithFilter from "@/components/BannerWithFilter"
//
//   export default function HomePage() {
//     return (
//       <main>
//         <BannerWithFilter />
//         {/* বাকি page content */}
//       </main>
//     )
//   }
//
// Note: এই component এর নিচে একটা spacer div রাখো যেন
//       content FilterBox এর সাথে overlap না করে।
//       (h-24 বা FilterBox এর height এর অর্ধেক)
// ─────────────────────────────────────────────────────────────────────────────

export default function BannerWithFilter() {
  return (
    <>
      {/* Banner — FilterBox এর slot টা banner এর children হিসেবে যায় */}
      <HeroBanner>
        <FilterBox />
      </HeroBanner>

      {/* Spacer: FilterBox এর 50% নিচে বের হয়ে থাকে, সেটুকু জায়গার জন্য */}
      <div className="h-24 bg-slate-50" />
    </>
  );
}
