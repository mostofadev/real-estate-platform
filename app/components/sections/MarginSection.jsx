import React from "react";

function MarginSection({ children }) {
  return (
    <div
      className="mx-auto px-4 sm:px-6 lg:px-8"
      style={{ maxWidth: "110rem" }} // 110rem ~ 1760px (8xl)
    >
      {children}
    </div>
  );
}

export default MarginSection;
