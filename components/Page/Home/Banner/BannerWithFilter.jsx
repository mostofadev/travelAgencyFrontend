"use client";

import FilterBox from "../../../ui/filter/FilterBox";
import HeroBanner from "./HeroBanner";

export default function BannerWithFilter() {
  return (
    <>
      <HeroBanner>
        <FilterBox />
      </HeroBanner>

      <div className="h-24 bg-slate-50" />
    </>
  );
}
