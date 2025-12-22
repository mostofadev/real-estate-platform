import Image from "next/image";
import React from "react";
import ImageIcons from "../../../../public/Image/SVG.png";
function TestimonialCard({ testimonial }) {
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;
  return (
    <div className="p-6 border border-[0.5px] border-gray-100">
      <div className="flex justify-between">
        <div className="flex gap-7 items-center">
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
            <Image
              src={`${STORAGE_URL}${testimonial.image}`}
              alt={testimonial.name}
              width={80}
              height={80}
              className="object-cover w-full h-full"
              unoptimized={true}
            />
          </div>
          <div className="">
            <h2 className="text-lg lg:text-lg text-[var(--primary-color)] font-bold ">
              {testimonial.name}
            </h2>
            <p className="text-[10px] lg:text-[14px]  ">
              {testimonial.passion}
            </p>
          </div>
        </div>
        <div className="">
          <Image
            src={ImageIcons}
            alt="Property Image"
            width={40}
            height={40}
            className=""
          />
        </div>
      </div>
      <div className="">
        <p className="my-4 text-[11px]">{testimonial.message}</p>
      </div>
    </div>
  );
}

export default TestimonialCard;
