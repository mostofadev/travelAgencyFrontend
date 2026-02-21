import React from "react";
import Navbar from "./Navbar";
import Section from "@/components/ui/Section";

function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default PageLayout;
