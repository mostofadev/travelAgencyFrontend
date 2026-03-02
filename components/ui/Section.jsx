import React from "react";

function Section({ children }) {
  return (
    <div
      className="mx-auto px-0 sm:px-6 lg:px-8"
      style={{ maxWidth: "96rem" }} 
    >
      {children}
    </div>
  );
}

export default Section;
