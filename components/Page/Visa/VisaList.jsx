"use client";

import VisaCard from "../Card/VisaCard";


const VISAS = [
  {
    id: 1,
    visa_code: "VISAOREW",
    visa_title: "Botswana Work Visa",
    image_url: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=640&q=80",
    country: { id: 9, name: "Botswana" },
    visa_type: { id: 4, name: "Work" },
    processing: { min_days: 3, max_days: 7, range: "3–7 days" },
    visa_mode: "electronic",
    entry_type: "multiple",
    validity: { days: 362, formatted: "12 months and 2 days" },
    max_stay: { days: 48, label: "48 Days From Entry" },
    fee: { amount: 43039.88, currency: "BDT", formatted: "BDT 43,039.88" },
    description: "Nostrum voluptatum magni fugiat corrupti asperiores. Dignissimos molestiae magni voluptas ipsum dolor.",
  },
  {
    id: 2,
    visa_code: "VISATOUR1",
    visa_title: "Thailand Tourist Visa",
    image_url: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=640&q=80",
    country: { id: 14, name: "Thailand" },
    visa_type: { id: 1, name: "Tourist" },
    processing: { min_days: 1, max_days: 3, range: "1–3 days" },
    visa_mode: "electronic",
    entry_type: "single",
    validity: { days: 60, formatted: "2 months" },
    max_stay: { days: 30, label: "30 Days From Entry" },
    fee: { amount: 5500, currency: "BDT", formatted: "BDT 5,500.00" },
    description: "Explore the Land of Smiles with an easy e-Visa. Process is fully online with quick turnaround.",
  },
  {
    id: 3,
    visa_code: "VISASTU9",
    visa_title: "UK Student Visa",
    image_url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=640&q=80",
    country: { id: 7, name: "United Kingdom" },
    visa_type: { id: 2, name: "Student" },
    processing: { min_days: 15, max_days: 30, range: "15–30 days" },
    visa_mode: "sticker",
    entry_type: "multiple",
    validity: { days: 1095, formatted: "3 years" },
    max_stay: { days: 1095, label: "Duration of Course" },
    fee: { amount: 82000, currency: "BDT", formatted: "BDT 82,000.00" },
    description: "Study at world-class institutions in the UK. Covers CAS-sponsored courses with part-time work rights.",
  },
  {
    id: 4,
    visa_code: "VISABIZ4",
    visa_title: "UAE Business Visa",
    image_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=640&q=80",
    country: { id: 22, name: "United Arab Emirates" },
    visa_type: { id: 3, name: "Business" },
    processing: { min_days: 2, max_days: 5, range: "2–5 days" },
    visa_mode: "electronic",
    entry_type: "multiple",
    validity: { days: 180, formatted: "6 months" },
    max_stay: { days: 90, label: "90 Days Per Visit" },
    fee: { amount: 18500, currency: "BDT", formatted: "BDT 18,500.00" },
    description: "Conduct business and attend meetings in the UAE. Multi-entry visa for seamless professional travel.",
  },
  {
    id: 5,
    visa_code: "VISAJPN5",
    visa_title: "Japan Tourist Visa",
    image_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=640&q=80",
    country: { id: 18, name: "Japan" },
    visa_type: { id: 1, name: "Tourist" },
    processing: { min_days: 5, max_days: 10, range: "5–10 days" },
    visa_mode: "sticker",
    entry_type: "single",
    validity: { days: 90, formatted: "3 months" },
    max_stay: { days: 15, label: "15 Days From Entry" },
    fee: { amount: 6800, currency: "BDT", formatted: "BDT 6,800.00" },
    description: "Experience Japan's unique culture, cuisine and cherry blossoms. Sticker visa applied at embassy.",
  },
  {
    id: 6,
    visa_code: "VISACAN6",
    visa_title: "Canada Student Visa",
    image_url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=640&q=80",
    country: { id: 5, name: "Canada" },
    visa_type: { id: 2, name: "Student" },
    processing: { min_days: 20, max_days: 60, range: "20–60 days" },
    visa_mode: "electronic",
    entry_type: "multiple",
    validity: { days: 730, formatted: "2 years" },
    max_stay: { days: 730, label: "Duration of Studies" },
    fee: { amount: 14500, currency: "BDT", formatted: "BDT 14,500.00" },
    description: "Study in Canada with work rights during academic year and full-time during scheduled breaks.",
  },
];

export default function VisaList() {
  return (
    <div style={{
     
      padding: "32px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "8px" }}>
        <span style={{
          display: "inline-block", padding: "3px 12px",
          background: "#ede9fe", color: "#6d28d9",
          borderRadius: "20px", fontSize: "11px",
          fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.08em", marginBottom: "10px",
        }}>
          Visa Services
        </span>
        <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
          Available Visas
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#64748b" }}>
          {VISAS.length} options found — compare fees and apply online
        </p>
      </div>

      {/* Cards */}
      {VISAS.map((visa) => (
        <VisaCard key={visa.id} visa={visa} />
      ))}
    </div>
  );
}