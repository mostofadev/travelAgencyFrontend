
import FlightFilterPanel from "@/components/Page/filter/Plan/FlightFilterPanel";
import FlightList from "@/components/Page/Flight/FlightList";
import Section from "@/components/ui/Section";
import React from "react";

function page() {
  return (
    <>
      <Section>
        <div className="py-3 px-3 my-6 shadow-lg">
          <FlightFilterPanel />
        </div>
        <div className="">
          {/* <TourPackageList /> */}
          <FlightList />
        </div>
      </Section>
    </>
  );
}

export default page;
