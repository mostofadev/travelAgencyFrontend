"use client";

import { useEffect, useState } from "react";
import Section from "@/components/ui/Section";
import { DestinationCard, destinations } from "./DestinationCard";
import { DestinationCardSkeleton } from "@/components/ui/Skeleton/DestinationCardSkeleton";

const SKELETON_COUNT = 9;

export default function TopDestinations() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-32">
      <Section>
        <section className="my-12">
          {/* Title skeleton */}
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse w-56 mb-6" />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Popular Destinations
            </h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <DestinationCardSkeleton key={i} />
                ))
              : destinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                  />
                ))}
          </div>
        </section>
      </Section>
    </div>
  );
}
