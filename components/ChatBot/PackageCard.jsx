"use client";
// ============================================
// PackageCard.jsx — Tour Package Card
// ============================================

import { formatPrice, formatDate, getAvailableSeats } from "@/lib/helpers";

export default function PackageCard({ pkg, onSelect }) {
  const available = getAvailableSeats(pkg.total_seats, pkg.booked_seats);
  const isFull = available === 0;

  return (
    <div
      onClick={() => !isFull && onSelect(pkg)}
      className={`
        group relative rounded-2xl overflow-hidden border transition-all duration-300
        ${
          isFull
            ? "border-gray-200 opacity-60 cursor-not-allowed"
            : "border-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
        }
        bg-white
      `}
    >
      {/* Featured Badge */}
      {pkg.is_featured && (
        <div className="absolute top-2 left-2 z-10">
          <span
            className="bg-primary text-white text-[10px] font-semibold
                           px-2 py-0.5 rounded-full"
          >
            ⭐ Featured
          </span>
        </div>
      )}

      {/* Full Badge */}
      {isFull && (
        <div className="absolute top-2 right-2 z-10">
          <span
            className="bg-red-500 text-white text-[10px] font-semibold
                           px-2 py-0.5 rounded-full"
          >
            Seats Full
          </span>
        </div>
      )}

      {/* Image */}
      <div
        className="relative h-28 bg-gradient-to-br from-primary/10 to-primary/20
                      flex items-center justify-center overflow-hidden"
      >
        {pkg.image_url ? (
          <img
            src={pkg.image_url}
            alt={pkg.package_title}
            className="w-full h-full object-cover group-hover:scale-105
                       transition-transform duration-500"
          />
        ) : (
          <div className="text-4xl select-none">
            {getDestinationEmoji(pkg.destination_country)}
          </div>
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t
                        from-black/30 to-transparent"
        />

        {/* Duration badge */}
        <div
          className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm
                        text-primary text-[10px] font-bold px-2 py-0.5 rounded-full"
        >
          {pkg.duration_days}D / {pkg.duration_nights}N
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h4
          className="text-xs font-semibold text-gray-800 line-clamp-2
                       mb-1 leading-tight"
        >
          {pkg.package_title}
        </h4>

        {/* Destination */}
        <p className="text-[10px] text-gray-400 mb-2 flex items-center gap-1">
          <span>📍</span>
          <span>
            {pkg.origin_country} → {pkg.destination_country}
          </span>
        </p>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] text-gray-400">Adult price</p>
            <p className="text-sm font-bold text-primary">
              {formatPrice(pkg.adult_price, pkg.currency)}
            </p>
          </div>

          {/* Seats */}
          <div className="text-right">
            <p
              className={`text-[10px] font-medium ${
                available <= 5 ? "text-orange-500" : "text-green-500"
              }`}
            >
              {isFull ? "Full" : `${available} seats`}
            </p>
          </div>
        </div>

        {/* Departure */}
        {pkg.start_date && (
          <p className="text-[9px] text-gray-400 mt-1">
            🗓️ {formatDate(pkg.start_date)}
          </p>
        )}
      </div>
    </div>
  );
}

function getDestinationEmoji(country) {
  const map = {
    Thailand: "🇹🇭",
    Maldives: "🇲🇻",
    Indonesia: "🇮🇩",
    UAE: "🇦🇪",
    Singapore: "🇸🇬",
    Malaysia: "🇲🇾",
    Nepal: "🇳🇵",
    India: "🇮🇳",
    Bangladesh: "🇧🇩",
    Turkey: "🇹🇷",
    "Saudi Arabia": "🇸🇦",
  };
  return map[country] ?? "✈️";
}
