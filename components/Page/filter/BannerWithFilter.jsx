"use client";

import Section from "@/components/ui/Section";
import HeroBanner from "../Home/Banner/HeroBanner";
import FilterBox from "./FilterBox";

export default function BannerWithFilter() {
  return (
    <>
      <Section>
        <HeroBanner>
          {/* <div className="my-12">
            <FilterBox />
          </div> */}
        </HeroBanner>
      </Section>

      {/* <div className="h-24 bg-slate-50" />

      <h3>hello bannerWithFilter</h3> */}
    </>
  );
}
