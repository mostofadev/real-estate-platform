import React from "react";
import { FaBarcode } from "react-icons/fa";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";

function Details({ Property_id, Size, Bedrooms, Bathrooms }) {
  const details = [
    {
      label: "Property ID",
      value: Property_id,
      icon: <FaBarcode className="text-[28px] text-[var(--primary-color)]" />,
    },
    {
      label: "Size",
      value: `${Size} SqFt`,
      icon: (
        <HiOutlineSquare3Stack3D className="text-[28px] text-[var(--primary-color)]" />
      ),
    },
    {
      label: "Bedrooms",
      value: Bedrooms,
      icon: (
        <IoBedOutline className="text-[28px] text-[var(--primary-color)]" />
      ),
    },
    {
      label: "Bathrooms",
      value: Bathrooms,
      icon: (
        <LiaBathSolid className="text-[28px] text-[var(--primary-color)]" />
      ),
    },
  ];

  return (
    <div className="bg-[#f6f6f6] px-4 shadow-md p-6 border border-gray-200 ">
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {details.map((item, idx) => (
          <li
            key={idx}
            className="flex  items-center justify-start gap-2 hover:scale-105 transition-transform duration-300"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 shadow-sm">
              {item.icon}
            </div>
            <div className="ml-3 flex flex-col items-center justify-start">
              <p className="text-lg font-semibold text-gray-800">
                {item.value}
              </p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Details;
