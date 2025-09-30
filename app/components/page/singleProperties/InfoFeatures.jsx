import React from "react";
import { FaRegPenToSquare } from "react-icons/fa6";

function InfoFeatures({ labels }) {
  // labels = ["Air Conditioning", "Central Heating", "Fire Alarm", "Home Theater", "Laundry", "Laundry Room", "Sauna", "WiFi"]

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-20 lg:gap-x-40 gap-y-4">
        {labels.map((label, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2  p-3 rounded-lg  hover:bg-[var(--primary-color)] transition-shadow duration-300"
          >
            <div className="text-[var(--primary-color)] text-xl">
              <FaRegPenToSquare />
            </div>
            <p className="text-gray-700 font-medium text-sm">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfoFeatures;
