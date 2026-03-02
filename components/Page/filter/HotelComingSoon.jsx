"use client";

// components/filter/HotelComingSoon.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Hotel tab এ click করলে এই panel দেখায়।
// "Coming Soon" message এবং badge দেখানো হয়।
// ─────────────────────────────────────────────────────────────────────────────

export default function HotelComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      {/* Hotel emoji */}
      <span className="text-5xl mb-4">🏨</span>

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-800 mb-2">
        Hotel Booking — Coming Soon
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-400 max-w-sm mb-4">
        আমরা তোমার জন্য exclusive hotel deals তৈরি করছি। শীঘ্রই আসছে — stay
        tuned!
      </p>

      {/* Coming Soon badge */}
      <span className="inline-flex items-center gap-2 px-5 py-2 bg-amber-50 border border-amber-300 text-amber-600 text-xs font-bold rounded-full uppercase tracking-wider">
        ⏳ Coming Soon
      </span>
    </div>
  );
}
