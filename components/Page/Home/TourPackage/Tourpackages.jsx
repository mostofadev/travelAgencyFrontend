"use client";

import Section from "@/components/ui/Section";
import { TourPackageCard, tourPackages } from "./TourPackagecard";

// ─── TourPackages Section ─────────────────────────────────────
export default function TourPackages() {
  return (
    <Section>
      <section className="">
        <div className="relative max-w-7xl mx-auto">
          <div style={{marginBottom:'32px'}}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Signature Tour{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#0A5A70]">Packages</span>
                <span className="absolute left-0 -bottom-0.5 w-full h-[3px] bg-gradient-to-r from-[#0A5A70] to-teal-400 rounded-full" />
              </span>
            </h2>
          </div>
          <div
            id="packages-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {tourPackages.map((pkg, i) => (
              <TourPackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}
