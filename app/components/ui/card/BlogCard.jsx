import Image from "next/image";
import React from "react";
import { FaMapMarkerAlt,FaBed, FaBath, FaRulerCombined} from "react-icons/fa";

function BlogCard({ blog }) {
  return (
    <div className="p-2 border rounded-lg border-gray-200 shadow-md">
      <div className="w-full relative">
        <Image
          src={blog.image}
          alt="Property Image"
          width={400}
          height={300}
          className="rounded-lg w-full"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-start my-3">
          <span className="text-[12px] text-[var(--primary-color)] font-bold border-r border-gray-200 pr-4">{blog.date}</span>
          <span className="text-[12px]  font-bold pl-4">{blog.author}</span>
        </div>
        {/* <p className="text-sm text-gray-600 flex gap-3 my-2"><FaMapMarkerAlt /> {properties.location}</p> */}
        <h2 className="text-lg font-semibold">{blog.title}</h2>
      </div>
     
    </div>
  );
}

export default BlogCard;
