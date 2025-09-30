import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";

function Description({ Description }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <HiArrowLongRight className="text-[var(--primary-color)] text-2xl hover:scale-110 transition-transform duration-200" />

          Property Description
          
        </h2>
        <hr />
      </div>
      <p className="text-justify text-md text-gray-500 text-center">{Description}</p>
    </div>
  );
}

export default Description;
