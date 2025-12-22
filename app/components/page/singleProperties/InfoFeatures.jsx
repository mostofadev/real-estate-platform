import React from "react";
import { FaRegPenToSquare } from "react-icons/fa6";

function InfoFeatures({ labels,Key }) {
  // labels = ["Air Conditioning", "Central Heating", "Fire Alarm", "Home Theater", "Laundry", "Laundry Room", "Sauna", "WiFi"]
  if(labels === null) {
    return <p>No Feature</p>
  }
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div
            key={Key}
            className="flex items-center gap-2  p-3 rounded-lg   transition-shadow duration-300"
          >
            <div className="text-[var(--primary-color)] text-xl">
              <FaRegPenToSquare />
            </div>
            <p className="text-gray-700 font-medium text-sm">{labels}</p>
          </div>
      </div>
    </div>
  );
}

export default InfoFeatures;
