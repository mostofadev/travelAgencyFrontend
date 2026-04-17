"use client";

import Section from "@/components/ui/Section";
import { TourPackageCard } from "./TourPackagecard";
import { TourPackageCardHomeSkeleton } from "@/components/ui/Skeleton/TourPackageHomeCardSkeleton";

const SKELETON_COUNT = 6;

export default function TourPackages({ tours = [], isLoading = false }) {
  return (
    <Section>
      <section>
        <div className="relative mx-auto">
          <div style={{ marginBottom: "32px" }}>
            {isLoading ? (
              <div className="h-8 bg-gray-200 rounded animate-pulse w-52" />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Signature Tour{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Packages</span>
                </span>
              </h2>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {isLoading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <TourPackageCardHomeSkeleton key={i} />
                ))
              : tours.map((pkg, i) => (
                  <TourPackageCard key={pkg.id} pkg={pkg} index={i} />
                ))}
          </div>
        </div>
      </section>
    </Section>
  );
}
