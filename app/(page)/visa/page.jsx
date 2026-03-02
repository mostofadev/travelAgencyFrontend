import VisaCard from "@/components/Page/Card/VisaCard";
import VisaFilterPanel from "@/components/Page/filter/Plan/VisaFilterPanel";
import VisaList from "@/components/Page/Visa/VisaList";
import Section from "@/components/ui/Section";
import React from "react";

function page() {
  return (
    <>
      <Section>
        <div className="py-3 px-3 my-6 shadow-lg">
          <VisaFilterPanel />
        </div>
        <div className="">
          <VisaList />
        </div>
      </Section>
    </>
  );
}

export default page;
