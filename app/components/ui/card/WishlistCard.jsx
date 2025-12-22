"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";



function WishlistCard({deleteId, property, onRemove }) {
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-3  rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="w-full sm:w-1/3 relative">
        <Image
          src={`${STORAGE_URL}${property.image_url}`}
          alt={property.title || "Property Image"}
          width={400}
          height={250}
          className="rounded-lg w-full h-44 object-cover"
          unoptimized
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 w-full">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
            <Link href={`/property/${property.id}`}>
              {property.title}
            </Link>
          </h2>
          <span className="text-sm text-[var(--primary-color)] font-bold whitespace-nowrap">
            {property.price}
          </span>
        </div>

        <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
          <FaMapMarkerAlt className="text-gray-500" /> 
          <span className="line-clamp-1">{property.full_location}</span>
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Saved {property.saved_at || "Recently"}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <Link
            href={`/property/${property.id}`}
            className="flex-1 text-center text-sm border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
          >
            View
          </Link>
          <button
            onClick={() => onRemove(deleteId)}
            className="flex items-center justify-center gap-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg py-2 px-3 transition"
          >
            <AiFillDelete /> 
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
