import Image from "next/image";
import React from "react";
import { FaMapMarkerAlt,FaBed, FaBath, FaRulerCombined} from "react-icons/fa";

function PropertieCard({ properties }) {
  return (
    <div className="p-2 border rounded-lg border-gray-200 shadow-md">
      <div className="w-full relative">
        <Image
          src={properties.image}
          alt="Property Image"
          width={400}
          height={300}
          className="rounded-lg w-full"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">{properties.title}</h2>
          <span className="text-sm text-[var(--primary-color)] font-bold">{properties.price}</span>
        </div>
        <p className="text-sm text-gray-600 flex gap-3 my-2"><FaMapMarkerAlt /> {properties.location}</p>
      </div>
      <div className="flex justify-between p-2 border-t  border-gray-100">
        <div className="flex items-center border-r  border-gray-100">
          <FaBed className="text-gray-600" />
          <span className="text-sm text-gray-600 ml-1">{properties.bedrooms} Bedrooms</span>
        </div>
        <div className="flex items-center">
          <FaBath className="text-gray-600" />
          <span className="text-sm text-gray-600 ml-1">{properties.bathrooms} Bathrooms</span>
        </div>
        <div className="flex items-center">
          <FaRulerCombined className="text-gray-600" />
          <span className="text-sm text-gray-600 ml-1">{properties.area} sqft</span>
        </div>
      </div>
    </div>
  );
}

export default PropertieCard;
