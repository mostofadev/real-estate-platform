import Image from "next/image";
import React from "react";
import LocationImage from "../../../../public/Image/location.png";
import Link from "next/link";
function LocationCard({ location }) {
  console.log("card city data", location);

  return (
    <div className="bg-[var(--color-bg-min)] p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 my-5">
      <Link href={`/find?division_id=${location.id}`}>
        <div className="flex  ">
          <div className="">
            <Image src={LocationImage} alt="Location" width={40} height={40} />
          </div>
          <div className="mx-3">
            <h3 className="lg:text-md text-sm font-semibold text-[var(--color-text-max)]">
              {location.name}
            </h3>
            <p className="text-[var(--color-text-min)] lg:text-sm text-[11px] leading-relaxed mx-auto max-w-2xl">
              {location.property_count} properties
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default LocationCard;
