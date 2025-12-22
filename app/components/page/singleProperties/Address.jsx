import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import {
  FaMapMarkerAlt,
  FaCity,
  FaFlag,
  FaHome,
  FaEnvelope,
} from "react-icons/fa";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

function Address({ street, country, state, city, SubDistrict, zip }) {
  const fields = [
    {
      label: "Street:",
      value: street,
      icon: <FaMapMarkerAlt className="text-[var(--primary-color)]" />,
    },
    {
      label: "Country:",
      value: country,
      icon: <FaFlag className="text-[var(--primary-color)]" />,
    },
    {
      label: "State / Province:",
      value: state,
      icon: <FaCity className="text-[var(--primary-color)]" />,
    },
    {
      label: "City / Town:",
      value: city,
      icon: <FaHome className="text-[var(--primary-color)]" />,
    },
    {
      label: "Sub-district:",
      value: SubDistrict,
      icon: <FaMapMarkerAlt className="text-[var(--primary-color)]" />,
    },
    {
      label: "Postal Code / ZIP:",
      value: zip,
      icon: <FaEnvelope className="text-[var(--primary-color)]" />,
    },
  ];

  return (
    <div className="">
      {/* Title + Icon */}
      <div className="flex items-center lg:flex-row flex-col gap-0 lg:gap-4 justify-start lg:justify-between mb-6">
        <div className="">
          <h2 className="text-2xl md:text-2xl font-bold flex justify-start items-center gap-2 text-gray-800">
            <HiArrowLongRight className="text-[var(--primary-color)] text-2xl hover:scale-110 transition-transform duration-200" />
            Property Address
          </h2>
        </div>
        <div className=" ">
          <Link href="#" className=" w-full text-[var(--primary-color)] text-[12px] hover:underline flex items-center">
            &nbsp; Open on Google Maps{" "}
            <FaLocationDot className="inline text-[var(--primary-color)] ml-1" />
          </Link>
        </div>
      </div>

      {/* Address Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fields.map((field, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="text-2xl">{field.icon}</div>
            <div className="flex gap-1 items-center">
              <p className="text-sm font-semibold text-gray-500">{field.label}</p>
              <p className=" text-gray-800">{field.value}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Address;
