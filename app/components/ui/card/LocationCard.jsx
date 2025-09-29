import Image from "next/image";
import React from "react";
import LocationImage from "../../../../public/Image/location.png";
function LocationCard({ location }) {
  return (
    <div className="bg-[var(--color-bg-min)] p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex  ">
        <div className="">
          <Image src={location.image} alt="Location" />
        </div>
        <div className="mx-3">
          <h3 className="lg:text-md text-sm font-semibold text-[var(--color-text-max)]">
            {location.name}
          </h3>
          <p className="text-[var(--color-text-min)] lg:text-sm text-[11px] leading-relaxed mx-auto max-w-2xl">
            {location.properties} properties
          </p>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;
