import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";

function RequestCard({ property, deleteId, onRemove }) {
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

  // const handleDelete = () => {
  //   if (confirm("Are you sure you want to remove this request?")) {
  //     onRemove(deleteId);
  //   }
  // };
  const propertiesData = property.property;
  return (
    <div className="flex flex-col  rounded-lg shadow-md bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Property Image */}
      <div className="relative w-full h-52 md:h-48 lg:h-56">
        <Image
          src={`${STORAGE_URL}${propertiesData.image_url}`}
          alt={propertiesData.title || "Property Image"}
          fill
          className="object-cover w-full h-full"
          unoptimized={true}
        />
        {/* Status Badge */}
        {property.status && (
          <span className="absolute top-2 left-2 bg-green-400 text-white text-xs font-semibold px-2 py-1 rounded">
            {property.status}
          </span>
        )}
      </div>

      {/* Property Info */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-lg font-semibold mb-1 hover:text-[var(--primary-color)]">
            <Link href={`/property/${property.id}`}>{propertiesData.title}</Link>
          </h2>
          <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
            <FaMapMarkerAlt /> {propertiesData.full_location}
          </p>
          <p className="text-md font-bold text-[var(--primary-color)]">
            {propertiesData.price}
          </p>
        </div>

        {/* Requested Date and Delete Button */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-400">
            Requested: {new Date(property.requested_date).toLocaleDateString()}
          </span>
          <button
            onClick={()=> {onRemove(deleteId)}}
            className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestCard;
