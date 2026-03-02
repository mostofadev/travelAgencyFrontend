"use client";

import Button from "@/components/ui/Button";

// ─── Footer Component ─────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* ── Top CTA Banner ── */}
     

      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ── Col 1: Brand ── */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#0A5A70] flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <span className="text-white text-xl font-extrabold tracking-tight">
                Triplo<span className="text-[#22d3ee]">om</span>
              </span>
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Curated travel experiences across Asia and beyond. We craft
              journeys that leave lasting memories.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Facebook",
                  href: "#",
                  icon: (
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  ),
                },
                {
                  label: "Instagram",
                  href: "#",
                  icon: (
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                      />
                    </>
                  ),
                },
                {
                  label: "YouTube",
                  href: "#",
                  icon: (
                    <>
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                      <polygon
                        points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                        fill="currentColor"
                        stroke="none"
                      />
                    </>
                  ),
                },
                {
                  label: "WhatsApp",
                  href: "#",
                  icon: (
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/8 hover:bg-[#0A5A70] border border-white/10 hover:border-[#0A5A70] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg
                    className="w-4 h-4 text-white/70 hover:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-[2px] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Tour Packages", href: "/packages" },
                { label: "Destinations", href: "/destinations" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-white/50 hover:text-white text-sm transition-all duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#0A5A70] group-hover:w-2.5 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Popular Destinations ── */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-[2px] mb-5">
              Popular Destinations
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Japan", flag: "🇯🇵" },
                { label: "Thailand", flag: "🇹🇭" },
                { label: "Maldives", flag: "🇲🇻" },
                { label: "Nepal", flag: "🇳🇵" },
                { label: "Malaysia", flag: "🇲🇾" },
                { label: "Philippines", flag: "🇵🇭" },
              ].map((dest) => (
                <li key={dest.label}>
                  <a
                    href={`/checklist?country=${dest.label.toLowerCase()}`}
                    className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-all duration-200 group"
                  >
                    <span className="text-base leading-none group-hover:scale-110 transition-transform duration-200">
                      {dest.flag}
                    </span>
                    {dest.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact ── */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-[2px] mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              {[
                {
                  icon: (
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                  ),
                  text: "House 12, Road 5, Dhaka 1212, Bangladesh",
                },
                {
                  icon: (
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  ),
                  text: "+880 1700-000000",
                },
                {
                  icon: (
                    <>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </>
                  ),
                  text: "hello@triploom.com",
                },
                {
                  icon: (
                    <>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </>
                  ),
                  text: "Sat – Thu: 9:00 AM – 7:00 PM",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-[#22d3ee]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {item.icon}
                    </svg>
                  </span>
                  <span className="text-white/50 text-sm leading-relaxed">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-white/30 text-xs">
            © {currentYear} Triploom. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white/30 hover:text-white/70 text-xs transition-colors duration-200"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
