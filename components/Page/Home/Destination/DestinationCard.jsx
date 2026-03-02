"use client";

// ─── Destinations Data ───────────────────────────────────────
export const destinations = [
  {
    id: 1,
    name: "Japan",
    country: "japan",
    image:
      "https://triploomadmin.demoff.xyz/storage/country/1dd2aa60fa48441498a929a6b12ebe00bed4cc27-821x546.jpg",
  },
  {
    id: 2,
    name: "Philippines",
    country: "philippines",
    image:
      "https://triploomadmin.demoff.xyz/storage/country/cris-tagupa-9zxhur5acwm-unsplash-1920x1440.jpg",
  },
  {
    id: 3,
    name: "Indonesia",
    country: "indonesia",
    image:
      "https://triploomadmin.demoff.xyz/storage/country/sebastian-pena-lambarri-ui6h9y50wq-unsplash-1920x1280.jpg",
  },
  {
    id: 4,
    name: "Malaysia",
    country: "malaysia",
    image:
      "https://triploomadmin.demoff.xyz/storage/country/pexels-umar-mukhtar-703539-1538177-640x427.jpg",
  },
  {
    id: 5,
    name: "Nepal",
    country: "nepal",
    image:
      "https://triploomadmin.demoff.xyz/storage/country/sfk5y6xdb7-1920x1280.jpeg",
  },
  {
    id: 6,
    name: "Cambodia",
    country: "cambodia",
    image:
      "https://triploomadmin.demoff.xyz/storage/country/vicky-t-ey3tc81nft0-unsplash-1920x1080.jpg",
  },
  {
    id: 7,
    name: "India",
    country: "india",
    image:
      "https://triploomadmin.demoff.xyz/storage/country/60f1e6db2f88baf28cc4883122670adc4397f399-821x547.jpg",
  },
  {
    id: 8,
    name: "Thailand",
    country: "thailand",
    image:
      "https://triploomadmin.demoff.xyz/storage/country/sumit-chinchane-jwkk-0zbuyg-unsplash-1920x1329.jpg",
  },
  {
    id: 9,
    name: "Bhutan",
    country: "bhutan",
    image:
      "https://triploomadmin.demoff.xyz/storage/country/aaron-santelices-zdwvvrdel8a-unsplash-1920x1280.jpg",
  },
];

// ─── DestinationCard Component ────────────────────────────────
export function DestinationCard({ destination }) {
  return (
    <a
      href={`/checklist?country=${destination.country}`}
      className="block bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 group"
    >
      {/* Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Name */}
      <div className="p-4 text-center font-semibold text-gray-800">
        {destination.name}
      </div>
    </a>
  );
}