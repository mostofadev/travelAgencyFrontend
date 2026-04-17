
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtManager } from "@/lib/auth/jwt";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Plane,
  Utensils,
  Bed,
  Sun,
  Shield,
  Tag,
  Eye,
  BookOpen,
  AlertTriangle,
  BadgeCheck,
} from "lucide-react";
import Button from "@/components/ui/Button";
import CounterRow from "@/components/ui/CounterRow";

// ─── Stat Card 
function StatCard({ icon: Icon, label, value, accent = false }) {
  return (
    <div
      className={`rounded-2xl p-4 flex flex-col gap-2 ${
        accent ? "bg-primary" : "bg-white border border-primary/20 shadow-sm"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
          accent ? "bg-white/20" : "bg-primary/5"
        }`}
      >
        <Icon size={17} className={accent ? "text-white" : "text-primary"} />
      </div>
      <p
        className={`text-[10px] font-bold uppercase tracking-widest ${
          accent ? "text-white/70" : "text-slate-400"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-[14px] font-bold leading-tight ${
          accent ? "text-white" : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Itinerary Day Card 
function ItineraryCard({ day }) {
  const [open, setOpen] = useState(day.day_number <= 2);

  return (
    <div className="border border-primary/20 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-primary/5 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 text-white font-extrabold text-sm">
          {day.day_number}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Day {day.day_number}
          </p>
          <p className="text-[14px] font-bold text-slate-800 truncate">
            {day.title}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {day.accommodation && (
            <span className="hidden sm:flex items-center gap-1 text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-semibold">
              <Bed size={9} /> {day.accommodation}
            </span>
          )}
          {day.meals && (
            <span className="hidden sm:flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
              <Utensils size={9} /> {day.meals}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-primary/10">
          <p className="text-[13px] text-slate-500 leading-relaxed whitespace-pre-line">
            {day.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {day.accommodation && (
              <span className="flex items-center gap-1 text-[11px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full font-semibold">
                <Bed size={10} /> {day.accommodation}
              </span>
            )}
            {day.meals && (
              <span className="flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">
                <Utensils size={10} /> {day.meals}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Price Breakdown 
function TourPriceBreakdown({
  adults,
  childCount,
  adultPrice,
  childPrice,
  currency,
}) {
  const total = adults * adultPrice + childCount * (childPrice ?? 0);

  return (
    <div className="mt-4 bg-primary/5 rounded-xl p-4 border border-primary/20">
      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        Price Breakdown
      </p>

      {adults > 0 && (
        <div className="flex justify-between text-[13px] text-slate-600 mb-1.5">
          <span>
            {adults} Adult{adults > 1 ? "s" : ""} × {currency}{" "}
            {Number(adultPrice).toLocaleString()}
          </span>
          <span className="font-bold">
            {currency} {(adults * adultPrice).toLocaleString()}
          </span>
        </div>
      )}

      {childCount > 0 && childPrice != null && (
        <div className="flex justify-between text-[13px] text-slate-600 mb-1.5">
          <span>
            {childCount} Child{childCount > 1 ? "ren" : ""} × {currency}{" "}
            {Number(childPrice).toLocaleString()}
          </span>
          <span className="font-bold">
            {currency} {(childCount * childPrice).toLocaleString()}
          </span>
        </div>
      )}

      <div className="border-t border-primary/20 mt-2 pt-2 flex justify-between">
        <span className="text-sm font-bold text-slate-800">Total</span>
        <span className="text-base font-extrabold text-primary">
          {currency} {total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

// ─── Related Tour Card 
function RelatedCard({ tour }) {
  return (
    <Link href={`/tour/${tour.id}`} className="group block no-underline">
      <div className="bg-white border border-primary/20 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-32 overflow-hidden">
          <img
            src={tour.image_url}
            alt={tour.package_title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          {tour.destination_country?.name && (
            <span className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-bold text-slate-800">
              <MapPin size={10} /> {tour.destination_country.name}
            </span>
          )}
        </div>
        <div className="p-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border bg-primary/10 text-primary border-primary/20 mb-2">
            <Tag size={9} /> {tour.package_type}
          </span>
          <p className="text-[13px] font-bold text-slate-800 leading-snug mb-2 line-clamp-2">
            {tour.package_title}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400">
              {tour.duration_days}D / {tour.duration_nights}N
            </span>
            <span className="text-[12px] font-bold text-primary">
              {tour.currency}{" "}
              {Number(tour.adult_price).toLocaleString("en-BD", {
                minimumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── STATUS badge styles 
const STATUS_STYLE = {
  active: "bg-emerald-100 text-emerald-700 border-emerald-300",
  cancelled: "bg-red-100 text-red-700 border-red-300",
  upcoming: "bg-blue-100 text-blue-700 border-blue-300",
  default: "bg-slate-100 text-slate-500 border-slate-200",
};

// ─── MAIN COMPONENT 
export default function TourDetailPage({ tour: t, related = [] }) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const router = useRouter();

  if (!t) return null;

  const adultPrice = t.adult_price ?? 0;
  const childPrice = t.child_price ?? null;
  const currency = t.currency ?? "BDT";
  const maxPassengers = t.available_seats ?? 9;

  const statusClass = STATUS_STYLE[t.status] ?? STATUS_STYLE.default;

  const fmt = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-BD", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  const availPct =
    t.total_seats > 0
      ? Math.round(((t.total_seats - t.booked_seats) / t.total_seats) * 100)
      : 0;

  const inclusions = (t.inclusions ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const exclusions = (t.exclusions ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // ─── Book Now Handler 
  const handleBookNow = () => {
    const bookingData = {
      tourId: t.id,

      adults,
      children,
      infants: 0,

      fareData: {
        adult: {
          visa_fee: t.adult_price ?? 0,
          service_charge: 0,
        },
        child: {
          visa_fee: t.child_price ?? 0,
          service_charge: 0,
        },
        infant: {
          visa_fee: 0,
          service_charge: 0,
        },
      },

      currency: t.currency ?? "BDT",
      package_title: t.package_title,
    };

    localStorage.setItem("tour_booking_data", JSON.stringify(bookingData));
    const params = new URLSearchParams({
      id: t.id,
      num_adults: adults,
      num_children: children,
    });

    const targetUrl = `/tour-booking?${params.toString()}`;

    if (jwtManager.isUserAuthenticated()) {
      router.push(targetUrl);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(targetUrl)}`);
    }
  };

  return (
    <div className="bg-slate-50 pb-20">
      {/* ── Hero ── */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={t.image_url}
          alt={t.package_title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/75" />

        {/* Back button */}
        <Link
          href="/tour"
          className="absolute top-5 left-5 flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 rounded-xl px-3 py-2 text-xs font-semibold text-white no-underline transition-all"
        >
          <ArrowLeft size={14} /> Back to Tours
        </Link>

        {/* Top-right badges */}
        <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${statusClass}`}
          >
            {t.status}
          </span>
          {t.is_featured && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-primary text-white border border-primary">
              <Star size={9} fill="currentColor" /> Featured
            </span>
          )}
        </div>

        {/* Hero bottom text */}
        <div className="absolute bottom-7 left-0 right-0 px-5 mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-white/15 backdrop-blur-sm text-white px-3 py-0.5 rounded-full capitalize">
              <Tag size={10} /> {t.package_type}
            </span>
            {t.destination_country?.name && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-white/15 backdrop-blur-sm text-white px-3 py-0.5 rounded-full">
                <MapPin size={10} /> {t.destination_country.name}
              </span>
            )}
            <span className="text-[10px] font-mono text-white/50">
              #{t.package_code}
            </span>
          </div>
          <h1 className="text-[clamp(20px,4vw,34px)] font-extrabold text-white leading-tight">
            {t.package_title}
          </h1>
          <div className="flex flex-wrap gap-4 mt-2 text-white/70 text-xs">
            <span className="flex items-center gap-1">
              <Eye size={12} /> {t.view_count} views
            </span>
            <span className="flex items-center gap-1">
              <BookOpen size={12} /> {t.booking_count} bookings
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {t.duration_days}D / {t.duration_nights}N
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* ── LEFT ── */}
          <div className="flex flex-col gap-5">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatCard
                icon={Calendar}
                label="Start Date"
                value={fmt(t.start_date)}
              />
              <StatCard
                icon={Calendar}
                label="End Date"
                value={fmt(t.end_date)}
              />
              <StatCard
                icon={Clock}
                label="Duration"
                value={`${t.duration_days}D / ${t.duration_nights}N`}
              />
              <StatCard
                icon={MapPin}
                label="Origin"
                value={t.origin_country?.name ?? "—"}
              />
              <StatCard
                icon={MapPin}
                label="Destination"
                value={t.destination_country?.name ?? "—"}
              />
              <StatCard
                icon={Tag}
                label="Adult Price"
                value={`${currency} ${Number(adultPrice).toLocaleString()}`}
                accent
              />
            </div>

            {/* Seat Availability */}
            <div className="bg-white border border-primary/20 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-primary" />
                  <h2 className="text-sm font-bold text-slate-800">
                    Seat Availability
                  </h2>
                </div>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    t.available_seats <= 5
                      ? "bg-red-100 text-red-600"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {t.available_seats} left
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all duration-700"
                  style={{ width: `${100 - availPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>{t.booked_seats} booked</span>
                <span>{t.total_seats} total seats</span>
              </div>
            </div>

            {/* Description */}
            {t.description && (
              <div className="bg-white border border-primary/20 rounded-2xl p-5 shadow-sm">
                <h2 className="text-sm font-bold text-slate-800 mb-3">
                  About This Package
                </h2>
                <p className="text-[13px] text-slate-500 leading-relaxed whitespace-pre-line">
                  {t.description}
                </p>
              </div>
            )}

            {/* Highlights */}
            {t.highlights && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Sun size={15} className="text-primary" /> Highlights
                </h2>
                <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-line">
                  {t.highlights}
                </p>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            {(inclusions.length > 0 || exclusions.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inclusions.length > 0 && (
                  <div className="bg-white border border-primary/20 rounded-2xl p-5 shadow-sm">
                    <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-500" />{" "}
                      Inclusions
                    </h2>
                    <ul className="flex flex-col gap-2">
                      {inclusions.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-[12px] text-slate-600"
                        >
                          <CheckCircle2
                            size={12}
                            className="text-emerald-500 shrink-0"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {exclusions.length > 0 && (
                  <div className="bg-white border border-primary/20 rounded-2xl p-5 shadow-sm">
                    <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <XCircle size={15} className="text-red-400" /> Exclusions
                    </h2>
                    <ul className="flex flex-col gap-2">
                      {exclusions.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-[12px] text-slate-600"
                        >
                          <XCircle
                            size={12}
                            className="text-red-400 shrink-0"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Itinerary */}
            {t.itineraries?.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Plane size={15} className="text-primary" /> Day-by-Day
                  Itinerary
                </h2>
                <div className="flex flex-col gap-3">
                  {t.itineraries.map((day) => (
                    <ItineraryCard key={day.id} day={day} />
                  ))}
                </div>
              </div>
            )}

            {/* Terms & Cancellation */}
            {(t.terms_conditions || t.cancellation_policy) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.terms_conditions && (
                  <div className="bg-white border border-primary/20 rounded-2xl p-5 shadow-sm">
                    <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <BadgeCheck size={14} className="text-primary" /> Terms &
                      Conditions
                    </h2>
                    <p className="text-[12px] text-slate-500 leading-relaxed">
                      {t.terms_conditions}
                    </p>
                  </div>
                )}
                {t.cancellation_policy && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <h2 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
                      <AlertTriangle size={14} /> Cancellation Policy
                    </h2>
                    <p className="text-[12px] text-amber-700 leading-relaxed">
                      {t.cancellation_policy}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── RIGHT — Booking Sidebar ── */}
          <div>
            <div className="bg-white border border-primary/20 rounded-2xl p-6 shadow-md sticky top-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                Starting From
              </p>
              <p className="text-3xl font-extrabold text-primary leading-none mb-0.5">
                {currency} {Number(adultPrice).toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400 mb-5">
                per adult · fees may vary
              </p>

              <div className="h-px bg-slate-100 mb-4" />

              <p className="text-xs uppercase text-slate-400 mb-2 tracking-widest font-bold">
                Passengers
              </p>

              <CounterRow
                label="Adult"
                subtitle="Age 12 and above"
                count={adults}
                price={adultPrice}
                onIncrement={() =>
                  setAdults((a) => Math.min(a + 1, maxPassengers))
                }
                onDecrement={() => setAdults((a) => Math.max(a - 1, 1))}
              />

              {childPrice != null && (
                <CounterRow
                  label="Child"
                  subtitle="Age 2 – 12 years"
                  count={children}
                  price={childPrice}
                  onIncrement={() =>
                    setChildren((c) => Math.min(c + 1, maxPassengers - adults))
                  }
                  onDecrement={() => setChildren((c) => Math.max(c - 1, 0))}
                />
              )}

              <TourPriceBreakdown
                adults={adults}
                childCount={children}
                adultPrice={adultPrice}
                childPrice={childPrice}
                currency={currency}
              />

              <Button className="w-full mt-4" onClick={handleBookNow}>
                Book Now →
              </Button>

              <p className="text-center text-xs text-slate-400 mt-3">
                {adults + children} passenger
                {adults + children > 1 ? "s" : ""}
              </p>

              {/* Quick info strip */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
                {[
                  [
                    "Duration",
                    `${t.duration_days} Days / ${t.duration_nights} Nights`,
                  ],
                  ["Departure", fmt(t.start_date)],
                  ["Return", fmt(t.end_date)],
                  ["Seats Left", `${t.available_seats} of ${t.total_seats}`],
                  ["Package Type", t.package_type],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {label}
                    </span>
                    <span className="text-[11px] font-bold text-slate-800 capitalize">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Tours ── */}
        {related.length > 0 && (
          <div className="mt-12">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-800">
                  Related Tours
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  You might also be interested in
                </p>
              </div>
              <Link
                href="/tour"
                className="text-xs font-bold text-primary hover:opacity-80 no-underline transition-opacity"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((rt) => (
                <RelatedCard key={rt.id} tour={rt} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
