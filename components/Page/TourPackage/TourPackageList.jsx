"use client";

import TourPackageCard from "../Card/TourpackageCard";


const TOUR_PACKAGES = [
  {
    id: 1,
    package_code: "TP-0463",
    package_title: "Cox's Bazar Beach Retreat 2026",
    slug: "coxs-bazar-beach-retreat-2026",
    package_type: "beach",
    duration_days: 6,
    duration_nights: 5,
    start_date: "2026-03-18T00:00:00.000000Z",
    end_date: "2026-06-28T00:00:00.000000Z",
    adult_price: "107905.20",
    child_price: "75533.64",
    currency: "BDT",
    total_seats: 43,
    booked_seats: 38,
    image_url:
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80",
    description:
      "Relax on the world's longest natural sea beach. Enjoy golden sunsets, fresh seafood, and thrilling water activities with our all-inclusive beach retreat package.",
    inclusions: "Flight, Hotel (4★), Breakfast, Guide, Transport, Water Sports",
    exclusions: "Lunch, Dinner, Personal Expenses",
    status: "active",
    is_featured: true,
    destination_country: { id: 1, name: "Bangladesh" },
    origin_country: { id: 1, name: "Dhaka" },
  },
  {
    id: 2,
    package_code: "TP-0891",
    package_title: "Sundarban Eco Adventure Tour",
    slug: "sundarban-eco-adventure-tour",
    package_type: "adventure",
    duration_days: 4,
    duration_nights: 3,
    start_date: "2026-04-05T00:00:00.000000Z",
    end_date: "2026-04-08T00:00:00.000000Z",
    adult_price: "45000.00",
    child_price: "30000.00",
    currency: "BDT",
    total_seats: 20,
    booked_seats: 8,
    image_url:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    description:
      "Explore the world's largest mangrove forest. Spot Royal Bengal Tigers, cruise through narrow river channels and experience wildlife in its natural habitat.",
    inclusions: "Boat, Forest Guide, Hotel (3★), Breakfast, Binoculars",
    exclusions: "Flight, Personal Expenses, Tips",
    status: "active",
    is_featured: false,
    destination_country: { id: 1, name: "Bangladesh" },
    origin_country: { id: 1, name: "Dhaka" },
  },
  {
    id: 3,
    package_code: "TP-0217",
    package_title: "Maldives Honeymoon Paradise",
    slug: "maldives-honeymoon-paradise",
    package_type: "honeymoon",
    duration_days: 7,
    duration_nights: 6,
    start_date: "2026-05-01T00:00:00.000000Z",
    end_date: "2026-05-07T00:00:00.000000Z",
    adult_price: "285000.00",
    child_price: null,
    currency: "BDT",
    total_seats: 10,
    booked_seats: 4,
    image_url:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    description:
      "An unforgettable overwater villa experience in the crystal-clear waters of the Maldives. Includes private snorkeling, candlelight dinner on the beach and spa sessions.",
    inclusions:
      "Flight, Overwater Villa, All Meals, Spa, Snorkeling, Airport Transfer",
    exclusions: "Personal Shopping, Alcohol",
    status: "active",
    is_featured: true,
    destination_country: { id: 14, name: "Maldives" },
    origin_country: { id: 1, name: "Bangladesh" },
  },
  {
    id: 4,
    package_code: "TP-0554",
    package_title: "Thailand Cultural Family Tour",
    slug: "thailand-cultural-family-tour",
    package_type: "family",
    duration_days: 8,
    duration_nights: 7,
    start_date: "2026-06-15T00:00:00.000000Z",
    end_date: "2026-06-22T00:00:00.000000Z",
    adult_price: "195000.00",
    child_price: "120000.00",
    currency: "BDT",
    total_seats: 30,
    booked_seats: 22,
    image_url:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    description:
      "Discover Bangkok temples, Chiang Mai night markets and Phuket beaches. A perfect itinerary designed for families with activities for all ages.",
    inclusions: "Flight, Hotel (4★), Breakfast, City Tours, Guide, Transport",
    exclusions: "Lunch, Dinner, Personal Expenses, Entry Fees",
    status: "active",
    is_featured: false,
    destination_country: { id: 7, name: "Thailand" },
    origin_country: { id: 1, name: "Bangladesh" },
  },
  {
    id: 5,
    package_code: "TP-0338",
    package_title: "Umrah Pilgrimage Package",
    slug: "umrah-pilgrimage-package",
    package_type: "religious",
    duration_days: 14,
    duration_nights: 13,
    start_date: "2026-03-01T00:00:00.000000Z",
    end_date: "2026-03-14T00:00:00.000000Z",
    adult_price: "320000.00",
    child_price: "240000.00",
    currency: "BDT",
    total_seats: 50,
    booked_seats: 48,
    image_url:
      "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=80",
    description:
      "Complete Umrah package with Makkah and Madinah stay. 5-star hotel within walking distance of Haram, experienced Islamic guides and visa assistance included.",
    inclusions: "Flight, Hotel (5★), All Meals, Visa, Guide, Ziyarat",
    exclusions: "Personal Expenses, Extra Shopping",
    status: "active",
    is_featured: true,
    destination_country: { id: 22, name: "Saudi Arabia" },
    origin_country: { id: 1, name: "Bangladesh" },
  },
  {
    id: 6,
    package_code: "TP-0712",
    package_title: "Sajek Valley Highland Escape",
    slug: "sajek-valley-highland-escape",
    package_type: "adventure",
    duration_days: 3,
    duration_nights: 2,
    start_date: "2026-04-20T00:00:00.000000Z",
    end_date: "2026-04-22T00:00:00.000000Z",
    adult_price: "18500.00",
    child_price: "12000.00",
    currency: "BDT",
    total_seats: 25,
    booked_seats: 10,
    image_url:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    description:
      "Walk above the clouds in the hills of Rangamati. Sajek Valley offers breathtaking sunrise views, tribal culture experiences and cozy eco-resort stays.",
    inclusions: "Transport, Eco Resort, Breakfast, Trekking Guide",
    exclusions: "Personal Expenses, Lunch, Dinner",
    status: "active",
    is_featured: false,
    destination_country: { id: 1, name: "Bangladesh" },
    origin_country: { id: 1, name: "Dhaka" },
  },
];

export default function TourPackageList() {
  return (
    <div
      style={{
        margin: "0 auto",
        padding: "32px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "8px" }}>
        <span
          style={{
            display: "inline-block",
            padding: "3px 12px",
            background: "#ede9fe",
            color: "#6d28d9",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "10px",
          }}
        >
          Tour Packages
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: "-0.02em",
          }}
        >
          Explore Our Packages
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#64748b" }}>
          {TOUR_PACKAGES.length} packages available — compare prices and book
          online
        </p>
      </div>

      {/* Cards */}
      {TOUR_PACKAGES.map((pkg) => (
        <TourPackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}
