import React from "react";
import Navbar from "./Navbar";
import Section from "@/components/ui/Section";
import Footer from "./Footer";

function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default PageLayout;
