import Image from "next/image";
import React from "react";
import ImageIcons from "../../../../public/Image/SVG.png"
function TestimonialCard({ testimonial }) {
  return (
    <div className="p-6 border border-[0.5px] border-gray-100">
      <div className="flex justify-between">
        <div className="flex gap-7 items-center">
          <div className="">
            <Image
              src={testimonial.Image}
              alt="Property Image"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <div className="">
            <h2 className="text-lg lg:text-lg text-[var(--primary-color)] font-bold ">{testimonial.name}</h2>
            <p className="text-[10px] lg:text-[14px]  ">{testimonial.profession}</p>
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
        <p className="my-4 text-[11px]">{testimonial.description}</p>
      </div>
    </div>
  );
}

export default TestimonialCard;
