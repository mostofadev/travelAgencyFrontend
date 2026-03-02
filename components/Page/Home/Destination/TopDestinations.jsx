"use client";

import Section from "@/components/ui/Section";
import { DestinationCard, destinations } from "./DestinationCard";

// ─── TopDestinations Component ────────────────────────────────
export default function TopDestinations() {
  return (
   <div className="my-32">
     <Section>
      <section className="my-12 ">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Popular Destinations
        </h2>

        {/* Cards Grid — desktop: 3 cols | tablet: 2 cols | mobile: 1 col */}
        <div
          id="popular-destination-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
    </Section>
   </div>
  );
}
