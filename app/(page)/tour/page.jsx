import VisaCard from "@/components/Page/Card/VisaCard";
import PackageFilterPanel from "@/components/Page/filter/Plan/PackageFilterPanel";
import VisaFilterPanel from "@/components/Page/filter/Plan/VisaFilterPanel";
import TourPackageList from "@/components/Page/TourPackage/TourPackageList";
import VisaList from "@/components/Page/Visa/VisaList";
import Section from "@/components/ui/Section";
import React from "react";

function page() {
  return (
    <>
      <Section>
        <div className="py-3 px-3 my-6 shadow-lg">
          <PackageFilterPanel />
        </div>
        <div className="">
          <TourPackageList />
        </div>
      </Section>
    </>
  );
}

export default page;
