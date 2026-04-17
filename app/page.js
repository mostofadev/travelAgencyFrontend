// app/page.jsx
"use client";
import BannerWithFilter from "@/components/ui/filter/BannerWithFilter";
import TopDestinations from "@/components/Page/Home/Destination/TopDestinations";
import TourPackages from "@/components/Page/Home/TourPackage/Tourpackages";
import { useEffect, useState } from "react";
import { useHomePageTour } from "@/hooks/Page/useHome";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const { data, isLoading } = useHomePageTour();
  console.log("tour", data);
  const tours = data?.data;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <main>
      <BannerWithFilter />
      <div
        style={{
          marginTop: isMobile ? "270px" : "132px",
          marginBottom: isMobile ? "70px" : "132px",
        }}
        className="px-3"
      >
        <TopDestinations />
      </div>
      <div
        style={{
          marginTop: isMobile ? "70px" : "132px",
          marginBottom: isMobile ? "70px" : "132px",
        }}
        className="px-3"
      >
        <TourPackages tours={tours} isLoading={isLoading} />
      </div>
    </main>
  );
}
